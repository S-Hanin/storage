package ru.smk.assortment.storage.controller.dto

import java.time.OffsetDateTime

data class UploadDocumentFileRq(
    val projectName: String,
    val name: String,
    val description: String,
    val createdBy: String,
    val createdAt: OffsetDateTime
) {}
