// SPDX-FileCopyrightText: 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
    docs: defineCollection({ loader: docsLoader(), schema: docsSchema() })
}
