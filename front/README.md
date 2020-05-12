# ProjetAngularApp

This project was generated with [Angular CLI] (https://github.com/angular/angular-cli) version 8.3.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build Docker Image
docker build -t pe_icc:front .

## Run container on localhost:4201
docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm pe_icc:front

## Use continue integration 
docker run -d --name docker_pe -p 80:4200 --rm fenestio/pe_icc_front:latest

## Update container when new image on repository
docker run -d --name watchtower -v /home/<USER>/.docker/config.json:/config.json -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower docker_pe --debug --cleanup -i 300
