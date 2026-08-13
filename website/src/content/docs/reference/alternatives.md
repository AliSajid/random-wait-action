---
title: Alternatives and trade-offs
description: Decide whether randomized jitter, concurrency, retries, or a shell command best fits your workflow.
---

Random Wait Action is intentionally narrow. Use the tool that expresses the real constraint.

## Random Wait Action

Use it when jobs may continue to run in parallel, but should not begin one sensitive operation at the same instant.

**Good fit:** synchronized request bursts, modest staggering, reusable cross-workflow behavior.

## GitHub Actions concurrency

Use concurrency when only one job or workflow in a group should run at a time, or when newer work should cancel older work.

**Good fit:** deployments to a single environment, exclusive updates, strict serialization.

## Retry with exponential backoff

Use retries when an operation has already failed or a provider explicitly asks the client to try again later.

**Good fit:** transient network failures, HTTP 429 or 5xx responses, provider-directed retry behavior.

## Provider-specific rate limiting

Honor rate-limit headers, quotas, and official client guidance whenever available.

**Good fit:** known quotas, reset windows, token buckets, or API-specific request budgets.

## Shell-based random sleep

A shell command can be enough for a single Unix-only workflow:

```bash
sleep "$((1 + RANDOM % 10))"
```

The action is useful when you prefer declarative inputs, consistent validation, an explicit output, and the same behavior across workflows and runner operating systems.
