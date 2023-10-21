package ru.smk.assortment.storage.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.smk.assortment.storage.entity.Project

interface ProjectRepository : JpaRepository<Project, Long> {
}