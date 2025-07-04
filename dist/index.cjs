'use strict';

var core = require('@actions/core');
var trueMyth = require('true-myth');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
// src/utils/errors.ts
class InputValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputValidationError';
    }
}

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
// src/utils/validateInputs.ts
/**
 * Validates the input values.
 * @param minimum The minimum seconds.
 * @param maximum The maximum seconds.
 * @returns A Result; Ok if valid, or an InputValidationError if invalid.
 */
function validateInputs(minimum, maximum) {
    if (isNaN(minimum) || isNaN(maximum)) {
        return trueMyth.Result.err(new InputValidationError('Both minimum and maximum must be numbers.'));
    }
    if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
        return trueMyth.Result.err(new InputValidationError('Both minimum and maximum must be integers.'));
    }
    if (minimum == 0 && maximum == 0) {
        return trueMyth.Result.err(new InputValidationError('Both minimum and maximum cannot be zero.'));
    }
    if (minimum < 0 || maximum < 0) {
        return trueMyth.Result.err(new InputValidationError('Both minimum and maximum must be positive integers.'));
    }
    if (minimum > maximum) {
        return trueMyth.Result.err(new InputValidationError('Minimum cannot be greater than maximum.'));
    }
    return trueMyth.Result.ok(trueMyth.Unit);
}

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
/**
 * Waits for a random number of seconds between minimum and maximum.
 * @param minimum The minimum number of seconds to wait.
 * @param maximum The maximum number of seconds to wait.
 * @returns A Promise that resolves to a Result containing the wait time (in seconds) or an error.
 */
async function wait(minimum, maximum) {
    const validation = validateInputs(minimum, maximum);
    if (validation.isErr) {
        return trueMyth.Result.err(validation.error);
    }
    const secs = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(trueMyth.Result.ok(secs));
        }, secs * 1000);
    });
}

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
class RandomWaitAction {
    minimum;
    maximum;
    constructor(minimum, maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
    }
    /**
     * Validates inputs and waits for a random duration.
     * @returns Promise resolving to a Result wrapping the number of seconds waited, or an error.
     */
    async execute() {
        const validationResult = validateInputs(this.minimum, this.maximum);
        if (validationResult.isErr) {
            return trueMyth.Result.err(validationResult.error);
        }
        return wait(this.minimum, this.maximum);
    }
}

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
// Set the minimum time limit to 0 seconds
const MINIMUM_ALLOWED = 0;
// Set the maximum time limit to 2 minutes (120 seconds)
const MAXIMUM_ALLOWED = 120;

// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT
async function run() {
    try {
        // Retrieve input values from GitHub Action inputs
        const minInput = core__namespace.getInput('minimum');
        const maxInput = core__namespace.getInput('maximum');
        // Use Maybe to safely parse inputs into numbers
        const minimum = trueMyth.Maybe.of(minInput).mapOr(MINIMUM_ALLOWED, parseInt);
        const maximum = trueMyth.Maybe.of(maxInput).mapOr(MAXIMUM_ALLOWED, parseInt);
        // Create instance of pure business logic class
        const action = new RandomWaitAction(minimum, maximum);
        core__namespace.debug(`Executing random wait between ${minimum} and ${maximum} seconds...`);
        core__namespace.debug(`Start Time: ${new Date().toTimeString()}`);
        // Execute the wait logic
        const result = await action.execute();
        if (result.isErr) {
            core__namespace.setFailed(result.error.message);
            return;
        }
        const waitTime = result.value;
        core__namespace.debug(`End Time: ${new Date().toTimeString()}`);
        core__namespace.setOutput('wait_time', waitTime.toString());
    }
    catch (error) {
        if (error instanceof Error)
            core__namespace.setFailed(error.message);
    }
}
void run();
