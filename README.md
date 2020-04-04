# Adonis fullstack CMS

This is a fullstack boilerplate for a CMS with a blog and portfolio / gallery based on AdonisJS, it comes pre-configured with:

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Project uses Node v12.12.0 and Adonis v4.1

Clone the repo and run `npm install`.

Set up the following environmental variables, as in the example:

```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=app-key
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=user
DB_PASSWORD=
DB_DATABASE=database
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```



### Migrations

Run the following command to run startup migrations.

```bash
adonis migration:run
```


### Sample User

Run the following command in order to create first sample user and log in to admin panel, with these credentials:
name: `name`, password: `admin`, email: `email@email.com`.

```bash
adonis seed
```

### Run locally in dev mode

In order to run the webpack watcher and adonis server use 
```bash
npm run dev
```
