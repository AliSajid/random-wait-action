// SPDX-FileCopyrightText: 2022 - 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// src/utils/validateInputs.ts
import { Result, Unit } from 'true-myth'
import { InputValidationError } from './errors'

/**
 * Validates minimum and maximum wait time inputs.
 *
 * This function performs comprehensive validation to ensure the wait parameters
 * are valid before attempting to use them. It checks for:
 * - Both values are numbers (not NaN)
 * - Both values are integers (not decimals)
 * - Both values are positive (> 0)
 * - Both values are not zero simultaneously
 * - Minimum is not greater than maximum
 *
 * @param minimum - The minimum number of seconds to wait.
 * @param maximum - The maximum number of seconds to wait.
 * @returns A Result containing:
 *   - Ok(Unit): If all validation checks pass
 *   - Err(InputValidationError): If any validation check fails, with a descriptive error message
 *
 * @example
 * ```typescript
 * const result = validateInputs(5, 10);
 * if (result.isOk) {
 *   // Inputs are valid, proceed with wait
 * } else {
 *   console.error(result.error.message);
 * }
 * ```
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
