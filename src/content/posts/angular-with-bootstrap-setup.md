---
title: Angular with Bootstrap setup
published: 2025-07-09
description: How I create Angular project with Bootstrap
tags: [Angular, Bootstrap]
category: Guides
draft: false
language: en
---
## Prerequisites
- [Node.js](https://nodejs.org/en)
- Node.js package manager (npm, yarn, pnpm)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Angular CLI](https://angular.dev/installation#install-angular-cli)
---
## Steps
1. Go to the folder you want to create and run command
    ```bash "project-name"
    ng new project-name
    ```
    :::note
    Change `project-name` with your project name
    :::
1. Select configurations
1. Run command
    ```bash "project-name"
    cd project-name & code .
    ```
1. Open terminal (`Ctrl + J` - Visual Studio Code shortcut) and install `bootstrap`
    ```bash
    ng add @ng-bootstrap/ng-bootstrap
    ```
1. Install `popper.js`
    ```bash
    npm i @popperjs/core
    ```
1. Update config in `angular.json`
    ```json "node_modules/@popperjs/core/dist/umd/popper.min.js" "node_modules/bootstrap/dist/js/bootstrap.bundle.js" "project-name"
    {
        // ...
        "projects": {
            "project-name": {
                //...
                "architect": {
                    // ...
                    "options": {
                        "scripts": [
                            "node_modules/@popperjs/core/dist/umd/popper.min.js",
                            "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
                        ]
                    },
                }
            }
        }
    }
    ```
1. Start the project
    ```bash
    npm start
    ```
---
> ### References
> - [Angular Bootstrap](https://ng-bootstrap.github.io/#/getting-started)
> - [Popper.js package](https://www.npmjs.com/package/@popperjs/core)