# ADN TEST

## Description

Crud example with API Rest Laravel and React Client



### Executing program

* clone the proyect
* and execute the next commands

```
cd test-ad
```
### Env Variables

* copy a .env.example to .env and edit DB Env
```
cp env.example .env
```

```
DB_HOST=db
DB_PASSWORD=prueba123
```
### Run docker-compose

```
docker-compose up -d
```

### Execute migration proyect

```
docker-compose exec app php artisan migrate
```
### Up server artisan for backend

```
docker-compose exec -d app php artisan serve --host=0.0.0.0 --port=8080
```
### Visit app on browser

[http://localhost:80](http://localhost:80)

### License

The MIT License
