// SPDX-FileCopyrightText: Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { describe, expect, vi, beforeEach, it } from 'vitest'
import { RandomWaitAction } from '../src/RandomWaitAction'
import { InputValidationError } from '../src/utils/errors'

vi.useFakeTimers()

describe('RandomWaitAction', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.clearAllTimers()
    })

    it('waits for a time between 1 and 3 seconds when inputs are valid', async () => {
        const action = new RandomWaitAction(1, 3)

        const promise = action.execute()

        // Fast-forward timers so the promise can resolve
        vi.runAllTimers()
        const result = await promise

        result.match({
            Ok: seconds => {
                expect(seconds).toBeGreaterThanOrEqual(1)
                expect(seconds).toBeLessThanOrEqual(3)
            },
            Err: () => {
                throw new Error('Expected Ok but got Err')
            }
        })
    })

    it('resolves immediately when min and max are equal', async () => {
        const action = new RandomWaitAction(2, 2)

        const promise = action.execute()
        vi.runAllTimers()
        const result = await promise

        result.match({
            Ok: seconds => {
                expect(seconds).toBe(2)
            },
            Err: () => {
                throw new Error('Expected Ok but got Err')
            }
        })
    })

    it('returns error if minimum is greater than maximum', async () => {
        const action = new RandomWaitAction(10, 5)

        const result = await action.execute()

        expect(result.isErr).toBe(true)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error).toBeInstanceOf(InputValidationError)
                expect(error.message).toMatch(/minimum.*greater.*maximum/i)
            }
        })
    })

    it('returns error if minimum is negative', async () => {
        const action = new RandomWaitAction(-2, 5)

        const result = await action.execute()

        expect(result.isErr).toBe(true)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/positive integer/i)
            }
        })
    })

    it('returns error if maximum is negative', async () => {
        const action = new RandomWaitAction(2, -5)

        const result = await action.execute()

        expect(result.isErr).toBe(true)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/positive integer/i)
            }
        })
    })

    it('returns error if both are zero', async () => {
        const action = new RandomWaitAction(0, 0)

        const result = await action.execute()

        expect(result.isErr).toBe(true)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/cannot be zero/i)
            }
        })
    })

    it('returns error if maximum is zero and minimum is positive', async () => {
        const action = new RandomWaitAction(1, 0)

        const result = await action.execute()

        expect(result.isErr).toBe(true)

        result.match({
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            },
            Err: error => {
                expect(error.message).toMatch(/minimum.*greater.*maximum/i)
            }
        })
    })

    it('calls setTimeout with the correct duration', async () => {
        const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

        const action = new RandomWaitAction(2, 2) // predictable delay
        const promise = action.execute()
        vi.runAllTimers()
        await promise

        expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2000)
    })
})
