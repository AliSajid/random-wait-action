// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

const limit: number = 100

type WaitPromise = Promise<string>

export async function wait(minimum: number, maximum: number): WaitPromise {
    return new Promise(resolve => {
        if (isNaN(minimum) || isNaN(maximum)) {
            throw new Error('minimum and maximum must be numbers')
        }

        if (minimum > maximum) {
            throw new Error('minimum must be less than maximum')
        }

        if (minimum > limit || maximum > limit) {
            throw new Error('minimum and maximum must be less than 100')
        }

        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => {
            return resolve(String(secs))
        }, secs * 1000)
    })
}
