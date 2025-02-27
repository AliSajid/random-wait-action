// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import * as core from '@actions/core'
import { wait } from './wait'
import { validateInputs } from './utils/validateInputs'

/**
 * Main function to execute the action.
 *
 * This function retrieves the 'minimum' and 'maximum' input values, waits for a random amount of time
 * between these values, and then sets the output 'wait_time' to the number of seconds waited.
 *
 * @returns {Promise<void>} A promise that resolves when the function completes.
 */
async function run(): Promise<void> {
    try {
        const minimum: number = parseInt(core.getInput('minimum'))
        const maximum: number = parseInt(core.getInput('maximum'))

        validateInputs(minimum, maximum)

        core.debug(`Waiting between ${minimum} and ${maximum} seconds...`)

        core.debug(`Start Time: ${new Date().toTimeString()}`)
        const wait_time = await wait(minimum, maximum)
        core.debug(`End Time: ${new Date().toTimeString()}`)

        core.setOutput('wait_time', wait_time)
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
