package ru.smk.assortment.storage.scenario

import org.springframework.stereotype.Component
import ru.smk.assortment.storage.common.Scenario.Companion.step
import ru.smk.assortment.storage.controller.dto.GetProjectsRs
import ru.smk.assortment.storage.service.DocumentService
import ru.smk.assortment.storage.service.mapper.ProjectMapper

@Component
class GetProjectsScenario(
    val documentService: DocumentService,
    val projectMapper: ProjectMapper
) {

    fun execute(): GetProjectsRs {
        return step { documentService.getProjects()}
            .map { GetProjectsRs(projectMapper.toProjectDto(it)) }
            .get()
    }
}
