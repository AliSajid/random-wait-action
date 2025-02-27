// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { validateInputs } from './utils/validateInputs'

type WaitPromise = Promise<string>

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

export async function wait(minimum: number, maximum: number): WaitPromise {
    return new Promise(resolve => {
        validateInputs(minimum, maximum)

        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => {
            return resolve(String(secs))
        }, secs * 1000)
    })
}
