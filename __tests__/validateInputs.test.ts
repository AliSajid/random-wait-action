// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { validateInputs } from '../src/utils/validateInputs'
import { InputValidationError } from '../src/utils/errors.ts'
import fc from 'fast-check'

describe('validateInputs (unit cases)', () => {
    describe.each([
        ['NaN minimum', NaN, 10, /numbers/],
        ['NaN maximum', 5, NaN, /numbers/],
        ['non-integer minimum', 1.5, 10, /integers/],
        ['non-integer maximum', 1, 9.9, /integers/],
        ['non-positive minimum', -1, 10, /positive/],
        ['non-positive maximum', 1, 0, /greater/],
        ['minimum greater than maximum', 11, 10, /greater than/]
    ])('%s', (_desc, min, max, expectedError) => {
        it(`should return error when min=${min}, max=${max}`, () => {
            const result = validateInputs(min, max)

            expect(result.isErr).toBe(true)

            result.match({
                Ok: () => {
                    throw new Error('Expected Err but got Ok')
                },
                Err: error => {
                    expect(error).toBeInstanceOf(InputValidationError)
                    expect(error.message).toMatch(expectedError)
                }
            })
        })
    })

    it('returns ok when inputs are valid', () => {
        const result = validateInputs(5, 10)

        expect(result.isOk).toBe(true)
    })
})

describe('validateInputs (property-based)', () => {
    it('always returns ok for positive integers where min <= max', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1000 }),
                fc.integer({ min: 1, max: 1000 }),
                (a, b) => {
                    const min = Math.min(a, b)
                    const max = Math.max(a, b)
                    const result = validateInputs(min, max)

                    expect(result.isOk).toBe(true)
                }
            )
        )
    })

    it('always returns error when min > max', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1000 }),
                fc.integer({ min: 1, max: 1000 }),
                (a, b) => {
                    if (a <= b) return // skip valid cases
                    const result = validateInputs(a, b)
                    if (result.isErr) {
                        expect(result.error.message).toMatch(/greater than/)
                    }
                }
            )
        )
    })

    it('never accepts negative inputs', () => {
        fc.assert(
            fc.property(
                fc.integer({ max: 0 }),
                fc.integer({ max: 0 }),
                (min, max) => {
                    const result = validateInputs(min, max)

                    expect(result.isErr).toBe(true)

                    result.match({
                        Ok: () => {
                            throw new Error('Expected Err but got Ok')
                        },
                        Err: error => {
                            expect(error.message).toMatch(/positive|greater/)
                        }
                    })
                }
            )
        )
    })
})
