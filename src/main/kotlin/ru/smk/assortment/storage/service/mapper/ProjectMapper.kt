package ru.smk.assortment.storage.service.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingConstants.ComponentModel.SPRING
import ru.smk.assortment.storage.controller.dto.GetProjectsRs
import ru.smk.assortment.storage.controller.dto.ProjectDto
import ru.smk.assortment.storage.entity.Project

@Mapper(componentModel = SPRING)
interface ProjectMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "name", source = "name")
    fun toEntity(name: String): Project

    fun toProjectDto(projects: List<Project>): List<ProjectDto>
}
