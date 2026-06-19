import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CheckoutController::post
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/checkout/langsung',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::post
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::post
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckoutController::post
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
    const postForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: post.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::post
 * @see app/Http/Controllers/CheckoutController.php:28
 * @route '/checkout/langsung'
 */
        postForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: post.url(options),
            method: 'post',
        })
    
    post.form = postForm