package ru.smk.assortment.storage.common

import ru.smk.assortment.storage.exception.ScenarioException

class Scenario {

    companion object {
        fun <T> step(action: () -> T): Step<T> {
            return Step<T>().action(action)
        }
    }

    class Step<T> {

        private var result: T? = null
        private var exception: RuntimeException? = null

        fun action(supplier: () -> T): Step<T> {
            try {
                result = supplier()
            } catch (e: RuntimeException) {
                exception = e
            }
            return this
        }

        fun <R> map(transformer: (T) -> R): Step<R> {
            return try {
                Step<R>().also {
                    it.result = transformer(result!!)
                }
            } catch (e: RuntimeException) {
                Step<R>().also {
                    exception = e
                }
            }
        }

        fun apply(consumer: (T) -> Unit): Step<T> {
            if (result != null) {
                consumer(result!!)
            }
            return this
        }

        fun ifNot(supplier: () -> T): Step<T> {
            if (result == null) {
                action(supplier)
            }
            return this
        }

        fun onError(consumer: (RuntimeException) -> Unit): Step<T> {
            if (result == null && exception != null) {
                consumer(exception!!)
            }
            return this
        }

        fun get(): T {
            return result!!
        }

        fun validate(predicate: (T) -> Boolean): Step<T> {
            if (result != null && !predicate(result!!)) {
                result = null
                exception = IllegalArgumentException("Validation error. Result is in illegal state")
            }
            return this
        }
    }
}