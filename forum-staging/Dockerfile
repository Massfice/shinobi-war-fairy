FROM docker.io/bitnami/phpbb:3-debian-10

COPY phpbb3.0.12.zip ./

COPY php.ini /opt/bitnami/php/etc/php.ini

USER root

RUN install_packages unzip

RUN unzip phpbb3.0.12.zip

RUN rm -R /opt/bitnami/phpbb

RUN  cp -r ./phpbb3.0.12/. ./opt/bitnami/phpbb

EXPOSE 8080

RUN chmod -R 777 ./opt/bitnami/phpbb

ENTRYPOINT []
CMD [ "/opt/bitnami/scripts/apache/run.sh" ]