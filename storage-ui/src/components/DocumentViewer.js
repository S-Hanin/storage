import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { DocumentService } from '../service/DocumentsService';
import PdfViewer from './PdfViewer';
import { DOCUMENT_SERVICE_URL } from '../const/config';

const PDF_DOC_PATH = DOCUMENT_SERVICE_URL + "/documents/download/";
const getDocumentPath = (document) => `${PDF_DOC_PATH}${document.name}`;


const DocumentViewer = () => {
    const [documents, setDocuments] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [url, setUrl] = useState();


    const handleInput = (e) => {
        if (e.target.value.length > 5) {
            setInputValue(e.target.value);
        }
    };

    const handleSearchClick = () => {
        DocumentService.getDocumentAutocomplete(inputValue, setDocuments);
    }

    const handleKeyPress = (e) => {
        setInputValue(e.target.value)
        if (e.keyCode === 13) {
            handleSearchClick()
        }
    };

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
                    <List sx={{ overflow: 'auto' }}>
                        {documents.map((item) => (
                            <>
                                <ListItem key={item.id}>
                                    <ListItemButton onClick={() => setUrl(getDocumentPath(item))}>
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
                                <Divider variant='middle' component='li' />
                            </>
                        ))}

                    </List>
                </Paper>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: '60%',
                    m: '4px',
                }}
            >
                {url &&
                    <PdfViewer url={url} />}
            </Box>

        </Box>
    )
}

export default DocumentViewer