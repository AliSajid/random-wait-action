---
title: Inputs and output
description: Complete input and output reference for Random Wait Action v3.
---

## Inputs

| Input     | Type    | Default | Required | Description                       |
| :-------- | :------ | ------: | :------: | :-------------------------------- |
| `minimum` | integer |     `1` |    No    | Minimum number of seconds to wait |
| `maximum` | integer |    `10` |    No    | Maximum number of seconds to wait |

The selected interval is inclusive. With `minimum: 5` and `maximum: 10`, the action can select 5, 6, 7, 8, 9, or 10 seconds.

You may provide only one bound:

```yaml
# Uses maximum: 10
with:
    minimum: 5
```

```yaml
# Uses minimum: 1
with:
    maximum: 30
```

For readability, production workflows should normally state both values.

## Output

| Output      | Type    | Description                                  |
| :---------- | :------ | :------------------------------------------- |
| `wait_time` | integer | Actual number of seconds selected and waited |

Reference the output through a step ID:

```yaml
- name: Add randomized jitter
  id: random-wait
  uses: AliSajid/random-wait-action@v3

- name: Read selected delay
  run: echo "${{ steps.random-wait.outputs.wait_time }}"
```
