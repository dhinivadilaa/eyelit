import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/laporan/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
    const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
        downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::download
 * @see app/Http/Controllers/DashboardController.php:241
 * @route '/admin/laporan/download'
 */
        downloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const laporan = {
    download: Object.assign(download, download),
}

export default laporan