package ru.smk.assortment.storage.service

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import ru.smk.assortment.storage.entity.Document
import ru.smk.assortment.storage.entity.DocumentFile

@Service
interface StorageService {

    fun saveFile(document: Document, file: MultipartFile): DocumentFile
}