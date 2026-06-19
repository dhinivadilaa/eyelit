import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import ulasan from './ulasan'
/**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pesanan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::index
 * @see app/Http/Controllers/PesananController.php:12
 * @route '/pesanan'
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
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/pesanan/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:34
 * @route '/pesanan/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\PesananController::status
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/pesanan/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PesananController::status
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::status
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
status.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PesananController::status
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::status
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
        statusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
export const statusPembayaran = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPembayaran.url(args, options),
    method: 'get',
})

statusPembayaran.definition = {
    methods: ["get","head"],
    url: '/pesanan/{id}/status-pembayaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaran.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return statusPembayaran.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaran.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPembayaran.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaran.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statusPembayaran.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
    const statusPembayaranForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statusPembayaran.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
        statusPembayaranForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPembayaran.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::statusPembayaran
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
        statusPembayaranForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPembayaran.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statusPembayaran.form = statusPembayaranForm
/**
* @see \App\Http\Controllers\PesananController::cekPembayaran
 * @see app/Http/Controllers/PesananController.php:190
 * @route '/pesanan/{id}/cek-pembayaran'
 */
export const cekPembayaran = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cekPembayaran.url(args, options),
    method: 'patch',
})

cekPembayaran.definition = {
    methods: ["patch"],
    url: '/pesanan/{id}/cek-pembayaran',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PesananController::cekPembayaran
 * @see app/Http/Controllers/PesananController.php:190
 * @route '/pesanan/{id}/cek-pembayaran'
 */
cekPembayaran.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cekPembayaran.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::cekPembayaran
 * @see app/Http/Controllers/PesananController.php:190
 * @route '/pesanan/{id}/cek-pembayaran'
 */
cekPembayaran.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cekPembayaran.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PesananController::cekPembayaran
 * @see app/Http/Controllers/PesananController.php:190
 * @route '/pesanan/{id}/cek-pembayaran'
 */
    const cekPembayaranForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cekPembayaran.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::cekPembayaran
 * @see app/Http/Controllers/PesananController.php:190
 * @route '/pesanan/{id}/cek-pembayaran'
 */
        cekPembayaranForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cekPembayaran.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cekPembayaran.form = cekPembayaranForm
/**
* @see \App\Http\Controllers\PesananController::batalkan
 * @see app/Http/Controllers/PesananController.php:215
 * @route '/pesanan/{id}/batalkan'
 */
export const batalkan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batalkan.url(args, options),
    method: 'post',
})

batalkan.definition = {
    methods: ["post"],
    url: '/pesanan/{id}/batalkan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PesananController::batalkan
 * @see app/Http/Controllers/PesananController.php:215
 * @route '/pesanan/{id}/batalkan'
 */
batalkan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return batalkan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::batalkan
 * @see app/Http/Controllers/PesananController.php:215
 * @route '/pesanan/{id}/batalkan'
 */
batalkan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batalkan.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PesananController::batalkan
 * @see app/Http/Controllers/PesananController.php:215
 * @route '/pesanan/{id}/batalkan'
 */
    const batalkanForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batalkan.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::batalkan
 * @see app/Http/Controllers/PesananController.php:215
 * @route '/pesanan/{id}/batalkan'
 */
        batalkanForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batalkan.url(args, options),
            method: 'post',
        })
    
    batalkan.form = batalkanForm
const pesanan = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
status: Object.assign(status, status),
statusPembayaran: Object.assign(statusPembayaran, statusPembayaran),
cekPembayaran: Object.assign(cekPembayaran, cekPembayaran),
batalkan: Object.assign(batalkan, batalkan),
ulasan: Object.assign(ulasan, ulasan),
}

export default pesanan