import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
export const show = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/produk/{produk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
show.url = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { produk: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    produk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        produk: args.produk,
                }

    return show.definition.url
            .replace('{produk}', parsedArgs.produk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
show.get = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
show.head = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
    const showForm = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
        showForm.get = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProdukController::show
 * @see app/Http/Controllers/ProdukController.php:30
 * @route '/produk/{produk}'
 */
        showForm.head = (args: { produk: string | number } | [produk: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const produk = {
    show: Object.assign(show, show),
}

export default produk