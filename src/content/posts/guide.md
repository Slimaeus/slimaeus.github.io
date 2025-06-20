---
title: How can I deploy this pages?
published: 2025-06-19
description: How to use this blog template
tags: [Blog]
category: Guides
draft: false
language: en
---
:::note
I already have [npm](https://nodejs.org/en/download) installed on my machine and have set up [GitHub Pages](https://docs.github.com/en/pages/quickstart).
:::
1. Create blog repository:
    - [Generate a new repository](https://github.com/saicaca/fuwari/generate) from [this template](https://github.com/saicaca/fuwari).
1. I install [pnpm](https://pnpm.io) with this command `npm install -g pnpm`
1. I run `pnpm install` to install dependencies.

1. I add `deploy.yml` file to `.github/workflows` folder.
    ```yml title=".github/workflows/deploy.yml"
    name: Deploy to GitHub Pages

    on:
    # Trigger the workflow every time you push to the `main` branch
    # Using a different branch name? Replace `main` with your branch’s name
    push:
        branches: [ main ]
    # Allows you to run this workflow manually from the Actions tab on GitHub.
    workflow_dispatch:

    # Allow this job to clone the repo and create a page deployment
    permissions:
    contents: read
    pages: write
    id-token: write

    jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout your repository using git
            uses: actions/checkout@v4
        - name: Install, build, and upload your site
            uses: withastro/action@v3
            # with:
            # path: . # The root location of your Astro project inside the repository. (optional)
            # node-version: 20 # The specific version of Node that should be used to build your site. Defaults to 20. (optional)
            # package-manager: pnpm@latest # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)

    deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
        steps:
        - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```
1. Edit the config file `src/config.ts`.
    ```ts title="src/config.ts" {2-3}
    export const siteConfig: SiteConfig = {
        title: "Slimaeus",
        subtitle: "My profile",
        //...
    }
    ```
1. Edit the file `astro.config.ts`.
    ```ts title="astro.config.ts" {2-2}
    export default defineConfig({
	    site: "https://slimaeus.github.io/",
        //...
    })
    ```
1. I create `.nojekyll` empty file to the root folder.
1. I commit and push.
> ### References
> - [Fuwari template](https://github.com/saicaca/fuwari)
> - [Install pnpm](https://pnpm.io/installation#using-npm)
> - [Deploy Astro with Github Pages](https://docs.astro.build/en/guides/deploy/github)