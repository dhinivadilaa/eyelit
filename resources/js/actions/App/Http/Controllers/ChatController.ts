import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\ChatController::kirimPesan
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
export const kirimPesan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirimPesan.url(options),
    method: 'post',
})

kirimPesan.definition = {
    methods: ["post"],
    url: '/chat/kirim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::kirimPesan
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
kirimPesan.url = (options?: RouteQueryOptions) => {
    return kirimPesan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::kirimPesan
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
kirimPesan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirimPesan.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatController::kirimPesan
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
    const kirimPesanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: kirimPesan.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatController::kirimPesan
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chat/kirim'
 */
        kirimPesanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: kirimPesan.url(options),
            method: 'post',
        })
    
    kirimPesan.form = kirimPesanForm
/**
* @see \App\Http\Controllers\ChatController::bacaSemua
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
export const bacaSemua = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bacaSemua.url(options),
    method: 'post',
})

bacaSemua.definition = {
    methods: ["post"],
    url: '/chat/baca',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::bacaSemua
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
bacaSemua.url = (options?: RouteQueryOptions) => {
    return bacaSemua.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::bacaSemua
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
bacaSemua.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bacaSemua.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatController::bacaSemua
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
    const bacaSemuaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bacaSemua.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatController::bacaSemua
 * @see app/Http/Controllers/ChatController.php:109
 * @route '/chat/baca'
 */
        bacaSemuaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bacaSemua.url(options),
            method: 'post',
        })
    
    bacaSemua.form = bacaSemuaForm
/**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
export const halamanNotifikasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: halamanNotifikasi.url(options),
    method: 'get',
})

halamanNotifikasi.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
halamanNotifikasi.url = (options?: RouteQueryOptions) => {
    return halamanNotifikasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
halamanNotifikasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: halamanNotifikasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
halamanNotifikasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: halamanNotifikasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
    const halamanNotifikasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: halamanNotifikasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
        halamanNotifikasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: halamanNotifikasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::halamanNotifikasi
 * @see app/Http/Controllers/ChatController.php:126
 * @route '/notifications'
 */
        halamanNotifikasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: halamanNotifikasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    halamanNotifikasi.form = halamanNotifikasiForm
const ChatController = { index, kirimPesan, bacaSemua, halamanNotifikasi }

export default ChatController