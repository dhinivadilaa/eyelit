import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import alamat8f3ed3 from './alamat'
/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
export const langsung = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: langsung.url(options),
    method: 'get',
})

langsung.definition = {
    methods: ["get","head"],
    url: '/checkout/langsung',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsung.url = (options?: RouteQueryOptions) => {
    return langsung.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsung.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: langsung.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
langsung.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: langsung.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
    const langsungForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: langsung.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
        langsungForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: langsung.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckoutController::langsung
 * @see app/Http/Controllers/CheckoutController.php:89
 * @route '/checkout/langsung'
 */
        langsungForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: langsung.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    langsung.form = langsungForm
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
* @see \App\Http\Controllers\CheckoutController::alamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
export const alamat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alamat.url(options),
    method: 'post',
})

alamat.definition = {
    methods: ["post"],
    url: '/checkout/alamat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::alamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
alamat.url = (options?: RouteQueryOptions) => {
    return alamat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::alamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
alamat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: alamat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckoutController::alamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
    const alamatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: alamat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::alamat
 * @see app/Http/Controllers/CheckoutController.php:343
 * @route '/checkout/alamat'
 */
        alamatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: alamat.url(options),
            method: 'post',
        })
    
    alamat.form = alamatForm
/**
* @see \App\Http\Controllers\OngkirController::ongkir
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
export const ongkir = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ongkir.url(options),
    method: 'post',
})

ongkir.definition = {
    methods: ["post"],
    url: '/checkout/ongkir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OngkirController::ongkir
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
ongkir.url = (options?: RouteQueryOptions) => {
    return ongkir.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OngkirController::ongkir
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
ongkir.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ongkir.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OngkirController::ongkir
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
    const ongkirForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ongkir.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OngkirController::ongkir
 * @see app/Http/Controllers/OngkirController.php:21
 * @route '/checkout/ongkir'
 */
        ongkirForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ongkir.url(options),
            method: 'post',
        })
    
    ongkir.form = ongkirForm
const checkout = {
    langsung: Object.assign(langsung, langsung),
proses: Object.assign(proses, proses),
alamat: Object.assign(alamat, alamat8f3ed3),
ongkir: Object.assign(ongkir, ongkir),
}

export default checkout