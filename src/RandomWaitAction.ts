// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { Result } from 'true-myth'
import { wait } from './wait'
import { validateInputs } from './utils/validateInputs'
import { InputValidationError } from './utils/errors'

export class RandomWaitAction {
    private readonly minimum: number
    private readonly maximum: number

    constructor(minimum: number, maximum: number) {
        this.minimum = minimum
        this.maximum = maximum
    }

    /**
     * Validates inputs and waits for a random duration.
     * @returns Promise resolving to a Result wrapping the number of seconds waited, or an error.
     */
    public async execute(): Promise<Result<number, InputValidationError>> {
        const validationResult = validateInputs(this.minimum, this.maximum)
        if (validationResult.isErr) {
            return Result.err(validationResult.error)
        }

        return wait(this.minimum, this.maximum)
    }
}
