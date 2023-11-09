package ru.smk.assortment.storage.controller

import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import ru.smk.assortment.storage.controller.dto.*
import ru.smk.assortment.storage.controller.utils.asAttachment
import ru.smk.assortment.storage.controller.utils.asInline
import ru.smk.assortment.storage.scenario.*

@RestController
@RequestMapping("/documents")
class DocumentController(
    val uploadFileScenario: UploadFileScenario,
    val getFileScenario: GetFileScenario,
    val getDocumentByNameScenario: GetDocumentByNameScenario,
    val getDocumentsByProjectScenario: GetDocumentsByProjectScenario,
    val getProjectsScenario: GetProjectsScenario,
    val findDocumentsScenario: FindDocumentsScenario,
    val getDocumentsByNamesScenario: GetDocumentsByNamesScenario
) {

    @CrossOrigin(originPatterns = ["*"])
    @GetMapping("/projects", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getProjects(): ResponseEntity<GetProjectsRs> {
        return ResponseEntity.ok(getProjectsScenario.execute())
    }

    @CrossOrigin(originPatterns = ["*"])
    @PostMapping("/upload", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadDocument(
        @RequestPart request: UploadDocumentFileRq,
        @RequestPart file: MultipartFile
    ): ResponseEntity<UploadDocumentFileRs> {
        return ResponseEntity.ok(uploadFileScenario.execute(request, file))
    }

    @CrossOrigin(originPatterns = ["*"])
    @PostMapping("/download", produces = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun downloadDocumentAsAttachment(@RequestBody request: GetDocumentFileRq): ResponseEntity<Resource> {
        val result = getFileScenario.execute(request)
        val contentDisposition = result.filename.asAttachment()
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
            .body(result.file)
    }

    @CrossOrigin(originPatterns = ["*"])
    @GetMapping("/download/{filename}", produces = [MediaType.APPLICATION_PDF_VALUE])
    fun downloadDocumentAsInline(@PathVariable filename: String): ResponseEntity<Resource> {
        val result = getFileScenario.execute(GetDocumentFileRq().also { it.fileName=filename })
        val contentDisposition = result.filename.asInline()
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
            .body(result.file)
    }

    @CrossOrigin(originPatterns = ["*"])
    @GetMapping("/search")
    fun findDocuments(@RequestParam name: String): ResponseEntity<FindDocumentsRs> {
        return ResponseEntity.ok(findDocumentsScenario.execute(name))
    }

    @CrossOrigin(originPatterns = ["*"])
    @GetMapping("/by-name/{name}")
    fun getDocumentByName(@PathVariable name: String): ResponseEntity<GetDocumentRs> {
        return ResponseEntity.ok(getDocumentByNameScenario.execute(name))
    }

    @CrossOrigin(originPatterns = ["*"])
    @PostMapping("/by-names")
    fun getDocumentByNames(@RequestBody request: GetDocumentsByNames): ResponseEntity<FindDocumentsRs> {
        return ResponseEntity.ok(getDocumentsByNamesScenario.execute(request))
    }

    @CrossOrigin(originPatterns = ["*"])
    @GetMapping("/by-project/{name}")
    fun getDocumentsByProject(@PathVariable name: String): ResponseEntity<GetDocumentsRs> {
        return ResponseEntity.ok(getDocumentsByProjectScenario.execute(name))
    }
}