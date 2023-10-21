package ru.smk.assortment.storage.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.smk.assortment.storage.entity.DocumentFile
import java.util.*

interface PartFileRepository: JpaRepository<DocumentFile, Long> {

    fun findByHash(hash: String): Optional<DocumentFile>
}