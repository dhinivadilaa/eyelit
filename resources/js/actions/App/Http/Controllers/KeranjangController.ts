import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/keranjang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KeranjangController::index
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\KeranjangController::tambah
 * @see app/Http/Controllers/KeranjangController.php:53
 * @route '/keranjang/tambah'
 */
export const tambah = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambah.url(options),
    method: 'post',
})

tambah.definition = {
    methods: ["post"],
    url: '/keranjang/tambah',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KeranjangController::tambah
 * @see app/Http/Controllers/KeranjangController.php:53
 * @route '/keranjang/tambah'
 */
tambah.url = (options?: RouteQueryOptions) => {
    return tambah.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeranjangController::tambah
 * @see app/Http/Controllers/KeranjangController.php:53
 * @route '/keranjang/tambah'
 */
tambah.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambah.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KeranjangController::tambah
 * @see app/Http/Controllers/KeranjangController.php:53
 * @route '/keranjang/tambah'
 */
    const tambahForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tambah.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KeranjangController::tambah
 * @see app/Http/Controllers/KeranjangController.php:53
 * @route '/keranjang/tambah'
 */
        tambahForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tambah.url(options),
            method: 'post',
        })
    
    tambah.form = tambahForm
/**
* @see \App\Http\Controllers\KeranjangController::update
 * @see app/Http/Controllers/KeranjangController.php:101
 * @route '/keranjang/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/keranjang/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KeranjangController::update
 * @see app/Http/Controllers/KeranjangController.php:101
 * @route '/keranjang/{id}'
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
* @see \App\Http\Controllers\KeranjangController::update
 * @see app/Http/Controllers/KeranjangController.php:101
 * @route '/keranjang/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KeranjangController::update
 * @see app/Http/Controllers/KeranjangController.php:101
 * @route '/keranjang/{id}'
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
* @see \App\Http\Controllers\KeranjangController::update
 * @see app/Http/Controllers/KeranjangController.php:101
 * @route '/keranjang/{id}'
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
* @see \App\Http\Controllers\KeranjangController::hapus
 * @see app/Http/Controllers/KeranjangController.php:118
 * @route '/keranjang/{id}'
 */
export const hapus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapus.url(args, options),
    method: 'delete',
})

hapus.definition = {
    methods: ["delete"],
    url: '/keranjang/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KeranjangController::hapus
 * @see app/Http/Controllers/KeranjangController.php:118
 * @route '/keranjang/{id}'
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
* @see \App\Http\Controllers\KeranjangController::hapus
 * @see app/Http/Controllers/KeranjangController.php:118
 * @route '/keranjang/{id}'
 */
hapus.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapus.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KeranjangController::hapus
 * @see app/Http/Controllers/KeranjangController.php:118
 * @route '/keranjang/{id}'
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
* @see \App\Http\Controllers\KeranjangController::hapus
 * @see app/Http/Controllers/KeranjangController.php:118
 * @route '/keranjang/{id}'
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
const KeranjangController = { index, tambah, update, hapus }

export default KeranjangController