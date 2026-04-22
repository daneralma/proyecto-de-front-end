<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Usamos el asterisco para asegurar que conecte desde cualquier lado mientras pruebas
    'allowed_origins' => ['*'], 

    'allowed_methods' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // IMPORTANTE: Debe ser false si usas el comodín '*' arriba
    'supports_credentials' => false,
];