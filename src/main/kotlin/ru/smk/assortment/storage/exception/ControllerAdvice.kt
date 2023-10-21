package ru.smk.assortment.storage.exception

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ControllerAdvice {

    val log: Logger = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(value = [ScenarioException::class])
    fun handleScenarioException(exception: ScenarioException): ResponseEntity<Any> {
        log.error(exception.message)
        return ResponseEntity
            .badRequest()
            .body(object {
                val error = object {
                    val message = exception.message
                }
            })
    }
}