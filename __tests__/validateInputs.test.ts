// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { validateInputs } from '../src/utils/validateInputs'
import { MAXIMUM_ALLOWED, MINIMUM_ALLOWED } from '../src/constants'

test('fails with invalid input', () => {
    const minimum = parseInt('foo', 10)
    const maximum = parseInt('bar', 10)
    expect(() => validateInputs(minimum, maximum)).toThrow(
        'minimum and maximum must be numbers'
    )
})

test('fails with a non-integer minimum', () => {
    const minimum = 2.5
    const maximum = 10
    expect(() => validateInputs(minimum, maximum)).toThrow(
        'minimum and maximum values must be positive integers'
    )
})

test('fails with a non-integer maximum', () => {
    const minimum = 2
    const maximum = 10.8
    expect(() => validateInputs(minimum, maximum)).toThrow(
        'minimum and maximum values must be positive integers'
    )
})

test('fails if minimum is higher than maximum', () => {
    const minimum = 10
    const maximum = 5
    expect(() => validateInputs(minimum, maximum)).toThrow(
        'minimum must be strictly less than maximum'
    )
})

test('fails if maximum is lower than minimum', () => {
    const minimum = 10
    const maximum = 5
    expect(() => validateInputs(minimum, maximum)).toThrow(
        'minimum must be strictly less than maximum'
    )
})

test('fails if minimum is higher than limit', () => {
    const minimum = 121
    const maximum = 60
    expect(() => validateInputs(minimum, maximum)).toThrow(
        `minimum and maximum must be less than or equal to ${MAXIMUM_ALLOWED}`
    )
})

test('fails if maximum is higher than limit', () => {
    const minimum = 100
    const maximum = 121
    expect(() => validateInputs(minimum, maximum)).toThrow(
        `minimum and maximum must be less than or equal to ${MAXIMUM_ALLOWED}`
    )
})

test('fails if minimum is lower than limit', () => {
    const minimum = -2
    const maximum = 10
    expect(() => validateInputs(minimum, maximum)).toThrow(
        `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
    )
})

test('fails if maximum is lower than limit', () => {
    const minimum = 2
    const maximum = -10
    expect(() => validateInputs(minimum, maximum)).toThrow(
        `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
    )
})
