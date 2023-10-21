package ru.smk.assortment.storage.controller.dto

import java.time.OffsetDateTime

class FindDocumentsRs {

    var documents: List<DocumentDto> = mutableListOf()

    class DocumentDto {
        var id: Long? = null
        var name: String? = null
        var description: String? = null
        var createdBy: String? = null
        var createdAt: OffsetDateTime? = null
    }
}
