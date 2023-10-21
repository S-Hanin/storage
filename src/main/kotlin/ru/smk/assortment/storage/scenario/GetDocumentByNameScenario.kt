package ru.smk.assortment.storage.scenario

import org.springframework.stereotype.Component
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.GetDocumentRs
import ru.smk.assortment.storage.exception.ScenarioException
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.mapper.DocumentMapper

@Component
class GetDocumentByNameScenario(
    val documentService: DocumentService,
    val documentMapper: DocumentMapper
) {

    fun execute(documentName: String): GetDocumentRs {
        val document = step { documentService.getDocument(documentName).get() }
            .onError { throw ScenarioException("Document not found") }
            .get()

        return documentMapper.toGetDocumentRs(document)
    }

}
