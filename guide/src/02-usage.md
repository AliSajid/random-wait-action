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
  uses: AliSajid/random-wait-action@v2
```

### Specifying Parameters

Both `minimum` and `maximum` parameters are optional.

You can specify just the `minimum`:

```yaml
- name: Insert Random Wait
  uses: AliSajid/random-wait-action@v2
  with:
      minimum: 5
```

or just the `maximum`:

```yaml
- name: Insert Random Wait
  uses: AliSajid/random-wait-action@v2
  with:
      maximum: 5
```

### Recommended Usage

Except for very simple use cases, we recommend specifying both parameters
and using a pinned hash to the latest version.

```yaml
name: Add Random Waiting Time
uses: AliSajid/random-wait-action@f9109712daa7a8103f7be16b68634b9d376587a7 # v2.4.1
with:
    minimum: 1
    maximum: 10
```
