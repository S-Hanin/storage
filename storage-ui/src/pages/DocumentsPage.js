import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import DocumentPropertiesPanel from '../components/DocumentPropertiesPanel';
import Panel from '../components/Panel';
import PdfViewer from '../components/PdfViewer';
import { DOCUMENT_SERVICE_URL } from '../const/config';
import { DocumentService } from '../service/DocumentsService';
import DocumentViewer from '../components/DocumentViewer';

const PDF_DOC_PATH = DOCUMENT_SERVICE_URL + "/documents/download/";
const getDocumentPath = (document) => `${PDF_DOC_PATH}${document.name}`;

const StyledBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: theme.spacing(1),
}));

function DocumentsPage() {
    // const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        DocumentService.getAllProjects(setProjects)
    }, []);

    const handleProjectClick = (projectName) => {
        DocumentService.getProjectDocuments(projectName, setDocuments)
    };

    const handleDocumentClick = (documentName) => {
        setSelectedDocument(documents.find((item) => item.name === documentName));
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Box component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    padding: '5px'
                }}>

                <Panel
                    subheader="Проекты"
                    items={projects}
                    onItemClick={handleProjectClick}
                    width={200} />

                <Panel
                    subheader="Документы"
                    items={documents}
                    onItemClick={handleDocumentClick}
                    width={250} />

                {/* <DocumentViewer documentUrl={selectedDocument ? `http://localhost:8080/documents/download/${selectedDocument.name}`: null} /> */}

                <StyledBox>
                    <Paper elevation={4}>
                        <Button
                            variant='contained'
                            startIcon={<SearchOutlined />}
                            onClick={handleDialogOpen} >
                            Открыть поиск
                        </Button>
                    </Paper>
                    {selectedDocument &&
                        <PdfViewer url={getDocumentPath(selectedDocument)} />}
                </StyledBox>

                {selectedDocument &&
                    <DocumentPropertiesPanel document={selectedDocument} />}
            </Box>
            <Dialog fullScreen open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Поиск документа</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                    <DocumentViewer />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DocumentsPage;
