// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// src/utils/errors.ts
export class InputValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InputValidationError';
    }
}
