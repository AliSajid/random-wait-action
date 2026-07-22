# Quickstart

This is a very simple [GitHub Action](https://github.com/features/actions) to inject
a random amount of wait time between steps.

You can use it with the defaults as follows:

```yaml
name: My Awesome GitHub Action Workflow
on:
    push:
permissions:
    contents: read

jobs:
    my_job:
        name: My Awesome Job
        runs-on: ubuntu-latest
        steps:
            - name: First Step
              uses: actions/checkout@v4
            - name: Add Waiting Time
              id: random-wait
              uses: AliSajid/random-wait-action@v3
            - name: Show selected delay
              run: echo "Waited ${{ steps.random-wait.outputs.wait_time }} seconds"
            - name: Second Step
              run: python my_awesome_script.py
```

You can look at [Usage](./02-usage.md) for the ways you can customize this.
