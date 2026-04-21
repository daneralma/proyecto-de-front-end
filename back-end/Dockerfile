FROM php:8.3-fpm

# Instalar dependencias del sistema y soporte para PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev  # <--- CRÍTICO para Render

# Instalar extensiones de PHP (Agregamos pdo_pgsql)
RUN docker-php-ext-install pdo pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar directorio de trabajo
WORKDIR /var/www

# Copiar archivos del proyecto
COPY . .

# DAR PERMISOS (Vital para evitar el Error 500)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Render asigna el puerto automáticamente
EXPOSE 8000

# Comando para iniciar Laravel ejecutando migraciones antes
CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port $PORT