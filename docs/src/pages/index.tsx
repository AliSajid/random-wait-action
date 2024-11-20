<<<<<<< HEAD
// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <main></main>
||||||| parent of 67a7c2b (docs: add docs)
=======
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
<<<<<<< HEAD
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
>>>>>>> 67a7c2b (docs: add docs)
||||||| parent of fe230aa (docs: add documentation)
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
=======
            <main></main>
>>>>>>> fe230aa (docs: add documentation)
        </Layout>
    )
}
