# Swagger UI Light

An alternative ui for swagger 2.0

## Why?

This version supports some custom swagger documentation.
It is still valid swagger 2.0 configurations.

The primary custom fields are
```json
{
  "x-auth-required" : "true",
  "x-auth-scope" : "admin"
}
```
## Docker

The included [Dockerfile](./Dockerfile) serves the precompile ui via nginx.
Swagger UI Light requests `/api/swagger` which does not exist in the container.

This docker image is meant to be proxied to from another container that does have `/api/swagger`, for example:

_in another nginx container_
```
    location /api/docs {
        #...
        proxy_pass http://swagger_ui_light/;
    }

    location /api/swagger {
        #...
        proxy_pass http://swagger/;
    }
```
