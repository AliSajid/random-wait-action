---
title: Migrate from v2 to v3
description: Upgrade Random Wait Action from the Node 20-based v2 release to the Node 24-based v3 release.
---

Version 3 updates the JavaScript action runtime from Node 20 to Node 24. Inputs, output, defaults, and waiting behavior are unchanged.

## Standard migration

```diff
- uses: AliSajid/random-wait-action@v2
+ uses: AliSajid/random-wait-action@v3
```

No other workflow changes are required.

## Self-hosted runners

GitHub-hosted runners support the Node 24 action runtime. Self-hosted users should confirm that their runner software and operating system support Node 24.

- Node 24 is incompatible with macOS 13.4 and earlier.
- Node 24 does not officially support ARM32 self-hosted runners.

Users who cannot update their self-hosted environment may remain on v2, which is maintenance-only.

## Immutable pins

When a workflow pins a full v2 commit SHA, replace it with the full SHA associated with the desired v3 release. Do not replace an immutable pin with the moving `v3` tag unless that matches your security policy.
