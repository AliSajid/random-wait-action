// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import * as core from '@actions/core'
import { Maybe } from 'true-myth'
import { RandomWaitAction } from './RandomWaitAction'
import { MAXIMUM_ALLOWED, MINIMUM_ALLOWED } from './constants'

async function run(): Promise<void> {
    try {
        // Retrieve input values from GitHub Action inputs
        const minInput = core.getInput('minimum')
        const maxInput = core.getInput('maximum')

        // Use Maybe to safely parse inputs into numbers
        const minimum = Maybe.of(minInput).mapOr(MINIMUM_ALLOWED, parseInt)
        const maximum = Maybe.of(maxInput).mapOr(MAXIMUM_ALLOWED, parseInt)

        // Create instance of pure business logic class
        const action = new RandomWaitAction(minimum, maximum)
        core.debug(
            `Executing random wait between ${minimum} and ${maximum} seconds...`
        )
        core.debug(`Start Time: ${new Date().toTimeString()}`)

        // Execute the wait logic
        const result = await action.execute()
        if (result.isErr) {
            core.setFailed(result.error.message)
            return
        }

        const waitTime = result.value
        core.debug(`End Time: ${new Date().toTimeString()}`)
        core.setOutput('wait_time', waitTime.toString())
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

void run()
