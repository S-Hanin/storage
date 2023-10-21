package ru.smk.assortment.storage.controller.dto

import java.time.OffsetDateTime

class GetDocumentsRs {

    var projectName: String? = null
    var documents: List<DocumentDto> = mutableListOf()

    class DocumentDto {
        var id: Long? = null
        var name: String? = null
        var description: String? = null
        var createdBy: String? = null
        var createdAt: OffsetDateTime? = null
        var versions: List<DocumentFileDto> = mutableListOf()

        class DocumentFileDto {
            var version: Int = 0
            var createdBy: String? = null
            var createdAt: OffsetDateTime? = null
        }
    }
}
