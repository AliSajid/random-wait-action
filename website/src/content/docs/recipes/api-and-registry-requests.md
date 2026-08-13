---
title: API and registry requests
description: Reduce synchronized requests to APIs, package registries, badge services, and test infrastructure.
sidebar:
    order: 2
---

Randomized jitter is useful when several jobs independently contact the same external system and the problem is the shape of the burst rather than the total request count.

Common examples include:

- GitHub API or Gist updates from matrix jobs
- package-registry metadata requests
- badge-generation services such as Shields.io
- shared integration-test infrastructure
- artifact-index or cache metadata updates

```yaml
- name: Wait before registry request
  uses: AliSajid/random-wait-action@v3
  with:
      minimum: 10
      maximum: 45

- name: Query registry
  run: ./scripts/query-registry.sh
```

:::caution
Jitter does not increase a provider's quota. If the workflow exceeds a documented request limit, reduce the request volume or implement provider-aware throttling.
:::
