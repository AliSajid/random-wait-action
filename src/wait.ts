// SPDX-FileCopyrightText: Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { Result } from 'true-myth'
import { validateInputs } from './utils/validateInputs'
import { InputValidationError } from './utils/errors'

/**
 * Waits for a random number of seconds between the specified minimum and maximum values.
 *
 * This function validates the input parameters and, if valid, waits for a random
 * duration within the specified range. It uses the Result type to handle errors
 * gracefully without throwing exceptions.
 *
 * @param minimum - The minimum number of seconds to wait (must be a positive integer).
 * @param maximum - The maximum number of seconds to wait (must be a positive integer).
 * @returns A Promise that resolves to a Result containing either:
 *   - Ok: The actual number of seconds waited as an integer
 *   - Err: An InputValidationError if the inputs are invalid
 *
 * @example
 * ```typescript
 * const result = await wait(1, 5);
 * result.match({
 *   Ok: (seconds) => console.log(`Waited ${seconds} seconds`),
 *   Err: (error) => console.error(`Validation failed: ${error.message}`)
 * });
 * ```
 */
export async function wait(
    minimum: number,
    maximum: number
): Promise<Result<number, InputValidationError>> {
    const validation = validateInputs(minimum, maximum)
    if (validation.isErr) {
        return Result.err(validation.error)
    }

    return new Promise(resolve => {
        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => resolve(Result.ok(secs)), secs * 1000)
    })
}
