// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { wait, MAXIMUM_ALLOWED, MINIMUM_ALLOWED } from '../src/wait'

test('fails with invalid input', async () => {
    const minimum = parseInt('foo', 10)
    const maximum = parseInt('bar', 10)
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum must be numbers'
    )
})

test('fails with a non-integer minimum', async () => {
    const minimum = 2.5
    const maximum = 10
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum values must be positive integers'
    )
})

test('fails with a non-integer maximum', async () => {
    const minimum = 2
    const maximum = 10.8
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum and maximum values must be positive integers'
    )
})

test('fails if minimum is higher than maximum', async () => {
    const minimum = 10
    const maximum = 5
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum must be less than maximum'
    )
})

test('fails if maximum is lower than minimum', async () => {
    const minimum = 10
    const maximum = 5
    await expect(wait(minimum, maximum)).rejects.toThrow(
        'minimum must be less than maximum'
    )
})

test('fails if minimum is higher than limit', async () => {
    const minimum = 121
    const maximum = 60
    await expect(wait(minimum, maximum)).rejects.toThrow(
        `minimum and maximum must be less than ${MAXIMUM_ALLOWED}`
    )
})

test('fails if maximum is higher than limit', async () => {
    const minimum = 100
    const maximum = 121
    await expect(wait(minimum, maximum)).rejects.toThrow(
        `minimum and maximum must be less than ${MAXIMUM_ALLOWED}`
    )
})

test('fails if minimum is lower than limit', async () => {
    const minimum = -2
    const maximum = 10
    await expect(wait(minimum, maximum)).rejects.toThrow(
        `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
    )
})

test('fails if maximum is lower than limit', async () => {
    const minimum = 2
    const maximum = -10
    await expect(wait(minimum, maximum)).rejects.toThrow(
        `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
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
