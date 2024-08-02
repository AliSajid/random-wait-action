<!--
SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Wait for a random amount of time

![GitHub release (latest by date)](https://img.shields.io/github/v/release/AliSajid/random-wait-action)
![GitHub](https://img.shields.io/github/license/AliSajid/random-wait-action)
[![Build Tests](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml)
[![CodeQL](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![REUSE status](https://api.reuse.software/badge/github.com/AliSajid/random-wait-action)](https://api.reuse.software/info/github.com/AliSajid/random-wait-action)

This is a very simple GitHub action that lets you wait for a random amount of
time in seconds. This is useful for workflows that have a lot of parallel jobs
and you want to avoid them all hitting the same API at the same time.

I ran into this when I was trying to use the excellent
[schneegans/dynamic-badges-action](https://github.com/schneegans/dynamic-badges-action)
to generate a badge for my GitHub action. I wanted to use the action to generate a badge that showed the status of
the across a matrix of twelve jobs. However, I kept running into 500 errors from the API. I realized that the API was
probably rate limiting me because I was hitting it with twelve requests at the same time. I decided to use this action
to add a random delay to each job so that they would hit the API at different times.

## Inputs

| name      | type    | default | required |
| --------- | ------- | ------- | -------- |
| _minimum_ | integer | 1       | no       |
| _maximum_ | integer | 10      | no       |

## Outputs

| name        | type    | description                                          |
| ----------- | ------- | ---------------------------------------------------- |
| _wait_time_ | integer | The amount of time in seconds that the action waited |

## Example usage

### Simple Specification

```yaml
name: Random Wait
uses: AliSajid/random-wait-action@v2
```

## Pinned SHA version with explicit parameters

```yaml
name: Add Random Waiting Time
uses: AliSajid/random-wait-action@cb425203a562475bca039ba4dbf90c7f9ac790f4 # v2.4.1
with:
    minimum: 1
    maximum: 10
```

## License

This original source code of this project is licensed under the [MIT License](LICENSES/MIT.txt). Other non-essential files are licensed under the [CC0 Public Domain Dedication](LICENSES/CC0-1.0.txt) and the author(s) dedicate them to the public domain.
