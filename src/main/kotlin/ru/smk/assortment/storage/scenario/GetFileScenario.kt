package ru.smk.assortment.storage.scenario

import org.springframework.core.io.FileSystemResource
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.GetDocumentFileRq
import ru.smk.assortment.storage.controller.dto.GetDocumentFileRs
import ru.smk.assortment.storage.exception.ScenarioException
import ru.smk.assortment.storage.service.DocumentService
import kotlin.io.path.Path

@Component
class GetFileScenario(
    val documentService: DocumentService
) {

    @Transactional
    fun execute(request: GetDocumentFileRq): GetDocumentFileRs {
        val document = step { documentService.getDocument(request.fileName).get() }
            .onError { throw ScenarioException("Part document not found") }
            .get()

        return step { document.getLastDocumentFile() }
            .onError { throw ScenarioException("Drawing file not found") }
            .map {
                GetDocumentFileRs(
                    filename = "${document.name} ${document.description}.pdf",
                    file = FileSystemResource(Path(it!!.link!!))
                )
            }.get()
    }

}
