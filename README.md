Use the following commands to run the dev server on https

scoop bucket add extras
scoop install mkcert

mkcert localhost

npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000
