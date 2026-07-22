// SPDX-FileCopyrightText: 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: CC0-1.0

import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

const site = process.env.SITE_URL ?? 'https://alisajid.github.io'
const base = process.env.BASE_PATH ?? '/random-wait-action/'

export default defineConfig({
    site,
    base,
    integrations: [
        starlight({
            title: 'Random Wait Action',
            description:
                'Add randomized jitter to GitHub Actions jobs and spread synchronized requests over time.',
            logo: {
                src: './src/assets/logo.svg',
                replacesTitle: false
            },
            favicon: '/favicon.svg',
            customCss: ['./src/styles/custom.css'],
            social: [
                {
                    icon: 'github',
                    label: 'Github',
                    href: 'https://github.com/AliSajid/random-wait-action'
                }
            ],
            editLink: {
                baseUrl:
                    'https://github.com/AliSajid/random-wait-action/edit/main/website/'
            },
            lastUpdated: true,
            pagination: true,
            sidebar: [
                {
                    label: 'Start here',
                    items: [
                        { label: 'Overview', slug: 'overview' },
                        {
                            label: 'Quickstart',
                            slug: 'getting-started/quickstart'
                        },
                        {
                            label: 'Choose a delay range',
                            slug: 'getting-started/choose-a-range'
                        }
                    ]
                },
                {
                    label: 'Recipes',
                    items: [{ autogenerate: { directory: 'recipes' } }]
                },
                {
                    label: 'Reference',
                    items: [
                        {
                            label: 'Inputs and output',
                            slug: 'reference/inputs-and-output'
                        },
                        {
                            label: 'Validation and behavior',
                            slug: 'reference/validation'
                        },
                        {
                            label: 'Alternatives and trade-offs',
                            slug: 'reference/alternatives'
                        }
                    ]
                },
                {
                    label: 'Project',
                    items: [
                        {
                            label: 'Migrate from v2',
                            slug: 'project/migration-v3'
                        },
                        { label: 'Security', slug: 'project/security' },
                        {
                            label: 'Acknowledgements',
                            slug: 'project/acknowledgements'
                        }
                    ]
                }
            ]
        })
    ]
})
