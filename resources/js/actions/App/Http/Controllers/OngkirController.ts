import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OngkirController::hitung
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
export const hitung = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitung.url(options),
    method: 'post',
})

hitung.definition = {
    methods: ["post"],
    url: '/checkout/ongkir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OngkirController::hitung
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
hitung.url = (options?: RouteQueryOptions) => {
    return hitung.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OngkirController::hitung
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
hitung.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hitung.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OngkirController::hitung
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
    const hitungForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hitung.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OngkirController::hitung
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
        hitungForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hitung.url(options),
            method: 'post',
        })
    
    hitung.form = hitungForm
/**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
export const getProvinsi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinsi.url(options),
    method: 'get',
})

getProvinsi.definition = {
    methods: ["get","head"],
    url: '/api/provinsi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
getProvinsi.url = (options?: RouteQueryOptions) => {
    return getProvinsi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
getProvinsi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinsi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
getProvinsi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvinsi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
    const getProvinsiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getProvinsi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
        getProvinsiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinsi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OngkirController::getProvinsi
 * @see app/Http/Controllers/OngkirController.php:136
 * @route '/api/provinsi'
 */
        getProvinsiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinsi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getProvinsi.form = getProvinsiForm
/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
const getKotae44bd9965a82af480f79a43d16406ea9 = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKotae44bd9965a82af480f79a43d16406ea9.url(args, options),
    method: 'get',
})

getKotae44bd9965a82af480f79a43d16406ea9.definition = {
    methods: ["get","head"],
    url: '/api/kota/{provinsiId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
getKotae44bd9965a82af480f79a43d16406ea9.url = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provinsiId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    provinsiId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        provinsiId: args.provinsiId,
                }

    return getKotae44bd9965a82af480f79a43d16406ea9.definition.url
            .replace('{provinsiId}', parsedArgs.provinsiId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
getKotae44bd9965a82af480f79a43d16406ea9.get = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKotae44bd9965a82af480f79a43d16406ea9.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
getKotae44bd9965a82af480f79a43d16406ea9.head = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKotae44bd9965a82af480f79a43d16406ea9.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
    const getKotae44bd9965a82af480f79a43d16406ea9Form = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getKotae44bd9965a82af480f79a43d16406ea9.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
        getKotae44bd9965a82af480f79a43d16406ea9Form.get = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKotae44bd9965a82af480f79a43d16406ea9.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota/{provinsiId}'
 */
        getKotae44bd9965a82af480f79a43d16406ea9Form.head = (args: { provinsiId: string | number } | [provinsiId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKotae44bd9965a82af480f79a43d16406ea9.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getKotae44bd9965a82af480f79a43d16406ea9.form = getKotae44bd9965a82af480f79a43d16406ea9Form
    /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
const getKota2e00c6a5004c65065f176ad838ee9f16 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKota2e00c6a5004c65065f176ad838ee9f16.url(options),
    method: 'get',
})

getKota2e00c6a5004c65065f176ad838ee9f16.definition = {
    methods: ["get","head"],
    url: '/api/kota',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
getKota2e00c6a5004c65065f176ad838ee9f16.url = (options?: RouteQueryOptions) => {
    return getKota2e00c6a5004c65065f176ad838ee9f16.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
getKota2e00c6a5004c65065f176ad838ee9f16.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKota2e00c6a5004c65065f176ad838ee9f16.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
getKota2e00c6a5004c65065f176ad838ee9f16.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKota2e00c6a5004c65065f176ad838ee9f16.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
    const getKota2e00c6a5004c65065f176ad838ee9f16Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getKota2e00c6a5004c65065f176ad838ee9f16.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
        getKota2e00c6a5004c65065f176ad838ee9f16Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKota2e00c6a5004c65065f176ad838ee9f16.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OngkirController::getKota
 * @see app/Http/Controllers/OngkirController.php:186
 * @route '/api/kota'
 */
        getKota2e00c6a5004c65065f176ad838ee9f16Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKota2e00c6a5004c65065f176ad838ee9f16.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getKota2e00c6a5004c65065f176ad838ee9f16.form = getKota2e00c6a5004c65065f176ad838ee9f16Form

export const getKota = {
    '/api/kota/{provinsiId}': getKotae44bd9965a82af480f79a43d16406ea9,
    '/api/kota': getKota2e00c6a5004c65065f176ad838ee9f16,
}

const OngkirController = { hitung, getProvinsi, getKota }

export default OngkirController