import SearchIcon from '@mui/icons-material/Search';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { DropzoneArea } from 'mui-file-dropzone';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { DOCUMENT_SERVICE_URL } from '../const/config';
import { DocumentService } from '../service/DocumentsService';
import PdfViewer from './PdfViewer';
import { PDFDocument } from 'pdf-lib';

const PDF_DOC_PATH = DOCUMENT_SERVICE_URL + "/documents/download/";
const getDocumentPath = (document) => `${PDF_DOC_PATH}${document.name}`;

const DocumentsListItemValid = ({ item, onClick }) => {
    return (
        <ListItem key={item.id}>
            <ListItemButton onClick={onClick}>
                <ListItemText
                    primaryTypographyProps={{
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '9pt'
                        }
                    }}
                    primary={`${item.name} ${item.description}`}
                    secondary={
                        <>
                            <Typography sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '8pt'
                            }}>{`Автор: ${item.createdBy}`}</Typography>
                            <Typography sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '8pt'
                            }}>{`Дата создания: ${new Date(item.createdAt).toLocaleString()}`}</Typography>
                        </>
                    }>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

const DocumentsListItemInvalid = ({ item }) => {
    return (
        <ListItem key={item.name}>
            <ListItemButton>
                <ListItemText
                    primaryTypographyProps={{
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '9pt',
                            color: 'rgba(178, 34, 34, 0.3)'
                        }
                    }}
                    primary={`${item.name} ${item.description}`}
                >
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};


const DocumentViewer = ({ isActive }) => {
    const [documents, setDocuments] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [url, setUrl] = useState();

    const mergePdfs = async () => {

        const result = await PDFDocument.create();

        const availableDocuments = documents.filter(it => it.id);

        const files = await Promise.allSettled(availableDocuments
            .map(async item => await DocumentService.downloadDocument(item.name)));

        const docs = await Promise.allSettled(files.
            map(async file => await PDFDocument.load(file.value)));

        const pages = await Promise.allSettled(docs
            .map(async doc => await result.copyPages(doc.value, [0])));

        pages.forEach(page => {
            return result.addPage(page.value[0])
        })
        const bytes = await result.save();
        openDownloadPdfDialog(bytes);
    }

    const openDownloadPdfDialog = (bytes) => {
        const link = document.createElement('a');
        link.download = 'DrawingsPackage.pdf';
        link.href = URL.createObjectURL(new Blob([bytes]));
        link.click();
        URL.revokeObjectURL(link.href);
    }

    const handleInput = (e) => {
        if (e.target.value.length > 5) {
            setInputValue(e.target.value);
        }
    };

    const handleSearchClick = () => {
        DocumentService.getDocumentAutocomplete(inputValue, setDocuments);
    };

    const handleKeyPress = (e) => {
        setInputValue(e.target.value)
        if (e.keyCode === 13) {
            handleSearchClick();
        }
    };

    const handleFilesLoad = (async (items) => {
        let file = items[0];
        const ab = await file.arrayBuffer();
        const wb = read(ab);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = utils.sheet_to_json(ws);

        loadAvailableDocuments(json);
    });

    const loadAvailableDocuments = async (specificationRows = []) => {
        const heads = {
            key: "Ключевые слова",
            number: "Обозначение",
            description: "Описание"
        };

        let documentNamesToFind = specificationRows
            .filter(row => row[heads.key] === 'А3' || row[heads.key] === 'А4')
            .map(row => row[heads.number]);

        const foundDocuments = await DocumentService.getDocuments(documentNamesToFind);

        const foundDocumentsNames = foundDocuments.map(it => it.name)
        const documentNamesNotFound = documentNamesToFind.filter(it => !foundDocumentsNames.includes(it))
        const rowsNotFound = specificationRows.filter(it => documentNamesNotFound.includes(it[heads.number]))
        rowsNotFound.forEach(it => {
            foundDocuments.push({
                name: it[heads.number],
                description: it[heads.description],
            })
        })

        setDocuments(foundDocuments);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexGrow: 1,
        }}>
            <Box sx={{
                m: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'stretch'
            }}>

                <Paper
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400
                    }}
                >
                    <TextField
                        focused={isActive}
                        size='small'
                        sx={{ ml: 1, mt: 1, mb: 1, flex: 1 }}
                        label="Поиск документа"
                        onKeyDown={handleKeyPress}
                        onInput={handleInput}
                    />

                    <IconButton
                        type="button"
                        sx={{ p: '10px', ml: '10px' }}
                        aria-label="search"
                        onClick={handleSearchClick}>
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Paper sx={{
                    p: '2px 4px',
                    mt: '4px',
                    width: 400,
                    flexGrow: 1,
                    overflowY: 'auto'
                }}>
                    {documents.length > 0 &&
                        <Button key='downloadAllButton' variant='text' onClick={mergePdfs}>Скачать все документы</Button>
                    }
                    <List sx={{ overflow: 'auto' }}>
                        {documents.map((item) => (
                            <>
                                {item.id ?
                                    <DocumentsListItemValid item={item} onClick={() => setUrl(getDocumentPath(item))} /> :
                                    <DocumentsListItemInvalid item={item} />}
                                <Divider key={`divider_${item.id}`} variant='middle' component='li' />
                            </>
                        ))}

                    </List>
                </Paper>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    width: '60%',
                    m: '4px',
                }}
            >
                {url &&
                    <PdfViewer url={url} />}
            </Box>
            <Box sx={{
                m: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'stretch'
            }}>
                <Paper
                    sx={{
                        p: '2px 4px',
                        mt: '4px',
                        width: 200,
                        flexGrow: 1,
                    }}>
                    <DropzoneArea
                        dropzoneClass='dropzone'
                        dropzoneText='Перетащите сюда файл .xlsx со спецификацией'
                        Icon={UploadFileOutlinedIcon}
                        acceptedFiles={['.xlsx', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        onDrop={handleFilesLoad}
                        filesLimit={1}
                        sx={{ height: '100%' }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}

DocumentViewer.propTypes = {
    isActive: PropTypes.bool
}

DocumentsListItemValid.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
}

DocumentsListItemInvalid.propTypes = {
    item: PropTypes.object,
}

export default DocumentViewer