package ru.smk.assortment.storage.service.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingConstants.ComponentModel.SPRING
import org.mapstruct.NullValueMappingStrategy
import ru.smk.assortment.storage.controller.dto.FindDocumentsRs
import ru.smk.assortment.storage.controller.dto.GetDocumentRs
import ru.smk.assortment.storage.controller.dto.GetDocumentsRs
import ru.smk.assortment.storage.controller.dto.UploadDocumentFileRq
import ru.smk.assortment.storage.entity.Document
import ru.smk.assortment.storage.entity.Project

@Mapper(
    componentModel = SPRING,
    nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT
)
interface DocumentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "documentFiles", ignore = true)
    fun toEntity(dto: UploadDocumentFileRq): Document

    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "versions", source = "documentFiles")
    fun toGetDocumentRs(document: Document): GetDocumentRs

    @Mapping(target = "projectName", source = "name")
    fun toGetDocumentsRs(project: Project): GetDocumentsRs

    @Mapping(target = "versions", source = "documentFiles")
    fun toDocumentDto(document: Document): GetDocumentsRs.DocumentDto

    fun toDocumentDtoFind(documents: List<Document>): List<FindDocumentsRs.DocumentDto>

}