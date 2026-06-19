import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\RegisterController::register
 * @see app/Http/Controllers/Auth/RegisterController.php:21
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProdukController::home
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
export const katalog = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: katalog.url(options),
    method: 'get',
})

katalog.definition = {
    methods: ["get","head"],
    url: '/katalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
katalog.url = (options?: RouteQueryOptions) => {
    return katalog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
katalog.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: katalog.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
katalog.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: katalog.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
    const katalogForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: katalog.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
        katalogForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: katalog.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProdukController::katalog
 * @see app/Http/Controllers/ProdukController.php:17
 * @route '/katalog'
 */
        katalogForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: katalog.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    katalog.form = katalogForm
/**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
export const keranjang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keranjang.url(options),
    method: 'get',
})

keranjang.definition = {
    methods: ["get","head"],
    url: '/keranjang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
keranjang.url = (options?: RouteQueryOptions) => {
    return keranjang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
keranjang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keranjang.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
keranjang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: keranjang.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
    const keranjangForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: keranjang.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
        keranjangForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keranjang.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KeranjangController::keranjang
 * @see app/Http/Controllers/KeranjangController.php:13
 * @route '/keranjang'
 */
        keranjangForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keranjang.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    keranjang.form = keranjangForm
/**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
checkout.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
checkout.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkout.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
        checkoutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckoutController::checkout
 * @see app/Http/Controllers/CheckoutController.php:137
 * @route '/checkout'
 */
        checkoutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkout.form = checkoutForm
/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm