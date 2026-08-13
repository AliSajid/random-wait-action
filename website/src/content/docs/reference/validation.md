---
title: Validation and behavior
description: Understand accepted values, error handling, and runtime behavior.
---

The action validates all inputs before waiting.

## Rules

- Both values must be integers.
- Both values must be non-negative.
- `minimum` cannot exceed `maximum`.
- Both values cannot be zero simultaneously.
- `maximum` cannot exceed **120 seconds**.

Invalid input fails the action step with a descriptive error.

## Runtime behavior

Random Wait Action v3 runs on the GitHub Actions **Node 24** runtime. It selects one integer in the configured interval, waits for that duration, and writes the selected value to `wait_time`.

The action does not:

- call GitHub or any external API;
- read repository contents;
- require a token;
- alter subsequent steps beyond delaying their start.
