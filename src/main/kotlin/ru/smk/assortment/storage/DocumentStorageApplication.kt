package ru.smk.assortment.storage

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DocumentStorageApplication

fun main(args: Array<String>) {
	runApplication<DocumentStorageApplication>(*args)
}
