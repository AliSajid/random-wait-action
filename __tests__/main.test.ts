import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
// import {expect, test} from '@jest/globals'

test('throws invalid number', async () => {
  const minimum = parseInt('foo', 10)
  const maximum = parseInt('bar', 10)
  await expect(wait(minimum, maximum)).rejects.toThrow(
    'minimum and maximum must be numbers'
  )
})

test('wait between 1 and 5 seconds', async () => {
  const start = new Date()
  await wait(1, 5)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(1000)
  expect(delta).toBeLessThan(10000)
})
