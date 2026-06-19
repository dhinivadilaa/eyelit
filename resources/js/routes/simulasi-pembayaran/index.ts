import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
export const show = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/simulasi-pembayaran/{no_pesanan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
show.url = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{no_pesanan}', parsedArgs.no_pesanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
show.get = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
show.head = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
    const showForm = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
        showForm.get = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PesananController::show
 * @see app/Http/Controllers/PesananController.php:103
 * @route '/simulasi-pembayaran/{no_pesanan}'
 */
        showForm.head = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PesananController::proses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
export const proses = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proses.url(args, options),
    method: 'post',
})

proses.definition = {
    methods: ["post"],
    url: '/simulasi-pembayaran/{no_pesanan}/proses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PesananController::proses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
proses.url = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return proses.definition.url
            .replace('{no_pesanan}', parsedArgs.no_pesanan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PesananController::proses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
proses.post = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proses.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PesananController::proses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
    const prosesForm = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: proses.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PesananController::proses
 * @see app/Http/Controllers/PesananController.php:120
 * @route '/simulasi-pembayaran/{no_pesanan}/proses'
 */
        prosesForm.post = (args: { no_pesanan: string | number } | [no_pesanan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: proses.url(args, options),
            method: 'post',
        })
    
    proses.form = prosesForm
const simulasiPembayaran = {
    show: Object.assign(show, show),
proses: Object.assign(proses, proses),
}

export default simulasiPembayaran