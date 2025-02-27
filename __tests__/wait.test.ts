// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { wait } from '../src/wait'

test('wait between 1 and 5 seconds', async () => {
    const start = new Date()
    await wait(1, 5)
    const end = new Date()

    var delta = Math.abs(end.getTime() - start.getTime())
    expect(delta).toBeGreaterThanOrEqual(1000)
    expect(delta).toBeLessThanOrEqual(6000)
})

test('wait between 5 and 10 seconds', async () => {
    const start = new Date()
    await wait(5, 10)
    const end = new Date()

    var delta = Math.abs(end.getTime() - start.getTime())
    expect(delta).toBeGreaterThanOrEqual(5000)
    expect(delta).toBeLessThanOrEqual(11000)
})
