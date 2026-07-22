---
title: Stagger matrix jobs
description: Spread a matrix of GitHub Actions jobs before they contact a shared service.
sidebar:
    order: 1
---

Matrix jobs often begin within a narrow window. Insert the delay immediately before the shared-service call—not necessarily at the beginning of the job.

```yaml
jobs:
    test:
        strategy:
            matrix:
                os: [ubuntu-latest, macos-latest, windows-latest]
                channel: [stable, beta, nightly]

        runs-on: ${{ matrix.os }}

        steps:
            - uses: actions/checkout@v4

            - name: Build and test
              run: ./ci/test.sh

            - name: Stagger status updates
              uses: AliSajid/random-wait-action@v3
              with:
                  minimum: 5
                  maximum: 30

            - name: Update shared status
              run: ./ci/update-status.sh
```

Placing the wait late in the job avoids delaying unrelated local work.
