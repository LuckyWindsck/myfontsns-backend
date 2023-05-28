# myfontsns-backend

The backend server repository of [namosuke/MyFontSNS](https://github.com/namosuke/MyFontSNS).

## Development
```shell
$ yarn # Install dependencies
$ cp .env.template .env # Copy env template AND PLEASE FILL IN .ENV
$ docker-compose up # Setup development database
$ yarn dev # Start develepment environment
```

## Helper commands
A REPL that connect with database. Like `php artisan tinker` in Laravel or `rails console` in Ruby on Rails
```shell
$ yarn console:db
```

## Production
```shell
$ yarn # Install dependencies
$ yarn build ## Compile TypeScript, build migrations, and build seeders
```

## Deploy Script
```shell
$ ./scripts/init-heroku-db.sh
```
