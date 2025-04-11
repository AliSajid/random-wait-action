// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { describe, it, expect, vi } from 'vitest'
import { wait } from '../src/wait'

const timingBuffer = 1000 // milliseconds to account for timer inaccuracy and async delays

describe('wait (real setTimeout)', () => {
    it('resolves between 1 and 5 seconds', async () => {
        expect.hasAssertions()

        const start = Date.now()
        await wait(1, 5)
        const end = Date.now()

        const delta = end - start

        expect(delta).toBeGreaterThanOrEqual(1000)
        expect(delta).toBeLessThanOrEqual(5000 + timingBuffer)
    })

    it('resolves between 5 and 10 seconds', async () => {
        expect.hasAssertions()

        const start = Date.now()
        await wait(5, 10)
        const end = Date.now()

        const delta = end - start

        expect(delta).toBeGreaterThanOrEqual(5000)
        expect(delta).toBeLessThanOrEqual(10000 + timingBuffer)
    })
})

describe('wait (mocked setTimeout)', () => {
    it('waits and resolves with a number string in range', async () => {
        expect.hasAssertions()

        vi.useFakeTimers()
        const promise = wait(2, 4) // should pick 2, 3, or 4
        // advance time to max possible delay to ensure resolution
        vi.advanceTimersByTime(4000)

        const result = await promise

        result.match({
            Ok: num => {
                expect(typeof num).toBe('number')
                expect(num).toBeGreaterThanOrEqual(2)
                expect(num).toBeLessThanOrEqual(4)
            },
            Err: () => {
                throw new Error('Expected Ok but got Err')
            }
        })
        vi.useRealTimers()
    })
})
