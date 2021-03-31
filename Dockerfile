FROM composer as vendor
WORKDIR /app
COPY composer.json composer.json
COPY database/ database/
RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist
COPY . .
RUN composer dump-autoload

FROM php:7.3-fpm
WORKDIR /var/www
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libfreetype6-dev libjpeg-dev libpng-dev libwebp-dev zlib1g-dev libzip-dev vim curl zip unzip \
    && docker-php-ext-install pdo_mysql mbstring \
    && docker-php-ext-install pdo \
    && docker-php-ext-enable opcache \
    && apt-get autoclean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/pear/
COPY --from=vendor /app/vendor/ ./vendor/
COPY . .
RUN php artisan config:cache
RUN php artisan route:cache
EXPOSE 8080