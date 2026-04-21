<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Juntamos todas las URLs permitidas en una sola lista
    'allowed_origins' => [
        'https://proyecto-de-front-end.onrender.com', // Tu sitio en internet
        'http://localhost:3000',                     // Tu PC (desarrollo)
        'http://localhost:3001',
        'http://localhost:3003',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];