# Introduction

![GitHub release (latest by date)](https://img.shields.io/github/v/release/AliSajid/random-wait-action)
![GitHub](https://img.shields.io/github/license/AliSajid/random-wait-action)
[![Build Tests](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml)
[![CodeQL](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![REUSE status](https://api.reuse.software/badge/github.com/AliSajid/random-wait-action)](https://api.reuse.software/info/github.com/AliSajid/random-wait-action)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9500/badge)](https://www.bestpractices.dev/projects/9500)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/AliSajid/random-wait-action/badge)](https://scorecard.dev/viewer/?uri=github.com/AliSajid/random-wait-action)

This is a very simple GitHub action that lets you wait for a random amount of
time in seconds. This is useful for workflows that have to deal with external APIs with rate-limiting
or steps where you have to let an external process complete.

## Raison d'être

I created this action to fix a problem I was having with my own workflows.
I ran a build job for which I wanted to have individual results for each build.
For this purpose, I opted to use the excellent
[`schneegans/dynamic-badges-action`](https://github.com/schneegans/dynamic-badges-action)
to generate a badge for each build. This action updates a file in a specified
[Gist](https://gist.github.com), which can then be consumed by [Shields.io](https://shields.io)
to generate a specific badge.

This appeared to be a simple solution. However, I kept running into 500
errors from the GitHub Gist API. I theorized that the API was
probably rate limiting me because I was hitting it with twelve requests at the same time.
When I tried to find something that would let me add a some kind of non-identical delay
after the build but before the `dynamic-badges-action` fires. I could not find
one, so I decided to create this one.

## Broad Design Decisions

This is an extremely simple action. In fact, it is not much different from the
default action that is in the GitHub node-based actions template repository.

The action has no required inputs because we don't need any. By default, it waits
between 1 and 10 seconds. If that proves insufficient, the action allows for
customizing these values.

The action has one output: The number of seconds the action waited.

## Licensing

The code in this project is licensed under the [MIT](../../LICENSES/MIT.txt) License.
This guide is licensed under the [CC-BY-NC-SA-4.0](../../LICENSES/CC-BY-NC-SA-4.0.txt) License.
Other ancillary and supportive files are dedicated to the public domain using the [CC0-1.0](../../LICENSES/CC0-1.0.txt) License
