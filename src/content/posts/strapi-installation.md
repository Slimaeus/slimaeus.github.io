---
title: Install Strapi
published: 2025-07-03
description: How I install Strapi
tags: [strapi, headless-cms]
category: Guides
draft: false
language: en
---
## Prerequisites
- [Node.js](https://nodejs.org/en)
- Node.js package manager (npm, yarn, pnpm)
- [Visual Studio Code](https://code.visualstudio.com/download)
---

## Steps
1. Open the terminal in the folder you want to create new project
1. Initialize `Strapi` project by run this command  
    ```bash "my-strapi-project"
    npx create-strapi@latest my-strapi-project
    ```
    :::note
    Change `my-strapi-project` to your project name
    :::
1. You can select `Login/Sign up` to try the `Growth` plan of `Strapi` or skip it
1. You can press `Enter` to accept default answers
![Default answers](https://docs.strapi.io/assets/images/qsg-questions-answers-terminal-c55811739139a388f378b5d0ddfec035.png)
1. Run this command to access the project and open with Visual Code
    ```bash "my-strapi-project"
    cd my-strapi-project & code .
    ```
1. Run this command to start the project and your browser automatically opens a new tab.
    ```bash "npm"
    npm run dev
    ```
    :::note
    Change `npm` to your Node.js package manager command
    :::
1. You need to create your account and now you can access to the admin panel. 
---
> ### References
> - [Strapi Quick Start Guide](https://docs.strapi.io/cms/quick-start)