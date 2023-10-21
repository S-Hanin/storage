package ru.smk.assortment.storage.scenario

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.UploadDocumentFileRq
import ru.smk.assortment.storage.controller.dto.UploadDocumentFileRs
import ru.smk.assortment.storage.exception.ScenarioException
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.DocumentFileService
import ru.smk.assortment.storage.service.StorageService

@Component
class UploadFileScenario(
    val documentService: DocumentService,
    val documentFileService: DocumentFileService,
    @Qualifier("FilesystemStorage")
    val storageService: StorageService
) {

    @Transactional
    fun execute(request: UploadDocumentFileRq, file: MultipartFile): UploadDocumentFileRs {
        step { documentFileService.getPartFileDocument(file) }
            .validate { it.isEmpty }
            .onError { throw ScenarioException("Document already exists") }

        val project = step { documentService.getProject(request.projectName).get() }
            .ifNot { documentService.createProject(request.projectName) }
            .onError { throw ScenarioException("Error while creating project document") }
            .get()

        val part = step { documentService.getDocument(request.name).get() }
            .ifNot { documentService.createDocument(request, project) }
            .onError { throw ScenarioException("Error while creating document") }
            .get()

        step { storageService.saveFile(part, file) }
            .onError { throw ScenarioException("Error while saving file") }
            .validate { it.link != null }
            .apply {
                it.createdBy = request.createdBy
                it.createdAt = request.createdAt
                part.documentFiles.add(it)
            }.get()

        return UploadDocumentFileRs(success = true)
    }
}
