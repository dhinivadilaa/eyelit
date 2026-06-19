import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
const UsernameCheckController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: UsernameCheckController.url(options),
    method: 'get',
})

UsernameCheckController.definition = {
    methods: ["get","head"],
    url: '/username-check',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
UsernameCheckController.url = (options?: RouteQueryOptions) => {
    return UsernameCheckController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
UsernameCheckController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: UsernameCheckController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
UsernameCheckController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: UsernameCheckController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
    const UsernameCheckControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: UsernameCheckController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
        UsernameCheckControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: UsernameCheckController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UsernameCheckController::__invoke
 * @see app/Http/Controllers/UsernameCheckController.php:10
 * @route '/username-check'
 */
        UsernameCheckControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: UsernameCheckController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    UsernameCheckController.form = UsernameCheckControllerForm
export default UsernameCheckController