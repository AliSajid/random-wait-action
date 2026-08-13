---
title: Spread deployment requests
description: Add jitter before parallel deployment or provisioning requests.
sidebar:
    order: 3
---

Parallel deployments can create brief contention against a control plane, deployment API, or shared target. A randomized delay can spread the initial requests while allowing the jobs themselves to remain parallel.

```yaml
- name: Stagger deployment request
  uses: AliSajid/random-wait-action@v3
  with:
      minimum: 3
      maximum: 20

- name: Deploy
  run: ./deploy.sh "${{ matrix.target }}"
```

Use this only when concurrent deployments are valid. When a resource must be updated by one job at a time, use a GitHub Actions concurrency group or a provider-native lock.
