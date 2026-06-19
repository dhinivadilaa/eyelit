import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::updatePeran
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
export const updatePeran = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePeran.url(args, options),
    method: 'patch',
})

updatePeran.definition = {
    methods: ["patch"],
    url: '/admin/pengguna/{id}/peran',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DashboardController::updatePeran
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
updatePeran.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatePeran.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::updatePeran
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
updatePeran.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePeran.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DashboardController::updatePeran
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
    const updatePeranForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePeran.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::updatePeran
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
        updatePeranForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePeran.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePeran.form = updatePeranForm
/**
* @see \App\Http\Controllers\DashboardController::hapus
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
export const hapus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapus.url(args, options),
    method: 'delete',
})

hapus.definition = {
    methods: ["delete"],
    url: '/admin/pengguna/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DashboardController::hapus
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
hapus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hapus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::hapus
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
hapus.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapus.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DashboardController::hapus
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
    const hapusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::hapus
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
        hapusForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapus.form = hapusForm
const pengguna = {
    updatePeran: Object.assign(updatePeran, updatePeran),
hapus: Object.assign(hapus, hapus),
}

export default pengguna