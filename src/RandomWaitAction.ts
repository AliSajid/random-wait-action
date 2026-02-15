// SPDX-FileCopyrightText: 2022 - 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { Result } from 'true-myth'
import { wait } from './wait'
import { validateInputs } from './utils/validateInputs'
import { InputValidationError } from './utils/errors'

/**
 * A class that encapsulates the logic for waiting a random amount of time.
 *
 * This class validates input parameters and delegates to the wait function to
 * perform the actual delay. It uses the Result type pattern to handle errors
 * without throwing exceptions, making error handling explicit and type-safe.
 */
export class RandomWaitAction {
    private readonly minimum: number
    private readonly maximum: number

    constructor(minimum: number, maximum: number) {
        this.minimum = minimum
        this.maximum = maximum
    }

    /**
     * Validates inputs and waits for a random duration between minimum and maximum seconds.
     *
     * Validation rules:
     * - Both minimum and maximum must be integers
     * - Both must be positive (> 0)
     * - Minimum cannot be greater than maximum
     * - Both cannot be zero simultaneously
     *
     * @returns A Promise resolving to a Result containing either:
     *   - Ok: The number of seconds actually waited (integer)
     *   - Err: An InputValidationError describing why validation failed
     *
     * @example
     * ```typescript
     * const action = new RandomWaitAction(5, 10);
     * const result = await action.execute();
     * result.match({
     *   Ok: (seconds) => console.log(`Waited ${seconds}s`),
     *   Err: (error) => console.error(error.message)
     * });
     * ```
     */
    public async execute(): Promise<Result<number, InputValidationError>> {
        const validationResult = validateInputs(this.minimum, this.maximum)
        if (validationResult.isErr) {
            return Result.err(validationResult.error)
        }

        return wait(this.minimum, this.maximum)
    }
}
