import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
const EmailCheckController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EmailCheckController.url(options),
    method: 'get',
})

EmailCheckController.definition = {
    methods: ["get","head"],
    url: '/email-check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
EmailCheckController.url = (options?: RouteQueryOptions) => {
    return EmailCheckController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
EmailCheckController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EmailCheckController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
EmailCheckController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EmailCheckController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
    const EmailCheckControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EmailCheckController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
        EmailCheckControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EmailCheckController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
        EmailCheckControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EmailCheckController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EmailCheckController.form = EmailCheckControllerForm
export default EmailCheckController