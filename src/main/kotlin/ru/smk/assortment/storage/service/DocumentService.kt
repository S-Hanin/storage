package ru.smk.assortment.storage.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Example
import org.springframework.data.domain.ExampleMatcher
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.startsWith
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.smk.assortment.storage.controller.dto.UploadDocumentFileRq
import ru.smk.assortment.storage.entity.Document
import ru.smk.assortment.storage.entity.Project
import ru.smk.assortment.storage.repository.DocumentRepository
import ru.smk.assortment.storage.repository.ProjectRepository
import ru.smk.assortment.storage.service.mapper.DocumentMapper
import ru.smk.assortment.storage.service.mapper.ProjectMapper
import java.util.*

@Service
class DocumentService(
    val projectRepository: ProjectRepository,
    val documentRepository: DocumentRepository,
    val documentMapper: DocumentMapper,
    val projectMapper: ProjectMapper
) {

    val log: Logger = LoggerFactory.getLogger(javaClass)

    @Transactional
    fun findDocuments(documentName: String): List<Document> {
        return documentRepository.findAll(
            Example.of(
                Document().also { it.name = documentName },
                ExampleMatcher.matching()
                    .withMatcher("name", startsWith().ignoreCase())
            )
        ).toList()
    }

    @Transactional
    fun getDocument(partNumber: String): Optional<Document> {
        return documentRepository.findOne(Example.of(
            Document().also {
                it.name = partNumber
            }
        ))
    }

    @Transactional
    fun createDocument(dto: UploadDocumentFileRq, projectDocument: Project): Document {
        return documentMapper.toEntity(dto)
            .also {
                it.project = projectDocument
            }
            .run {
                documentRepository.save(this)
            }
    }

    @Transactional
    fun getProject(projectName: String): Optional<Project> {
        return projectRepository.findOne(Example.of(Project(name = projectName)))
    }

    @Transactional
    fun createProject(projectName: String): Project {
        val entity = projectMapper.toEntity(projectName)
        return projectRepository.save(entity)
    }

    @Transactional
    fun getProjects(): MutableList<Project> {
        return projectRepository.findAll()
    }

}
