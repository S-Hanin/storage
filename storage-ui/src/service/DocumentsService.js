
import { DOCUMENT_SERVICE_URL } from "../const/config";


const BASE_URL = DOCUMENT_SERVICE_URL;
const PROJECTS_PATH = BASE_URL + "/documents/projects";
const DOCUMENTS_BY_PROJECT_PATH = BASE_URL + "/documents/by-project/";
const DOCUMENTS_AUTOCOMPLETE_PATH = BASE_URL + "/documents/search"
const DOCUMENT_PATH = BASE_URL + "/documents/by-name/"


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
    }
}