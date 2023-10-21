package ru.smk.assortment.storage.entity

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "document_files")
class DocumentFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "document_id")
    var document: Document? = null

    @Column(name = "link", nullable = false)
    var link: String? = null

    @Column(name = "hash", nullable = false)
    var hash: String? = null

    @Column(name = "version", nullable = false)
    var version: Int = 0

    @Column(name = "created_by")
    var createdBy: String? = null

    @Column(name = "created_at")
    var createdAt: OffsetDateTime? = null
}
