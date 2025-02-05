// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { warn } from 'console'

const config: Config = {
    title: 'Random Wait Action',
    tagline:
        'A simple GitHub Action to inject wait for a random amount of time',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://imamiland.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/random-wait-action/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'Imamiland', // Usually your GitHub org/user name.
    projectName: 'Random Wait Action', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    /// Add typedoc plugin
    plugins: [
        [
            'docusaurus-plugin-typedoc',

            // Options
            {
                entryPoints: ['src/main.ts'],
                tsconfig: 'tsconfig.json'
            }
        ]

    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './docs/sidebars.ts'
                },
                blog: false,
                pages: {
                    routeBasePath: '/pages'
                },
                blog: false,
                pages: {
                    routeBasePath: '/pages'
                },
                theme: {
                    customCss: './docs/src/css/custom.css'
                }
            } satisfies Preset.Options

        ]

    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'docs/img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Random Wait Action',
            items: [
                {
                    href: 'https://github.com/marketplace/actions/random-wait-action',
                    position: 'left',
                    label: 'GitHub Marketplace'
                },
                {
                    href: 'https://github.com/AliSajid/random-wait-action',
                    label: 'GitHub',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/api'
                        }
                    ]
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/api/globals'
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/AliSajid/random-wait-action'
                        }
                    ]
                }
            ],
            copyright: `Copyright © 2022 - ${new Date().getFullYear()} Ali Sajid Imami. Built with Docusaurus.`
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        }
    } satisfies Preset.ThemeConfig
}

export default config
