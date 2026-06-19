import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:17
 * @route '/chat'
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
* @see \App\Http\Controllers\ChatController::kirim
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
export const kirim = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirim.url(options),
    method: 'post',
})

kirim.definition = {
    methods: ["post"],
    url: '/chat/kirim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::kirim
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
kirim.url = (options?: RouteQueryOptions) => {
    return kirim.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::kirim
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
kirim.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirim.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatController::kirim
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
    const kirimForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: kirim.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatController::kirim
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
        kirimForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: kirim.url(options),
            method: 'post',
        })
    
    kirim.form = kirimForm
/**
* @see \App\Http\Controllers\ChatController::baca
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
export const baca = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: baca.url(options),
    method: 'post',
})

baca.definition = {
    methods: ["post"],
    url: '/chat/baca',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::baca
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
baca.url = (options?: RouteQueryOptions) => {
    return baca.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::baca
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
baca.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: baca.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatController::baca
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
    const bacaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: baca.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatController::baca
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
        bacaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: baca.url(options),
            method: 'post',
        })
    
    baca.form = bacaForm
const chat = {
    index: Object.assign(index, index),
kirim: Object.assign(kirim, kirim),
baca: Object.assign(baca, baca),
}

export default chat