<!--
SPDX-FileCopyrightText: Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Random Wait Action documentation site

This directory contains the Astro + Starlight website for
`AliSajid/random-wait-action`.

## Local development

```sh
pnpm install
pnpm run dev
```

## Production build

The default configuration targets the repository Pages URL:

```sh
pnpm run build
```

The generated static site is written to `dist/`.

Override the public URL and base path when needed:

```sh
SITE_URL=https://docs.example.com BASE_PATH=/ pnpm run build
```

For GitHub project Pages, use:

```sh
SITE_URL=https://alisajid.github.io BASE_PATH=/random-wait-action/ pnpm run build
```

## Release workflow integration

Run the build from this directory and upload `website/dist` through your
existing Pages release job. Astro's `site` and `base` options are controlled
by the environment variables above, so the same source works for project Pages
and a future custom domain.

## Migrated content

The site reorganizes the previous mdBook guide into onboarding, recipes,
reference, and project sections. The old generated `book/` output is
intentionally not included.
