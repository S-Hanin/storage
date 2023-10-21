package ru.smk.assortment.storage.service

import org.apache.commons.codec.digest.DigestUtils
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import ru.smk.assortment.storage.entity.Document
import ru.smk.assortment.storage.entity.DocumentFile
import java.nio.file.Files
import java.security.MessageDigest
import kotlin.io.path.Path
import kotlin.io.path.exists

@Service
@Qualifier("FilesystemStorage")
class FilesystemStorageService : StorageService {

    @Value("\${storage.path}")
    lateinit var storagePath: String

    override fun saveFile(document: Document, file: MultipartFile): DocumentFile {
        val version = document.getLastDocumentFile()?.let { it.version + 1 } ?: 0
        val folderPath = Path(storagePath, document.project!!.name)

        if (!folderPath.exists()) {
            Files.createDirectory(folderPath)
        }

        val filePath = Path(storagePath, document.project!!.name, "${document.name}_${version}.pdf")

        if (filePath.exists()) throw IllegalStateException()

        Files.write(filePath, file.bytes)
        return DocumentFile().also {
            it.document = document
            it.link = filePath.toString()
            it.hash = DigestUtils.sha256Hex(file.bytes)
            it.version = version
        }
    }
}