import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
export const store = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pesanan/{id}/ulasan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
store.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return store.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
store.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
    const storeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
        storeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ulasan = {
    store: Object.assign(store, store),
}

export default ulasan