import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\PesananController::updateStatus
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/pesanan/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PesananController::updateStatus
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::updateStatus
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
updateStatus.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PesananController::updateStatus
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::updateStatus
 * @see app/Http/Controllers/PesananController.php:75
 * @route '/pesanan/{id}/status'
 */
        updateStatusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
export const statusPembayaranJson = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPembayaranJson.url(args, options),
    method: 'get',
})

statusPembayaranJson.definition = {
    methods: ["get","head"],
    url: '/pesanan/{id}/status-pembayaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaranJson.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return statusPembayaranJson.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaranJson.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPembayaranJson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
statusPembayaranJson.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statusPembayaranJson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
    const statusPembayaranJsonForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statusPembayaranJson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
        statusPembayaranJsonForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPembayaranJson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::statusPembayaranJson
 * @see app/Http/Controllers/PesananController.php:243
 * @route '/pesanan/{id}/status-pembayaran'
 */
        statusPembayaranJsonForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPembayaranJson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statusPembayaranJson.form = statusPembayaranJsonForm
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
/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
export const simulasiPembayaranShow = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: simulasiPembayaranShow.url(args, options),
    method: 'get',
})

simulasiPembayaranShow.definition = {
    methods: ["get","head"],
    url: '/simulasi-pembayaran/{no_pesanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
simulasiPembayaranShow.url = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_pesanan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_pesanan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_pesanan: args.no_pesanan,
                }

    return simulasiPembayaranShow.definition.url
            .replace('{no_pesanan}', parsedArgs.no_pesanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
simulasiPembayaranShow.get = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: simulasiPembayaranShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
simulasiPembayaranShow.head = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: simulasiPembayaranShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
    const simulasiPembayaranShowForm = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: simulasiPembayaranShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
        simulasiPembayaranShowForm.get = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: simulasiPembayaranShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranShow
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
        simulasiPembayaranShowForm.head = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: simulasiPembayaranShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    simulasiPembayaranShow.form = simulasiPembayaranShowForm
/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranProses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
export const simulasiPembayaranProses = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simulasiPembayaranProses.url(args, options),
    method: 'post',
})

simulasiPembayaranProses.definition = {
    methods: ["post"],
    url: '/simulasi-pembayaran/{no_pesanan}/proses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranProses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
simulasiPembayaranProses.url = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { no_pesanan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    no_pesanan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        no_pesanan: args.no_pesanan,
                }

    return simulasiPembayaranProses.definition.url
            .replace('{no_pesanan}', parsedArgs.no_pesanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranProses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
simulasiPembayaranProses.post = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simulasiPembayaranProses.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranProses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
    const simulasiPembayaranProsesForm = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: simulasiPembayaranProses.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::simulasiPembayaranProses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
        simulasiPembayaranProsesForm.post = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: simulasiPembayaranProses.url(args, options),
            method: 'post',
        })
    
    simulasiPembayaranProses.form = simulasiPembayaranProsesForm
const PesananController = { index, show, updateStatus, statusPembayaranJson, cekPembayaran, batalkan, simulasiPembayaranShow, simulasiPembayaranProses }

export default PesananController