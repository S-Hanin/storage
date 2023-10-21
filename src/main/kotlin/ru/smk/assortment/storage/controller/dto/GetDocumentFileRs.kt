package ru.smk.assortment.storage.controller.dto

import org.springframework.core.io.Resource

class GetDocumentFileRs(
    val filename: String,
    val file: Resource
)
