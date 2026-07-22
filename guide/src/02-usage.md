# Usage

[Random Wait Action](https://github.com/marketplace/actions/random-wait-action) can be used just like any other
GitHub Action. It has two optional inputs and one output that can be used to customize your workflows.

## Inputs

| name      | type    | default | required | description                       |
| --------- | ------- | ------- | -------- | --------------------------------- |
| _minimum_ | integer | 1       | no       | minimum number of seconds to wait |
| _maximum_ | integer | 10      | no       | maximum number of seconds to wait |

## Outputs

| name        | type    | description                                          |
| ----------- | ------- | ---------------------------------------------------- |
| _wait_time_ | integer | The amount of time in seconds that the action waited |

## Usage Example

### Usage with Defaults

You can use the following snippet and add it to where you want to insert the wait.
This will wait between 1 and 10 seconds.

```yaml
- name: Insert Random Wait
  uses: AliSajid/random-wait-action@v3
```

### Specifying Parameters

Both `minimum` and `maximum` parameters are optional.

You can specify just the `minimum`:

```yaml
- name: Insert Random Wait
  uses: AliSajid/random-wait-action@v3
  with:
      minimum: 5
```

or just the `maximum`:

```yaml
- name: Insert Random Wait
  uses: AliSajid/random-wait-action@v3
  with:
      maximum: 5
```

### Recommended Usage

For production workflows, specify both parameters and pin the action to an
immutable commit SHA for the v3 release.

```yaml
- name: Add Random Waiting Time
  id: random-wait
  uses: AliSajid/random-wait-action@v3 # pin to the v3 commit SHA in hardened workflows
  with:
      minimum: 5
      maximum: 30
- name: Show selected delay
  run: echo "Waited ${{ steps.random-wait.outputs.wait_time }} seconds"
```

### Validation Rules

The action validates inputs before waiting:

- Both values must be integers (not decimals).
- Both values must be non-negative.
- Both cannot be zero simultaneously.
- `minimum` cannot exceed `maximum`.
- `maximum` is capped at **120 seconds** (2 minutes).

If validation fails, the step fails with a descriptive error message.
