---
title: Google Kubernetes Engine quick start
published: 2025-09-09
description: How I setup Google Kubernetes Engine
tags: [Google Cloud, GKE]
category: Guides
draft: false
language: en
---
## Prerequisites
- [Google Cloud Account](https://cloud.google.com/?hl=en)
- [Docker Fundamentals](https://docs.docker.com/compose/install)
- [Kubernetes Fundamentals](https://kubernetes.io)
- [Setup Cloud Shell]()
---
## Steps
1. Set a default compute zone
    - Set the default compute region
        ```bash "REGION"
        gcloud config set compute/region "REGION"
        ```
    - Set the default compute zone
        ```bash "ZONE"
        gcloud config set compute/zone "ZONE"
        ```
        :::note
        - `REGION`: [available region](https://cloud.google.com/compute/docs/regions-zones/#available). Ex: `us-central1`.
        - `ZONE`: [available zone](https://cloud.google.com/compute/docs/regions-zones/#available). Ex: `us-central1-a` is a zone in the `us-central1` region.
        :::
1. Create a GKE cluster
    - Create a cluster
        ```bash /(machine-type)(?!.*machine-type.*)/ "cluster-name"
        gcloud container clusters create --machine-type=machine-type --zone=ZONE cluster-name
        ```
        :::note
        - `machine-type`: [available machine type](https://cloud.google.com/compute/docs/general-purpose-machines#e2_machine_types). Ex: `e2-medium`.
        - `cluster-name`: cluster name.
        :::
1. Get authentication credentials for the cluster
    - Authenticate with the cluster
        ```bash "cluster-name"
        gcloud container clusters get-credentials cluster-name
        ```
1. Deploy an application to the cluster
    1. Create new deployment from a image
        ```bash "deployment-name" "image-name" "image-tag"
        kubectl create deployment deployment-name --image=image-name:image-tag
        ```
        :::note
        - `deployment-name`: deployment name.
        - `image-name`: image name. Ex: `gcr.io/google-samples/hello-app`.
        - `image-tag`: image tag. Ex: `1.0`.
        :::
    1. Expose application
        ```bash "deployment-name" "your-port"
        kubectl expose deployment deployment-name --type=LoadBalancer --port your-port
        ```
        :::note
        - `your-port`: exposed port. Ex: `8080`
        :::
    1. Inspect service
        ```bash
        kubectl get service
        ```
1. Delete the cluster
    1. Run following command
    ```bash "cluster-name"
    gcloud container clusters delete cluster-name
    ```
    2. Type `Y` and **Enter** to confirm
---
> ### References
> - [Google Cloud Skills Boost](https://www.cloudskillsboost.google)