package ru.smk.assortment.storage.scenario

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.FindDocumentsRs
import ru.smk.assortment.storage.controller.dto.GetDocumentsByNames
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.mapper.DocumentMapper

@Component
class GetDocumentsByNamesScenario(
    val documentService: DocumentService,
    val documentMapper: DocumentMapper
) {
    @Transactional
    fun execute(request: GetDocumentsByNames): FindDocumentsRs {
        val documents = step { documentService.getDocuments(request.documents)}
            .get()

        return FindDocumentsRs().also {
                it.documents = documentMapper.toDocumentDtoFind(documents)
            }
    }
}
