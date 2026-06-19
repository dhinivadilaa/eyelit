import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
export const check = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})

check.definition = {
    methods: ["get","head"],
    url: '/email-check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
check.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: check.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
check.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: check.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
    const checkForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: check.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
        checkForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EmailCheckController::__invoke
 * @see app/Http/Controllers/EmailCheckController.php:10
 * @route '/email-check'
 */
        checkForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: check.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    check.form = checkForm
const email = {
    check: Object.assign(check, check),
}

export default email