# tipjar

## Run backend
```shell
$ cd functions
$ yarn
$ yarn serve
```

## Run web
```shell
$ cd web
$ yarn
$ yarn start
```

## Deploy
Use the `deploy.sh` script in the `scripts/` folder to install dependencies, build and deploy to firebase. 
It takes deploy mode as an argument, which can be one of `functions`, `hosting` or `all` (default).

```shell
$ scripts/deploy.sh functions # to deploy only functions
```