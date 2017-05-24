FROM nginx:stable-alpine

MAINTAINER Jon Borgonia "jon@gomagames.com"

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY public /usr/share/nginx/html

VOLUME ["/var/cache/nginx"]

EXPOSE 80
