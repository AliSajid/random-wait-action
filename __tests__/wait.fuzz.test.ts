// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { wait } from '../src/wait'
import { fc, test } from '@fast-check/jest'

test.prop({ minimum: fc.nat(100), maximum: fc.nat(100) })(
    'runs correctly with randomized input',
    async ({ minimum, maximum }) => {
        fc.pre(minimum < maximum)
        const start = new Date()
        await wait(minimum, maximum)
        const end = new Date()
        var delta = Math.abs(end.getTime() - start.getTime())
        expect(delta).toBeGreaterThanOrEqual(minimum * 1000)
        expect(delta).toBeLessThanOrEqual((maximum + 1) * 1000)
    }
)
