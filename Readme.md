# Readme

## How to launch in production

SSH into server:

```
ssh root@45.56.82.141
```

Pull Repo

```
git pull
```

Update dependencies

```
npm install
```

Restart pm2 (the app's name is 'www' since the script to run is "bin/www")

```
pm2 restart www
```


## How to run dev server

```
DEBUG='myapp:*'; npm start
```