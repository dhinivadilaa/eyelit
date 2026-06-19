import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckoutController::index
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
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
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
export const langsung = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: langsung.url(options),
    method: 'post',
})

langsung.definition = {
    methods: ["post"],
    url: '/checkout/langsung',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
langsung.url = (options?: RouteQueryOptions) => {
    return langsung.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
langsung.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: langsung.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
    const langsungForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: langsung.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
        langsungForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: langsung.url(options),
            method: 'post',
        })
    
    langsung.form = langsungForm
/**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
export const langsungGet = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: langsungGet.url(options),
    method: 'get',
})

langsungGet.definition = {
    methods: ["get","head"],
    url: '/checkout/langsung',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsungGet.url = (options?: RouteQueryOptions) => {
    return langsungGet.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsungGet.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: langsungGet.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsungGet.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: langsungGet.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
    const langsungGetForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: langsungGet.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
        langsungGetForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: langsungGet.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckoutController::langsungGet
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
        langsungGetForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: langsungGet.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    langsungGet.form = langsungGetForm
/**
* @see \App\Http\Controllers\CheckoutController::proses
 * @see app/Http/Controllers/CheckoutController.php:217
 * @route '/checkout'
 */
export const proses = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proses.url(options),
    method: 'post',
})

proses.definition = {
    methods: ["post"],
    url: '/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::proses
 * @see app/Http/Controllers/CheckoutController.php:217
 * @route '/checkout'
 */
proses.url = (options?: RouteQueryOptions) => {
    return proses.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::proses
 * @see app/Http/Controllers/CheckoutController.php:217
 * @route '/checkout'
 */
proses.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proses.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckoutController::proses
 * @see app/Http/Controllers/CheckoutController.php:217
 * @route '/checkout'
 */
    const prosesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: proses.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::proses
 * @see app/Http/Controllers/CheckoutController.php:217
 * @route '/checkout'
 */
        prosesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: proses.url(options),
            method: 'post',
        })
    
    proses.form = prosesForm
/**
* @see \App\Http\Controllers\CheckoutController::tambahAlamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
export const tambahAlamat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambahAlamat.url(options),
    method: 'post',
})

tambahAlamat.definition = {
    methods: ["post"],
    url: '/checkout/alamat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::tambahAlamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
tambahAlamat.url = (options?: RouteQueryOptions) => {
    return tambahAlamat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::tambahAlamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
tambahAlamat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tambahAlamat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckoutController::tambahAlamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
    const tambahAlamatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tambahAlamat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::tambahAlamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
        tambahAlamatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tambahAlamat.url(options),
            method: 'post',
        })
    
    tambahAlamat.form = tambahAlamatForm
/**
* @see \App\Http\Controllers\CheckoutController::editAlamat
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
export const editAlamat = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: editAlamat.url(args, options),
    method: 'patch',
})

editAlamat.definition = {
    methods: ["patch"],
    url: '/checkout/alamat/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CheckoutController::editAlamat
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
editAlamat.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return editAlamat.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::editAlamat
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
editAlamat.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: editAlamat.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CheckoutController::editAlamat
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
    const editAlamatForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: editAlamat.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::editAlamat
 * @see app/Http/Controllers/CheckoutController.php:363
 * @route '/checkout/alamat/{id}'
 */
        editAlamatForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: editAlamat.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    editAlamat.form = editAlamatForm
/**
* @see \App\Http\Controllers\CheckoutController::hapusAlamat
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
export const hapusAlamat = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusAlamat.url(args, options),
    method: 'delete',
})

hapusAlamat.definition = {
    methods: ["delete"],
    url: '/checkout/alamat/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CheckoutController::hapusAlamat
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
hapusAlamat.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return hapusAlamat.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::hapusAlamat
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
hapusAlamat.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusAlamat.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CheckoutController::hapusAlamat
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
    const hapusAlamatForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusAlamat.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::hapusAlamat
 * @see app/Http/Controllers/CheckoutController.php:383
 * @route '/checkout/alamat/{id}'
 */
        hapusAlamatForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusAlamat.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusAlamat.form = hapusAlamatForm
/**
* @see \App\Http\Controllers\CheckoutController::setUtamaAlamat
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
export const setUtamaAlamat = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setUtamaAlamat.url(args, options),
    method: 'patch',
})

setUtamaAlamat.definition = {
    methods: ["patch"],
    url: '/checkout/alamat/{id}/utama',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CheckoutController::setUtamaAlamat
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
setUtamaAlamat.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return setUtamaAlamat.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::setUtamaAlamat
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
setUtamaAlamat.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setUtamaAlamat.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CheckoutController::setUtamaAlamat
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
    const setUtamaAlamatForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setUtamaAlamat.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::setUtamaAlamat
 * @see app/Http/Controllers/CheckoutController.php:394
 * @route '/checkout/alamat/{id}/utama'
 */
        setUtamaAlamatForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setUtamaAlamat.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    setUtamaAlamat.form = setUtamaAlamatForm
const CheckoutController = { index, langsung, langsungGet, proses, tambahAlamat, editAlamat, hapusAlamat, setUtamaAlamat }

export default CheckoutController