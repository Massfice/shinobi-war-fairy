FROM php:5.6-apache

COPY phpBB-3.0.12.zip ./

COPY php.ini /usr/local/etc/php/php.ini

USER root

RUN apt-get update

RUN apt-get install unzip

RUN unzip phpBB-3.0.12.zip

RUN  cp -r ./phpBB3/. /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN chmod -R 777 /var/www/html

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

EXPOSE 80
