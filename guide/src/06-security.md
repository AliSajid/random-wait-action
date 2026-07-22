# Security

The action requests no GitHub token permissions and does not make network
requests, minimizing its attack surface.

## Permissions

The action runs with minimal permissions. For best practices, restrict your
workflow permissions explicitly:

```yaml
permissions:
    contents: read
```

## Immutable Pinning

For high-assurance workflows, pin the action to an immutable full commit SHA
instead of a moving tag:

```yaml
- name: Add randomized delay
  uses: AliSajid/random-wait-action@<commit-sha> # v3.x.x
  with:
      minimum: 5
      maximum: 30
```

## Security Assurance

See [`SECURITY.md`](../../SECURITY.md) and
[`SECURITY_ASSURANCE.md`](../../SECURITY_ASSURANCE.md) in the repository root
for detailed support and assurance information, including:

- OpenSSF Scorecard results
- CodeQL analysis configuration
- Dependency update policies
- Signed release practices
