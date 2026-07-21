<!--
SPDX-FileCopyrightText: Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Migrating from v2 to v3

Random Wait Action v3 updates the JavaScript action runtime from Node 20 to
Node 24. The action inputs, outputs, and waiting behavior are unchanged.

## Standard migration

Change the major-version reference in your workflow:

```diff
- uses: AliSajid/random-wait-action@v2
+ uses: AliSajid/random-wait-action@v3
```

No input or output changes are required.

## Compatibility notes

GitHub-hosted runners support the Node 24 action runtime. Self-hosted runner
users should confirm that their runner software and operating system support
Node 24. Node 24 is incompatible with macOS 13.4 and earlier and does not
officially support ARM32.
Users who cannot yet update their self-hosted environment may remain on `v2`,
which is maintenance-only.

## Immutable pinning

If your workflow pins a commit SHA, replace the v2 SHA with the full commit
SHA associated with the desired v3 release. Do not replace an immutable SHA
with the moving `v3` tag unless that matches your security policy.
