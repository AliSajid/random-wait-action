// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import * as core from '@actions/core'
import { wait } from './wait'

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
        const minimum: string = core.getInput('minimum')
        const maximum: string = core.getInput('maximum')
        core.debug(`Waiting between ${minimum} and ${maximum} seconds...`)

        core.debug(new Date().toTimeString())
        const wait_time = await wait(parseInt(minimum), parseInt(maximum))
        core.debug(new Date().toTimeString())

        core.setOutput('wait_time', wait_time)
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
