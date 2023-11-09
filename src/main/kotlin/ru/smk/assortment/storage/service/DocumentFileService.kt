package ru.smk.assortment.storage.service

import org.apache.commons.codec.digest.DigestUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import ru.smk.assortment.storage.entity.DocumentFile
import ru.smk.assortment.storage.repository.PartFileRepository
import java.util.*

@Service
class DocumentFileService(
    val partFileRepository: PartFileRepository
) {

    @Transactional
    fun getPartFileDocument(file: MultipartFile): Optional<DocumentFile> {
        val digest = DigestUtils.sha256Hex(file.bytes)
        return partFileRepository.findByHash(digest)
    }

}