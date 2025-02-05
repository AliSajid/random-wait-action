// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'
import Homepage from '../components/Homepage'

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout
            title={`${siteConfig.title} - Documentation`}
            description="Documentation fot the Random Wait Action GitHub Action, a simple GitHub Action to inject wait for a random amount of time"
        >
            <main>
                <h1> I am a big heading </h1>
            </main>
        </Layout>
    )
}
