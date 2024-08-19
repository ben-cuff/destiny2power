# Starting development
## HTTPS
Due to the bungie API requiring HTTPS in order to authenticate you must run your dev server with

next dev --experimental-https

## Environment Variables
You also need to create your own .env.local in the root directory 

To get these you must first go to https://www.bungie.net/en/Application and create a new app  
Name the website what ever you would like and the set the OAuth client type to confidential  
Set the redirect URL to https://localhost:3000/api/auth/callback/bungie and the origin header to *  
Also set the scope to be able to Read D2 info and move or equip gear  
Once all of the above is done you should be able to make your .env.local like below  

This should look something like below
```txt
BUNGIE_CLIENT_ID=""
BUNGIE_API_KEY=""
BUNGIE_CLIENT_SECRET=""

NEXTAUTH_URL=https://localhost:3000

# This can be generated using the command "openssl rand -base64 32"
NEXTAUTH_SECRET=""
```

# License

[MIT](https://choosealicense.com/licenses/mit/)