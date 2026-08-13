---
title: Overview
description: What Random Wait Action does, why it exists, and when randomized jitter is useful.
---

Random Wait Action pauses a GitHub Actions job for a randomly selected number of seconds. Place it immediately before a step that should not be synchronized across parallel jobs.

```yaml
- name: Stagger shared-service requests
  uses: AliSajid/random-wait-action@v3
  with:
      minimum: 5
      maximum: 30
```

## Why it exists

The action began with a matrix of 12 jobs that updated the same GitHub Gist at nearly the same time. Later jobs began receiving HTTP 500 errors. Adding a small randomized delay spread the updates over a short interval and allowed the workflow to complete reliably.

This pattern is often called **jitter**: intentional variation that prevents otherwise independent clients from acting in lockstep.

## What the action guarantees

- It selects an integer between `minimum` and `maximum`, inclusive.
- It waits for the selected number of seconds.
- It exposes that value through the `wait_time` output.
- It performs no network requests.
- It requires no GitHub token or additional permissions.

Version 3 uses GitHub Actions' **Node 24** runtime.

## What it does not do

Random Wait Action does not coordinate jobs, inspect rate-limit headers, retry failed operations, or enforce a maximum number of concurrent jobs. Those are different problems with different tools.

See [Alternatives and trade-offs](../reference/alternatives/) before adding a delay to a complex workflow.
