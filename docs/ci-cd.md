# CI & CD design

- [CI & CD design](#ci--cd-design)
    - [Overview](#overview)
        - [Staging Environment](#staging-environment)
        - [Production Environment](#production-environment)

## Overview

Please note: this document is a **WORK IN PROGRESS**.

### Staging Environment

All pushed branches/PRs will trigger the following workflow:

```mermaid
graph TB
    checkout(checkout branch)
    dev(install & build dev dependencies)
    lint(lint & prettier)
    test{run tests}
    build-images(build images: `api`, `web`)
    prod(install production dependencies)
    deploy-staging(push `web` & `api` images to registry)
    hold{verify staging deployments are correct}

    subgraph build-test-deploy-to-staging
    checkout --> dev
    dev --> lint
    lint --> prod
    prod --> test
    test --> build-images
    build-images --> deploy-staging
    deploy-staging --> hold
    end
```

### Production Environment

The following workflow is triggered when pull requests are merged into `master`:

```mermaid
graph TB
    hold{verify staging deployments are correct}
    merge-to-master(merge PR branch into `master`)
    deploy-master(deploy to `now` using bash scripts)

    subgraph release-and-deploy-to-prod
    hold --> merge-to-master
    merge-to-master --> deploy-master
    end
```
