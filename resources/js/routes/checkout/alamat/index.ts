import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CheckoutController::update
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/checkout/alamat/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CheckoutController::update
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
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
* @see \App\Http\Controllers\CheckoutController::update
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CheckoutController::update
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::update
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
        updateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CheckoutController::destroy
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/checkout/alamat/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CheckoutController::destroy
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::destroy
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CheckoutController::destroy
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::destroy
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\CheckoutController::utama
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
export const utama = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: utama.url(args, options),
    method: 'patch',
})

utama.definition = {
    methods: ["patch"],
    url: '/checkout/alamat/{id}/utama',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CheckoutController::utama
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
utama.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return utama.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::utama
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
utama.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: utama.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CheckoutController::utama
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
    const utamaForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: utama.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::utama
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
        utamaForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: utama.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    utama.form = utamaForm
const alamat = {
    update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
utama: Object.assign(utama, utama),
}

export default alamat