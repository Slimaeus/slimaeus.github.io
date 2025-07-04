---
title: Install n8n
published: 2025-07-04
description: How I install n8n with Docker Compose
tags: [n8n]
category: Guides
draft: false
language: en
---
## Prerequisites
- [Docker](https://docs.docker.com/engine/install)
- [Docker Compose](https://docs.docker.com/compose/install)
---

## Steps
1. Prepare docker-compose.yml
    - Start with db
    ```yml title="docker-compose.yml"
    services:
    n8n:
        image: docker.n8n.io/n8nio/n8n
        container_name: n8n
        restart: always # Added to ensure n8n restarts if it crashes
        ports:
        - "5678:5678"
        environment:
        - DB_TYPE=postgresdb
        - DB_POSTGRESDB_DATABASE=n8n_database
        - DB_POSTGRESDB_HOST=postgres # Hostname of the postgres service
        - DB_POSTGRESDB_PORT=5432
        - DB_POSTGRESDB_USER=n8n_user # Changed to a specific user for n8n
        - DB_POSTGRESDB_PASSWORD=<Your Database Password> # Use a strong password!
        # If you're using a self-signed SSL certificate for your Postgres, uncomment and set the following:
        # - NODE_TLS_REJECT_UNAUTHORIZED=0
        volumes:
        - n8n_data:/home/node/.n8n
        depends_on:
        - postgres # n8n depends on postgres being up
        networks:
        - n8n_network # Assign to a custom network

    postgres:
        image: postgres
        container_name: n8n_postgres
        restart: always
        environment:
        POSTGRES_DB: n8n_database
        POSTGRES_USER: n8n_user # Should match DB_POSTGRESDB_USER in n8n service
        POSTGRES_PASSWORD: <Your Database Password> # Should match DB_POSTGRESDB_PASSWORD in n8n service
        PGDATA: /var/lib/postgresql/data/pgdata # Optional: Specify a sub-directory for data
        volumes:
        - postgres_data:/var/lib/postgresql/data # Persist PostgreSQL data
        networks:
        - n8n_network # Assign to the same custom network as n8n

    volumes:
    n8n_data:
    postgres_data: # Define the volume for PostgreSQL data

    networks:
    n8n_network: # Define a custom bridge network
        driver: bridge
    ```
    - Start without database (already have one)
    ```yml title="docker-compose.yml"
    services:
    n8n:
        image: docker.n8n.io/n8nio/n8n
        container_name: n8n
        ports:
        - "5678:5678"
        environment:
        - DB_TYPE=postgresdb
        - DB_POSTGRESDB_DATABASE=n8n_database
        - DB_POSTGRESDB_HOST=localhost
        - DB_POSTGRESDB_PORT=5432
        - DB_POSTGRESDB_USER=postgres
        - DB_POSTGRESDB_PASSWORD=<Your Database Password>
        # If you're using a self-signed SSL certificate for your Postgres, uncomment and set the following:
        # - NODE_TLS_REJECT_UNAUTHORIZED=0
        volumes:
        - n8n_data:/home/node/.n8n
        network_mode: host

    volumes:
    n8n_data:
        # You can specify a driver here if needed, e.g., for network storage:
        # driver: local
    ```
1. Start services
    ```bash
    docker compose up -d
    ```

:::caution
You shouldn't put secrets in the file, as I did. It's just for example.
:::
---
> ### References
> - [Official n8n Guide](https://docs.n8n.io/hosting/installation/server-setups/docker-compose/#1-install-docker-and-docker-compose)