// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { wait } from '../src/wait'

test('fails with invalid input', async () => {
    const minimum = parseInt('foo', 10)
    const maximum = parseInt('bar', 10)
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum must be numbers'
    )
})

test('wait between 1 and 5 seconds', async () => {
    const start = new Date()
    await wait(1, 5)
    const end = new Date()
    var delta = Math.abs(end.getTime() - start.getTime())
    expect(delta).toBeGreaterThanOrEqual(1000)
    expect(delta).toBeLessThanOrEqual(6000)
})

test('fails if minimum is higher than maximum', async () => {
    const minimum = 10
    const maximum = 5
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum must be less than maximum'
    )
})

test('fails if minimum is higher than limit', async () => {
    const minimum = 101
    const maximum = 200
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum must be less than 100'
    )
})

test('fails if maximum is lower than minimum', async () => {
    const minimum = 10
    const maximum = 5
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum must be less than maximum'
    )
})

test('fails if maximum is higher than limit', async () => {
    const minimum = 100
    const maximum = 101
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum must be less than 100'
    )
})
