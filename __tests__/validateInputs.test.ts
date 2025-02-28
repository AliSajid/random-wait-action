// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { validateInputs } from '../src/utils/validateInputs'
import { MAXIMUM_ALLOWED, MINIMUM_ALLOWED } from '../src/constants'
import { err, ok } from 'true-myth/result'
import { InputValidationSuccess } from '../src/types/validationSuccessTypes'
import {
    BelowMinimumAllowedError,
    ExceedsMaximumAllowedTimeError,
    MinimumNotLessThanMaximumError,
    NotAnIntegerError,
    NotANumberError
} from '../src/types/validationErrorTypes'

test('succeesds with valid input', () => {
    const result = validateInputs(1, 10)
    expect(result).toEqual(ok(new InputValidationSuccess()))
})

test('fails with invalid input', () => {
    const minimum = parseInt('foo', 10)
    const maximum = parseInt('bar', 10)
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new NotANumberError()))
})

test('fails with a non-integer minimum', () => {
    const minimum = 2.5
    const maximum = 10
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new NotAnIntegerError()))
})

test('fails with a non-integer maximum', () => {
    const minimum = 2
    const maximum = 10.8
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new NotAnIntegerError()))
})

test('fails if minimum is higher than maximum', () => {
    const minimum = 10
    const maximum = 5
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new MinimumNotLessThanMaximumError()))
})

test('fails if maximum is lower than minimum', () => {
    const minimum = 10
    const maximum = 5
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new MinimumNotLessThanMaximumError()))
})

test('fails if minimum is higher than limit', () => {
    const minimum = 121
    const maximum = 60
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(
        err(new ExceedsMaximumAllowedTimeError(MAXIMUM_ALLOWED))
    )
})

test('fails if maximum is higher than limit', () => {
    const minimum = 100
    const maximum = 121
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(
        err(new ExceedsMaximumAllowedTimeError(MAXIMUM_ALLOWED))
    )
})

test('fails if minimum is lower than limit', () => {
    const minimum = -2
    const maximum = 10
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new BelowMinimumAllowedError(MINIMUM_ALLOWED)))
})

test('fails if maximum is lower than limit', () => {
    const minimum = 2
    const maximum = -10
    const result = validateInputs(minimum, maximum)
    expect(result).toEqual(err(new BelowMinimumAllowedError(MINIMUM_ALLOWED)))
})
