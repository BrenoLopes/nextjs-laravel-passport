# How to use nextauth v4 with laravel passport oauth implementation

1. Install laravel (This command is going to install laravel sail so adapt for what you'll be using)
```bash
curl -s https://laravel.build/example-app | bash
cd ./example-app
```

2. Install laravel breeze
```bash
composer require laravel/breeze --dev
```

3. Install laravel breeze classes and choose the laravel blade stack
```bash
php artisan breeze:install
 
php artisan migrate
npm install
npm run dev
```

4. Install laravel passport and insert the trait inside the User

```bash
php artisan install:api --passport
```

```php
<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
 
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

5. Create an Oauth client and put nextauth callback url ``` http://localhost:3000/api/auth/callback/passport ``` 
    ** if you don't want to use the passport id, then switch passport at the end of the url for your id at step 7

    ** if you're going to serve nextjs from another domain or port, then adapt the url for your needs. 
```bash
php artisan passport:client
```

6. Create an environment file based on .env.local.example with the name .env.local, grab the clientId and
clientSecret and save the ids into the `AUTH_PASSPORT_ID` and `AUTH_PASSPORT_SECRET` environment variables.

7. Open the configuration file at `app/api/auth/[...nextauth]/route.ts` and make make the changes needed for your
needs if you served laravel at another location or you want to change the provider id.