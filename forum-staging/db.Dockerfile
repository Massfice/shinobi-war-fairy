FROM docker.io/bitnami/mariadb:10.3-debian-10

USER root

RUN chmod -R 777 /bitnami/mariadb/data

EXPOSE 3036
