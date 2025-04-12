// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { MAXIMUM_ALLOWED, MINIMUM_ALLOWED } from '../src/constants'

describe('ensure constants are correctly set', () => {
    it('has correct maximum value', () => {
        expect.hasAssertions()

        expect(MAXIMUM_ALLOWED).toBe(120)
    })

    it('has correct minimum value', () => {
        expect.hasAssertions()

        expect(MINIMUM_ALLOWED).toBe(0)
    })
})
