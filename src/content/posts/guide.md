---
title: Deploy this pages
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
    - Generate a new repository from [this template](https://github.com/saicaca/fuwari/generate).
1. Run `npm install -g pnpm` to install [pnpm](https://pnpm.io) .
1. Run `pnpm install` to install dependencies.
1. Add `deploy.yml` file to `.github/workflows` folder.
    ```yml title=".github/workflows/deploy.yml" collapse={7-9, 12-17,19-27}
    name: Deploy to GitHub Pages
    on:
        push:
            branches: [ main ]
        workflow_dispatch:
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
1. Create `.nojekyll` empty file to the root folder.
1. Run `pnpm run format` and `pnpm run lint`
1. Commit and push.
---
> ### References
> - [Fuwari template](https://github.com/saicaca/fuwari)
> - [Install pnpm](https://pnpm.io/installation#using-npm)
> - [Deploy Astro with Github Pages](https://docs.astro.build/en/guides/deploy/github)