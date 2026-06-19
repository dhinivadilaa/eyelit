import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UlasanController::storeForPesanan
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
export const storeForPesanan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForPesanan.url(args, options),
    method: 'post',
})

storeForPesanan.definition = {
    methods: ["post"],
    url: '/pesanan/{id}/ulasan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UlasanController::storeForPesanan
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
storeForPesanan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeForPesanan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UlasanController::storeForPesanan
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
storeForPesanan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeForPesanan.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UlasanController::storeForPesanan
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
    const storeForPesananForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeForPesanan.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UlasanController::storeForPesanan
 * @see app/Http/Controllers/UlasanController.php:93
 * @route '/pesanan/{id}/ulasan'
 */
        storeForPesananForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeForPesanan.url(args, options),
            method: 'post',
        })
    
    storeForPesanan.form = storeForPesananForm
/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:13
 * @route '/ulasan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ulasan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:13
 * @route '/ulasan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:13
 * @route '/ulasan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:13
 * @route '/ulasan'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UlasanController::store
 * @see app/Http/Controllers/UlasanController.php:13
 * @route '/ulasan'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\UlasanController::update
 * @see app/Http/Controllers/UlasanController.php:65
 * @route '/ulasan/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/ulasan/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\UlasanController::update
 * @see app/Http/Controllers/UlasanController.php:65
 * @route '/ulasan/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UlasanController::update
 * @see app/Http/Controllers/UlasanController.php:65
 * @route '/ulasan/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\UlasanController::update
 * @see app/Http/Controllers/UlasanController.php:65
 * @route '/ulasan/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UlasanController::update
 * @see app/Http/Controllers/UlasanController.php:65
 * @route '/ulasan/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const UlasanController = { storeForPesanan, store, update }

export default UlasanController