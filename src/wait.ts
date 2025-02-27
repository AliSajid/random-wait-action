// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// Set the minimum time limit to 0 seconds
export const MINIMUM_ALLOWED: number = 0

// Set the maximum time limit to 2 minutes (120 seconds)
export const MAXIMUM_ALLOWED: number = 120

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
        if (isNaN(minimum) || isNaN(maximum)) {
            throw new Error('minimum and maximum must be numbers')
        }

        if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
            throw new Error(
                'minimum and maximum values must be positive integers'
            )
        }

        if (minimum > MAXIMUM_ALLOWED || maximum > MAXIMUM_ALLOWED) {
            throw new Error(
                `minimum and maximum must be less than ${MAXIMUM_ALLOWED}`
            )
        }

        if (minimum < MINIMUM_ALLOWED || maximum < MINIMUM_ALLOWED) {
            throw new Error(
                `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
            )
        }

        if (minimum > maximum) {
            throw new Error('minimum must be less than maximum')
        }

        if (maximum < minimum) {
            throw new Error('maximum must be greater than minimum')
        }

        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => {
            return resolve(String(secs))
        }, secs * 1000)
    })
}
