import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
const index980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

index980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
index980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return index980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
index980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
index980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
    const index980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
        index980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
        index980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index980bb49ee7ae63891f1d891d2fbcf1c9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index980bb49ee7ae63891f1d891d2fbcf1c9.form = index980bb49ee7ae63891f1d891d2fbcf1c9Form
    /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
const index8518848bf04c708efcd68fe5f70147c4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8518848bf04c708efcd68fe5f70147c4.url(options),
    method: 'get',
})

index8518848bf04c708efcd68fe5f70147c4.definition = {
    methods: ["get","head"],
    url: '/katalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
index8518848bf04c708efcd68fe5f70147c4.url = (options?: RouteQueryOptions) => {
    return index8518848bf04c708efcd68fe5f70147c4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
index8518848bf04c708efcd68fe5f70147c4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8518848bf04c708efcd68fe5f70147c4.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
index8518848bf04c708efcd68fe5f70147c4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8518848bf04c708efcd68fe5f70147c4.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
    const index8518848bf04c708efcd68fe5f70147c4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index8518848bf04c708efcd68fe5f70147c4.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
        index8518848bf04c708efcd68fe5f70147c4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8518848bf04c708efcd68fe5f70147c4.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProdukController::index
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
        index8518848bf04c708efcd68fe5f70147c4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8518848bf04c708efcd68fe5f70147c4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index8518848bf04c708efcd68fe5f70147c4.form = index8518848bf04c708efcd68fe5f70147c4Form

export const index = {
    '/': index980bb49ee7ae63891f1d891d2fbcf1c9,
    '/katalog': index8518848bf04c708efcd68fe5f70147c4,
}

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
const ProdukController = { index, show }

export default ProdukController