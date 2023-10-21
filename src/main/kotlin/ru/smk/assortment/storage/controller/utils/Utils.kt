package ru.smk.assortment.storage.controller.utils

import org.springframework.web.util.UriUtils
import java.net.URLEncoder

fun String.asAttachment(): String {
    return "attachment;filename*=utf-8''${UriUtils.encode(this, Charsets.UTF_8)}"
}

fun String.asInline(): String {
    return "inline; filename*=utf-8''${UriUtils.encode(this, Charsets.UTF_8)}"
}