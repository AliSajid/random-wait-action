// SPDX-FileCopyrightText: Ali Sajid Imami
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
        ['both NaN', NaN, NaN, /numbers/],
        ['non-integer minimum', 1.5, 10, /integers/],
        ['non-integer maximum', 1, 9.9, /integers/],
        ['non-positive minimum', -1, 10, /positive/],
        ['non-positive maximum', 1, 0, /greater/],
        ['minimum greater than maximum', 11, 10, /greater than/],
        ['maximum exceeds allowed limit', 1, 121, /exceed/],
        ['both zero', 0, 0, /cannot be zero/],
        ['Infinity minimum', Infinity, 10, /integers/],
        ['Infinity maximum', 5, Infinity, /integers/],
        ['negative Infinity minimum', -Infinity, 10, /integers/],
        ['float near zero minimum', 0.1, 10, /integers/],
        ['large negative minimum', -1000, 10, /positive/],
        ['large negative maximum', 5, -500, /positive/]
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

    describe('valid inputs', () => {
        it('returns ok for typical valid range', () => {
            const result = validateInputs(5, 10)

            expect(result.isOk).toBe(true)
        })

        it('returns ok when minimum is zero and maximum is positive', () => {
            const result = validateInputs(0, 5)

            expect(result.isOk).toBe(true)
        })

        it('returns ok when minimum equals maximum', () => {
            const result = validateInputs(7, 7)

            expect(result.isOk).toBe(true)
        })

        it('returns ok at exact maximum boundary (120)', () => {
            const result = validateInputs(1, 120)

            expect(result.isOk).toBe(true)
        })

        it('returns ok for zero minimum and maximum boundary', () => {
            const result = validateInputs(0, 120)

            expect(result.isOk).toBe(true)
        })

        it('returns ok for single second range', () => {
            const result = validateInputs(1, 1)

            expect(result.isOk).toBe(true)
        })
    })
})

describe('validateInputs (property-based)', () => {
    it('always returns ok for positive integers where min <= max (within allowed range)', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 120 }),
                fc.integer({ min: 1, max: 120 }),
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
                    expect(result.isErr).toBe(true)
                    result.match({
                        Err: error => {
                            expect(error.message).toMatch(/greater than/)
                        },
                        Ok: () => {
                            throw new Error('Expected Err but got Ok')
                        }
                    })
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

describe('validateInputs (error type)', () => {
    it('sets error name to InputValidationError', () => {
        const result = validateInputs(NaN, 10)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.name).toBe('InputValidationError')
                expect(error).toBeInstanceOf(Error)
            }
        })
    })

    it('preserves the original message', () => {
        const result = validateInputs(10, 5)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toBe(
                    'Minimum cannot be greater than maximum.'
                )
            }
        })
    })
})

describe('validateInputs (validation order)', () => {
    it('NaN check takes priority over other violations', () => {
        const result = validateInputs(NaN, -5)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/numbers/)
            }
        })
    })

    it('integer check takes priority over zero/negative checks', () => {
        const result = validateInputs(1.5, -3)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/integers/)
            }
        })
    })

    it('zero check takes priority over negative check', () => {
        const result = validateInputs(0, 0)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/cannot be zero/)
            }
        })
    })

    it('negative check takes priority over min > max', () => {
        const result = validateInputs(-5, -10)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/positive/)
            }
        })
    })

    it('min > max check takes priority over maximum exceeded', () => {
        const result = validateInputs(200, 150)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/greater than/)
            }
        })
    })
})

describe('validateInputs (boundary)', () => {
    it('rejects maximum of 121', () => {
        const result = validateInputs(1, 121)

        expect(result.isErr).toBe(true)
    })

    it('accepts maximum of exactly 120', () => {
        const result = validateInputs(1, 120)

        expect(result.isOk).toBe(true)
    })

    it('rejects maximum of 1000', () => {
        const result = validateInputs(1, 1000)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toContain('120')
            }
        })
    })
})
