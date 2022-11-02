import * as core from '@actions/core'
import {wait} from './wait'

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
