package ru.smk.assortment.storage.entity

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "documents")
class Document{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "description", nullable = false)
    var description: String? = null

    @ManyToOne
    @JoinColumn( name = "project_id")
    var project: Project? = null

    @Column(name = "created_by")
    var createdBy: String? = null

    @Column(name = "created_at")
    var createdAt: OffsetDateTime? = null

    @OneToMany(mappedBy = "document", cascade = [CascadeType.PERSIST])
    var documentFiles: MutableList<DocumentFile> = mutableListOf()

    fun getLastDocumentFile(): DocumentFile? {
        return documentFiles.maxByOrNull { it.version }
    }
}