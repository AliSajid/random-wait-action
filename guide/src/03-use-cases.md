# Use Cases

## Stagger Matrix Jobs

GitHub Actions matrix jobs often start at nearly the same time. When every job
immediately contacts the same external service, individually reasonable requests
can become a concentrated burst. Adding jitter spreads those requests over a
configurable interval.

```yaml
strategy:
    matrix:
        version: ['18', '20', '22']
steps:
    - name: Stagger API calls
      uses: AliSajid/random-wait-action@v3
      with:
          minimum: 5
          maximum: 30
    - name: Call external API
      run: ./call-api.sh
```

## Spread Deployment Requests

When deploying to multiple targets or provisioning resources in parallel, a
randomized delay prevents all requests from arriving simultaneously.

## Reduce Synchronized Registry Requests

Package registries, badge services (like Shields.io), and shared test
infrastructure can be overwhelmed by synchronized requests. This action was
originally created to solve 500 errors from the GitHub Gist API when 12 matrix
jobs updated the same Gist concurrently.

## Introduce Timing Variation in Tests

When testing order-independent workflows, introducing timing variation helps
surface race conditions and ensures tests don't depend on exact execution order.

## When Not to Use It

- **Need a hard limit on concurrent jobs?** Use GitHub Actions concurrency controls instead.
- **Service asks clients to retry?** Use retries with exponential backoff.
- **Provider offers rate-limit headers?** Use provider-specific rate-limit handling and quotas.

Random Wait Action is most useful when jobs may still run concurrently but
should not begin the sensitive operation at exactly the same time.
