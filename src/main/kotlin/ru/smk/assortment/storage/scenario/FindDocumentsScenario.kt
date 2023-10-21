package ru.smk.assortment.storage.scenario

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.FindDocumentsRs
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.mapper.DocumentMapper

@Component
class FindDocumentsScenario(
    val documentService: DocumentService,
    val documentMapper: DocumentMapper
) {

    @Transactional
    fun execute(name: String): FindDocumentsRs {
        val documents = step { documentService.findDocuments(name) }
            .get()

        return FindDocumentsRs().also {
           it.documents=documentMapper.toDocumentDtoFind(documents)
        }
    }
}
