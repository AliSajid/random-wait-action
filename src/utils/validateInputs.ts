// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// src/utils/validateInputs.ts
import { Result, Unit } from 'true-myth'
import { InputValidationError } from './errors.js'

/**
 * Validates the input values.
 * @param minimum The minimum seconds.
 * @param maximum The maximum seconds.
 * @returns A Result; Ok if valid, or an InputValidationError if invalid.
 */
export function validateInputs(
    minimum: number,
    maximum: number
): Result<Unit, InputValidationError> {
    if (isNaN(minimum) || isNaN(maximum)) {
        return Result.err(
            new InputValidationError(
                'Both minimum and maximum must be numbers.'
            )
        )
    }

    if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
        return Result.err(
            new InputValidationError(
                'Both minimum and maximum must be integers.'
            )
        )
    }

    if (minimum == 0 && maximum == 0) {
        return Result.err(
            new InputValidationError('Both minimum and maximum cannot be zero.')
        )
    }

    if (minimum < 0 || maximum < 0) {
        return Result.err(
            new InputValidationError(
                'Both minimum and maximum must be positive integers.'
            )
        )
    }
    if (minimum > maximum) {
        return Result.err(
            new InputValidationError('Minimum cannot be greater than maximum.')
        )
    }
    return Result.ok(Unit)
}
