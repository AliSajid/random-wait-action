// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import Result, { err, ok } from 'true-myth/result'
import { MINIMUM_ALLOWED, MAXIMUM_ALLOWED } from '../constants'
import {
    NotANumberError,
    NotAnIntegerError,
    ExceedsMaximumAllowedTimeError,
    MinimumNotLessThanMaximumError,
    BelowMinimumAllowedError,
    InputValidationError
} from '../types/validationErrorTypes'
import { InputValidationSuccess } from '../types/validationSuccessTypes'

/**
 * Validates the minimum and maximum wait time inputs.
 *
 * @param {number} minimum - The minimum number of seconds to wait.
 * @param {number} maximum - The maximum number of seconds to wait.
 * @throws {Error} If the minimum or maximum values are not numbers.
 * @throws {Error} If the minimum or maximum values are not positive integers.
 * @throws {Error} If the minimum or maximum values are outside the allowed range.
 * @throws {Error} If the minimum value is greater than the maximum value.
 */
export function validateInputs(
    minimum: number,
    maximum: number
): Result<InputValidationSuccess, InputValidationError> {
    if (isNaN(minimum) || isNaN(maximum)) {
        return err(new NotANumberError())
    }

    if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
        return err(new NotAnIntegerError())
    }

    if (minimum > MAXIMUM_ALLOWED || maximum > MAXIMUM_ALLOWED) {
        return err(new ExceedsMaximumAllowedTimeError(MAXIMUM_ALLOWED))
    }

    if (minimum < MINIMUM_ALLOWED || maximum < MINIMUM_ALLOWED) {
        return err(new BelowMinimumAllowedError(MINIMUM_ALLOWED))
    }

    if (minimum >= maximum) {
        return err(new MinimumNotLessThanMaximumError())
    }

    return ok(new InputValidationSuccess())
}
