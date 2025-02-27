// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { MINIMUM_ALLOWED, MAXIMUM_ALLOWED } from '../constants'

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
export function validateInputs(minimum: number, maximum: number): void {
    if (isNaN(minimum) || isNaN(maximum)) {
        throw new Error('minimum and maximum must be numbers')
    }

    if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
        throw new Error('minimum and maximum values must be positive integers')
    }

    if (minimum > MAXIMUM_ALLOWED || maximum > MAXIMUM_ALLOWED) {
        throw new Error(
            `minimum and maximum must be less than or equal to ${MAXIMUM_ALLOWED}`
        )
    }

    if (minimum < MINIMUM_ALLOWED || maximum < MINIMUM_ALLOWED) {
        throw new Error(
            `minimum and maximum values must be greater than ${MINIMUM_ALLOWED}`
        )
    }

    if (minimum >= maximum) {
        throw new Error('minimum must be strictly less than maximum')
    }
}
