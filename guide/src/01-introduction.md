# Introduction

![GitHub release (latest by date)](https://img.shields.io/github/v/release/AliSajid/random-wait-action)
![GitHub](https://img.shields.io/github/license/AliSajid/random-wait-action)
[![Build Tests](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/test.yaml)
[![CodeQL](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml/badge.svg)](https://github.com/AliSajid/random-wait-action/actions/workflows/codeql-analysis.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![REUSE status](https://api.reuse.software/badge/github.com/AliSajid/random-wait-action)](https://api.reuse.software/info/github.com/AliSajid/random-wait-action)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9500/badge)](https://www.bestpractices.dev/projects/9500)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/AliSajid/random-wait-action/badge)](https://scorecard.dev/viewer/?uri=github.com/AliSajid/random-wait-action)

This is a very simple GitHub Action that lets you wait for a random amount of
time in seconds. It pauses a job for a randomly selected duration, helping
stagger parallel requests and reduce synchronized bursts against APIs, registries,
deployment targets, and other shared services.

Version 3 runs on the **Node 24** GitHub Actions runtime. See [Migration](./05-migration.md) for upgrade notes.

## Raison d'être

This action was born from a real incident: a matrix of 12 jobs updating the same
GitHub Gist simultaneously, causing 500 errors for later jobs due to API rate
limiting. Adding a small randomized delay between jobs allowed them to complete
successfully by spreading requests over a configurable interval.

> [!NOTE]
> Randomized delay is not a replacement for retries, exponential backoff,
> GitHub Actions concurrency controls, or provider-specific rate-limit
> handling. It addresses the narrower problem of unnecessary and unintended
> synchronization.

## Broad Design Decisions

This is an extremely simple action built on the GitHub Node 24 Actions toolkit.

The action has no required inputs. By default, it waits between **1 and 10 seconds**.
Both bounds are configurable integers capped at **120 seconds** (2 minutes).

The action has one output: `wait_time` — the actual number of seconds waited.

It requests no GitHub token permissions and makes no network requests.

## Licensing

The code in this project is licensed under the [MIT](../../LICENSES/MIT.txt) License.
This guide is licensed under the [CC-BY-NC-SA-4.0](../../LICENSES/CC-BY-NC-SA-4.0.txt) License.
Other ancillary and supportive files are dedicated to the public domain using the [CC0-1.0](../../LICENSES/CC0-1.0.txt) License
