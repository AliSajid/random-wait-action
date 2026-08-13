---
title: Choose a delay range
description: Select minimum and maximum waits that fit your matrix and shared service.
---

There is no universally correct delay range. The goal is to spread a synchronized burst without adding more latency than the workflow can tolerate.

## A practical starting point

| Parallel jobs | Suggested first experiment |
| ------------: | :------------------------- |
|           2–4 | 1–10 seconds               |
|          5–12 | 5–30 seconds               |
|         13–30 | 10–60 seconds              |

These are starting points, not guarantees. Observe the target service and adjust.

## Set both bounds

For production workflows, specify both values so that the behavior is obvious during review:

```yaml
with:
    minimum: 5
    maximum: 30
```

A non-zero minimum is useful when every job would otherwise begin the sensitive operation immediately. A wider interval creates more separation but increases the longest possible wait.

## Think about the real bottleneck

Before widening the interval, ask:

1. Is the failure caused by simultaneous requests or by exceeding a total quota?
2. Does the provider return retry or rate-limit headers you should honor?
3. Would a concurrency group better express the desired behavior?
4. Is the target operation safe to run concurrently at all?

When requests must be serialized, use concurrency controls rather than increasingly long random waits.
