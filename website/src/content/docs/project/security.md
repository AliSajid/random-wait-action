---
title: Security
description: Permissions, immutable pinning, and security assurance for Random Wait Action.
---

Random Wait Action requests no GitHub token permissions and makes no network requests. Its job is limited to validating inputs, choosing a delay, waiting, and exposing the selected value.

## Workflow permissions

Restrict workflow permissions explicitly whenever practical:

```yaml
permissions: read-all
```

The exact permissions should reflect the rest of your workflow; the random-wait step itself requires none.

## Immutable pinning

For high-assurance workflows, pin the action to a full commit SHA:

```yaml
- name: Add randomized jitter
  uses: AliSajid/random-wait-action@<full-commit-sha> # v3.x.x
  with:
      minimum: 5
      maximum: 30
```

A major-version tag such as `v3` is easier to maintain and receives compatible updates. A full SHA provides immutability but requires deliberate updates.

## Reporting a vulnerability

Follow the repository's [security policy](https://github.com/AliSajid/random-wait-action/security/policy) rather than opening a public issue for an undisclosed vulnerability.

The repository also documents its security assurance practices, including CodeQL analysis, dependency updates, OpenSSF Scorecard checks, and release controls.
