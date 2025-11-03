# Backend

## Databank
Since I am just using the databank created by Django and ignore it in the .gitignore, the databank
is reset every time the repository is cloned. That means it also resets when the server is
deployed.

## Allowed Hosts
Allowed hosts for the backend are localhost and my own domain right now. This can be changed for 
custom use/testing in ./todoBackend/settings.py under the ALLOWED_HOSTS variable.

## Allowed Origins
Allowed origins for CORS requests are localhost and my github page. This can be changed for custom
use/testing in ./todoBackend/settings.py under the CORS_ALLOWED_ORIGINS variable.
