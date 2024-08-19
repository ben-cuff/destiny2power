Use the following commands to run the dev server on https

scoop bucket add extras
scoop install mkcert

mkcert localhost

npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000


You also need to create your own .env.local 

This should look something like below

# To get these you must first go to https://www.bungie.net/en/Application and create a new app
# Name the website what ever you would like and the set the OAuth client type to confidential
# Set the redirect URL to https://localhost:3000/api/auth/callback/bungie and the origin header to *
# Also set the scope to be able to Read D2 info and move or equip gear.

BUNGIE_CLIENT_ID=""
BUNGIE_API_KEY=""
BUNGIE_CLIENT_SECRET=""

NEXTAUTH_URL=https://localhost:3000

# This can be generated using the command "openssl rand -base64 32"
NEXTAUTH_SECRET=""