---
title: Introduce timing variation
description: Exercise workflows that should tolerate different completion orders.
sidebar:
    order: 4
---

Timing variation can expose assumptions about the order in which independent jobs complete.

```yaml
- name: Add timing variation
  uses: AliSajid/random-wait-action@v3
  with:
      minimum: 1
      maximum: 15

- name: Run order-independent integration step
  run: ./integration-step.sh
```

Treat this as a testing aid, not as a complete race-condition testing strategy. Random delays can reveal ordering assumptions, but they cannot prove that a concurrent system is correct.
