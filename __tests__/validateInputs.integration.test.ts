// SPDX-FileCopyrightText: Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { wait } from '../src/wait'
import { RandomWaitAction } from '../src/RandomWaitAction'
import { InputValidationError } from '../src/utils/errors'

vi.useFakeTimers()

describe('validateInputs integration through wait()', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.clearAllTimers()
    })

    it('propagates NaN error through wait', async () => {
        const result = await wait(NaN, 10)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error).toBeInstanceOf(InputValidationError)
                expect(error.message).toMatch(/numbers/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates non-integer error through wait', async () => {
        const result = await wait(1.5, 10)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/integers/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates both-zero error through wait', async () => {
        const result = await wait(0, 0)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/cannot be zero/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates negative error through wait', async () => {
        const result = await wait(-1, 10)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/positive/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates min-greater-than-max error through wait', async () => {
        const result = await wait(10, 5)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/greater than/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates maximum-exceeded error through wait', async () => {
        const result = await wait(1, 121)

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/exceed/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('returns ok for valid inputs through wait', async () => {
        const promise = wait(1, 3)

        vi.runAllTimers()
        const result = await promise

        expect(result.isOk).toBe(true)
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

    it('does not call setTimeout when validation fails', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')

        await wait(10, 5)

        expect(setTimeoutSpy).not.toHaveBeenCalled()
    })
})

describe('validateInputs integration through RandomWaitAction', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.clearAllTimers()
    })

    it('propagates NaN error through execute', async () => {
        const action = new RandomWaitAction(NaN, 10)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error).toBeInstanceOf(InputValidationError)
                expect(error.name).toBe('InputValidationError')
                expect(error.message).toMatch(/numbers/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates non-integer error through execute', async () => {
        const action = new RandomWaitAction(2.5, 10)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/integers/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates both-zero error through execute', async () => {
        const action = new RandomWaitAction(0, 0)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/cannot be zero/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates negative minimum error through execute', async () => {
        const action = new RandomWaitAction(-5, 10)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/positive/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates negative maximum error through execute', async () => {
        const action = new RandomWaitAction(5, -10)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/positive/)
            },
            Ok: () => {
                throw new Error('Expected Ok but got Err')
            }
        })
    })

    it('propagates min-greater-than-max error through execute', async () => {
        const action = new RandomWaitAction(15, 5)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/greater than/)
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('propagates maximum-exceeded error through execute', async () => {
        const action = new RandomWaitAction(1, 200)
        const result = await action.execute()

        expect(result.isErr).toBe(true)
        result.match({
            Err: error => {
                expect(error.message).toMatch(/exceed/)
                expect(error.message).toContain('120')
            },
            Ok: () => {
                throw new Error('Expected Err but got Ok')
            }
        })
    })

    it('returns ok for valid inputs through execute', async () => {
        const action = new RandomWaitAction(1, 3)
        const promise = action.execute()

        vi.runAllTimers()
        const result = await promise

        expect(result.isOk).toBe(true)
        result.match({
            Ok: seconds => {
                expect(typeof seconds).toBe('number')
                expect(Number.isInteger(seconds)).toBe(true)
                expect(seconds).toBeGreaterThanOrEqual(1)
                expect(seconds).toBeLessThanOrEqual(3)
            },
            Err: () => {
                throw new Error('Expected Ok but got Err')
            }
        })
    })

    it('does not schedule timer when validation fails', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')

        const action = new RandomWaitAction(10, 5)
        await action.execute()

        expect(setTimeoutSpy).not.toHaveBeenCalled()
    })

    it('validates at execute time, not construct time', async () => {
        const action = new RandomWaitAction(NaN, 10)

        const result = await action.execute()
        expect(result.isErr).toBe(true)
    })
})
