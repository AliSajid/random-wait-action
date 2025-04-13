// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

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

    const secs = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Result.ok(secs))
        }, secs * 1000)
    })
}
