package ru.smk.assortment.storage.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.smk.assortment.storage.entity.Document

interface DocumentRepository : JpaRepository<Document, Long> {

    fun findAllByNameIn(documentNames: List<String>): List<Document>
}