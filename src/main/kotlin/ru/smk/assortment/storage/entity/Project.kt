package ru.smk.assortment.storage.entity

import jakarta.persistence.*

@Entity
@Table(name = "projects")
class Project(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    var name: String,

    @OneToMany(mappedBy = "project")
    val documents: List<Document>? = mutableListOf()
)
