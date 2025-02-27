// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// Set the maximum time limit to 2 minutes (120 seconds)
const limit: number = 120

type WaitPromise = Promise<string>

/**
 * Waits for a random amount of time between the specified minimum and maximum values.
 *
 * @param {number} minimum - The minimum number of seconds to wait.
 * @param {number} maximum - The maximum number of seconds to wait.
 * @returns {Promise<string>} A promise that resolves to the number of seconds waited as a string.
 * @throws {Error} If the minimum or maximum values are not numbers.
 * @throws {Error} If the minimum value is greater than the maximum value.
 * @throws {Error} If the minimum or maximum values are greater than the limit (100).
 */
export async function wait(minimum: number, maximum: number): WaitPromise {
    return new Promise(resolve => {
        if (isNaN(minimum) || isNaN(maximum)) {
            throw new Error('minimum and maximum must be numbers')
        }

        if (minimum > maximum) {
            throw new Error('minimum must be less than maximum')
        }

        if (minimum > limit || maximum > limit) {
            throw new Error('minimum and maximum must be less than 120')
        }

        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => {
            return resolve(String(secs))
        }, secs * 1000)
    })
}
