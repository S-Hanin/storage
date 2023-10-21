package ru.smk.assortment.storage.scenario

import org.springframework.stereotype.Component
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.GetDocumentsRs
import ru.smk.assortment.storage.exception.ScenarioException
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.mapper.DocumentMapper

@Component
class GetDocumentsByProjectScenario(
    val documentService: DocumentService,
    val documentMapper: DocumentMapper
) {

    fun execute(name: String): GetDocumentsRs {
        val project = step { documentService.getProject(name).get() }
            .onError { throw ScenarioException("Project not found") }
            .get()

        return documentMapper.toGetDocumentsRs(project)
    }
}
