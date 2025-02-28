// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

export interface InputValidationError {
    type: 'InputValidationError'
    message: string
}

export class NotANumberError implements InputValidationError {
    type: 'InputValidationError' = 'InputValidationError'
    message: string = 'minimum and maximum must be numbers'
}

export class NotAnIntegerError implements InputValidationError {
    type: 'InputValidationError' = 'InputValidationError'
    message: string = 'minimum and maximum values must be positive integers'
}

export class ExceedsMaximumAllowedTimeError implements InputValidationError {
    type: 'InputValidationError' = 'InputValidationError'
    message: string

    constructor(maximumAllowed: number) {
        this.message = `minimum and maximum must be less than or equal to ${maximumAllowed}`
    }
}

export class BelowMinimumAllowedError implements InputValidationError {
    type: 'InputValidationError' = 'InputValidationError'
    message: string

    constructor(minimumAllowed: number) {
        this.message = `minimum and maximum values must be greater than ${minimumAllowed}`
    }
}

export class MinimumNotLessThanMaximumError implements InputValidationError {
    type: 'InputValidationError' = 'InputValidationError'
    message: string = 'minimum must be strictly less than maximum'
}
