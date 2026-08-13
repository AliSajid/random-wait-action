---
title: Quickstart
description: Add Random Wait Action to a GitHub Actions workflow in a few minutes.
---

Add the action immediately before the operation you want to stagger:

```yaml title=".github/workflows/example.yaml"
name: Example

on:
    push:

permissions: read-all

jobs:
    call-api:
        runs-on: ubuntu-latest
        strategy:
            matrix:
                version: ['20', '22', '24']

        steps:
            - name: Check out repository
              uses: actions/checkout@v4

            - name: Add randomized jitter
              id: random-wait
              uses: AliSajid/random-wait-action@v3
              with:
                  minimum: 5
                  maximum: 30

            - name: Show selected delay
              run: echo "Waited ${{ steps.random-wait.outputs.wait_time }} seconds"

            - name: Call shared API
              run: ./call-api.sh
```

## What happens

Each matrix job starts normally, then independently selects a delay from 5 through 30 seconds. The `call-api.sh` steps therefore tend to reach the shared API at different times.

:::tip[Start conservatively]
For a small matrix, a 5–30 second interval is a reasonable first experiment. Choose the range based on the number of jobs, the shared service, and the time sensitivity of the workflow.
:::

## Use the defaults

Omit `with` to wait between 1 and 10 seconds:

```yaml
- name: Add randomized jitter
  uses: AliSajid/random-wait-action@v3
```

## Hardened workflows

Moving major-version tags such as `v3` are convenient and receive compatible updates. High-assurance workflows can instead pin the action to the full commit SHA associated with a specific release:

```yaml
- name: Add randomized jitter
  uses: AliSajid/random-wait-action@<full-commit-sha> # v3.x.x
  with:
      minimum: 5
      maximum: 30
```

Next, learn how to [choose a useful delay range](./choose-a-range/).
