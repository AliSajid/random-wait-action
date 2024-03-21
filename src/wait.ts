// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

export async function wait(minimum: number, maximum: number): Promise<string> {
    return new Promise(resolve => {
        if (isNaN(minimum) || isNaN(maximum)) {
            throw new Error('minimum and maximum must be numbers')
        }

        if (minimum > maximum) {
            throw new Error('minimum must be less than maximum')
        }

        const secs =
            Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        setTimeout(() => resolve(String(secs)), secs * 1000)
    })
}
