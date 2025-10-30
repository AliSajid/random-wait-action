// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

/**
 * Waits for a random amount of time between the specified minimum and maximum values.
 *
 * @param {number} minimum - The minimum number of seconds to wait.
 * @param {number} maximum - The maximum number of seconds to wait.
 * @returns {Promise<string>} A promise that resolves to the number of seconds waited as a string.
 * @throws {Error} If the minimum or maximum values are not numbers.
 * @throws {Error} If the minimum or maximum values are not positive integers.
 * @throws {Error} If the minimum or maximum values are outside the allowed range.
 * @throws {Error} If the minimum value is greater than the maximum value.
 */
import { Result } from 'true-myth'
import { validateInputs } from './utils/validateInputs'
import { InputValidationError } from './utils/errors'

/**
 * Waits for a random number of seconds between minimum and maximum.
 * @param minimum The minimum number of seconds to wait.
 * @param maximum The maximum number of seconds to wait.
 * @returns A Promise that resolves to a Result containing the wait time (in seconds) or an error.
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
