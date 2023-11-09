
import { DOCUMENT_SERVICE_URL } from "../const/config";


const BASE_URL = DOCUMENT_SERVICE_URL;
const PROJECTS_PATH = BASE_URL + "/documents/projects";
const DOCUMENTS_BY_PROJECT_PATH = BASE_URL + "/documents/by-project/";
const DOCUMENTS_AUTOCOMPLETE_PATH = BASE_URL + "/documents/search";
const DOCUMENT_PATH = BASE_URL + "/documents/by-name/";
const DOCUMENTS_BY_NAMES_PATH = BASE_URL + "/documents/by-names";
const DOCUMENT_DOWNLOAD_PATH = BASE_URL + "/documents/download/"


export const DocumentService = {
    getAllProjects: function (callback) {
        fetch(PROJECTS_PATH, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                callback(data.projects);
            })
            .catch((error) => console.log(error));
    },

    getProjectDocuments: function (projectName, callback) {
        fetch(`${DOCUMENTS_BY_PROJECT_PATH}${projectName}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                callback(data.documents);
            })
            .catch((error) => console.log(error));
    },

    getDocumentAutocomplete: function (documentName, callback) {
        fetch(`${DOCUMENTS_AUTOCOMPLETE_PATH}?name=${documentName}`, { method: "GET" })
            .then((response) => response.json())
            .then((data) => callback(data.documents))
            .catch((error) => console.log(error))
    },

    getDocument: function (documentName, callback) {
        fetch(`${DOCUMENT_PATH}${documentName}`, { method: "GET" })
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => console.log(error))
    },

    getDocuments: async function (documents) {
        const result = await fetch(`${DOCUMENTS_BY_NAMES_PATH}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ documents: documents })
        });

        if (result.status === 200) {
            const json = await result.json();
            return json.documents;
        }

        console.log(result.status);

        // fetch(`${DOCUMENTS_BY_NAMES_PATH}`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({ documents: documents })
        // })
        //     .then((response) => response.json())
        //     .then((data) => callback(data.documents))
        //     .catch((error) => console.log(error))
    },

    downloadDocument: async function (documentName) {
        const result = await fetch(`${DOCUMENT_DOWNLOAD_PATH}${documentName}`, { method: "GET" });
        if (result.status === 200) {
            return await result.arrayBuffer();
        }
        console.log(result.status)
    }
}