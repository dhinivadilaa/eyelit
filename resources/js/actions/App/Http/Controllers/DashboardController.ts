import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
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
* @see \App\Http\Controllers\DashboardController::updateStatusPesanan
 * @see app/Http/Controllers/DashboardController.php:209
 * @route '/admin/pesanan/{id}/status'
 */
export const updateStatusPesanan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatusPesanan.url(args, options),
    method: 'patch',
})

updateStatusPesanan.definition = {
    methods: ["patch"],
    url: '/admin/pesanan/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DashboardController::updateStatusPesanan
 * @see app/Http/Controllers/DashboardController.php:209
 * @route '/admin/pesanan/{id}/status'
 */
updateStatusPesanan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatusPesanan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::updateStatusPesanan
 * @see app/Http/Controllers/DashboardController.php:209
 * @route '/admin/pesanan/{id}/status'
 */
updateStatusPesanan.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatusPesanan.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DashboardController::updateStatusPesanan
 * @see app/Http/Controllers/DashboardController.php:209
 * @route '/admin/pesanan/{id}/status'
 */
    const updateStatusPesananForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatusPesanan.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::updateStatusPesanan
 * @see app/Http/Controllers/DashboardController.php:209
 * @route '/admin/pesanan/{id}/status'
 */
        updateStatusPesananForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatusPesanan.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatusPesanan.form = updateStatusPesananForm
/**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
export const downloadLaporan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLaporan.url(options),
    method: 'get',
})

downloadLaporan.definition = {
    methods: ["get","head"],
    url: '/admin/laporan/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
downloadLaporan.url = (options?: RouteQueryOptions) => {
    return downloadLaporan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
downloadLaporan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLaporan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
downloadLaporan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadLaporan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
    const downloadLaporanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadLaporan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
        downloadLaporanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLaporan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::downloadLaporan
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
        downloadLaporanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLaporan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadLaporan.form = downloadLaporanForm
/**
* @see \App\Http\Controllers\DashboardController::updatePeranPengguna
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
export const updatePeranPengguna = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePeranPengguna.url(args, options),
    method: 'patch',
})

updatePeranPengguna.definition = {
    methods: ["patch"],
    url: '/admin/pengguna/{id}/peran',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DashboardController::updatePeranPengguna
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
updatePeranPengguna.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatePeranPengguna.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::updatePeranPengguna
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
updatePeranPengguna.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePeranPengguna.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DashboardController::updatePeranPengguna
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
    const updatePeranPenggunaForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePeranPengguna.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::updatePeranPengguna
 * @see app/Http/Controllers/DashboardController.php:334
 * @route '/admin/pengguna/{id}/peran'
 */
        updatePeranPenggunaForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePeranPengguna.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePeranPengguna.form = updatePeranPenggunaForm
/**
* @see \App\Http\Controllers\DashboardController::hapusPengguna
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
export const hapusPengguna = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusPengguna.url(args, options),
    method: 'delete',
})

hapusPengguna.definition = {
    methods: ["delete"],
    url: '/admin/pengguna/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DashboardController::hapusPengguna
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
hapusPengguna.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hapusPengguna.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::hapusPengguna
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
hapusPengguna.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusPengguna.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DashboardController::hapusPengguna
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
    const hapusPenggunaForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusPengguna.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::hapusPengguna
 * @see app/Http/Controllers/DashboardController.php:353
 * @route '/admin/pengguna/{id}'
 */
        hapusPenggunaForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusPengguna.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusPengguna.form = hapusPenggunaForm
/**
* @see \App\Http\Controllers\DashboardController::tambahProduk
 * @see app/Http/Controllers/DashboardController.php:376
 * @route '/admin/produk'
 */
export const tambahProduk = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambahProduk.url(options),
    method: 'post',
})

tambahProduk.definition = {
    methods: ["post"],
    url: '/admin/produk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DashboardController::tambahProduk
 * @see app/Http/Controllers/DashboardController.php:376
 * @route '/admin/produk'
 */
tambahProduk.url = (options?: RouteQueryOptions) => {
    return tambahProduk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::tambahProduk
 * @see app/Http/Controllers/DashboardController.php:376
 * @route '/admin/produk'
 */
tambahProduk.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambahProduk.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DashboardController::tambahProduk
 * @see app/Http/Controllers/DashboardController.php:376
 * @route '/admin/produk'
 */
    const tambahProdukForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tambahProduk.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::tambahProduk
 * @see app/Http/Controllers/DashboardController.php:376
 * @route '/admin/produk'
 */
        tambahProdukForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tambahProduk.url(options),
            method: 'post',
        })
    
    tambahProduk.form = tambahProdukForm
/**
* @see \App\Http\Controllers\DashboardController::editProduk
 * @see app/Http/Controllers/DashboardController.php:425
 * @route '/admin/produk/{id}'
 */
export const editProduk = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: editProduk.url(args, options),
    method: 'post',
})

editProduk.definition = {
    methods: ["post"],
    url: '/admin/produk/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DashboardController::editProduk
 * @see app/Http/Controllers/DashboardController.php:425
 * @route '/admin/produk/{id}'
 */
editProduk.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return editProduk.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::editProduk
 * @see app/Http/Controllers/DashboardController.php:425
 * @route '/admin/produk/{id}'
 */
editProduk.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: editProduk.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DashboardController::editProduk
 * @see app/Http/Controllers/DashboardController.php:425
 * @route '/admin/produk/{id}'
 */
    const editProdukForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: editProduk.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::editProduk
 * @see app/Http/Controllers/DashboardController.php:425
 * @route '/admin/produk/{id}'
 */
        editProdukForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: editProduk.url(args, options),
            method: 'post',
        })
    
    editProduk.form = editProdukForm
/**
* @see \App\Http\Controllers\DashboardController::hapusProduk
 * @see app/Http/Controllers/DashboardController.php:476
 * @route '/admin/produk/{id}'
 */
export const hapusProduk = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusProduk.url(args, options),
    method: 'delete',
})

hapusProduk.definition = {
    methods: ["delete"],
    url: '/admin/produk/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DashboardController::hapusProduk
 * @see app/Http/Controllers/DashboardController.php:476
 * @route '/admin/produk/{id}'
 */
hapusProduk.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hapusProduk.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::hapusProduk
 * @see app/Http/Controllers/DashboardController.php:476
 * @route '/admin/produk/{id}'
 */
hapusProduk.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusProduk.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DashboardController::hapusProduk
 * @see app/Http/Controllers/DashboardController.php:476
 * @route '/admin/produk/{id}'
 */
    const hapusProdukForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusProduk.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardController::hapusProduk
 * @see app/Http/Controllers/DashboardController.php:476
 * @route '/admin/produk/{id}'
 */
        hapusProdukForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusProduk.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusProduk.form = hapusProdukForm
const DashboardController = { index, updateStatusPesanan, downloadLaporan, updatePeranPengguna, hapusPengguna, tambahProduk, editProduk, hapusProduk }

export default DashboardController