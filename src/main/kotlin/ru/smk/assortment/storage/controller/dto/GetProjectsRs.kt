package ru.smk.assortment.storage.controller.dto

class GetProjectsRs(val projects: List<ProjectDto>) {
}

class ProjectDto(val id: Int, val name: String) {
}
