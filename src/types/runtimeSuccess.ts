// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

export interface WaitSuccess {
    type: 'WaitSuccess'
    value: string
}

export class WaitSuccess implements WaitSuccess {
    constructor(seconds: number) {
        this.value = seconds.toString()
    }
}
