// SPDX-FileCopyrightText: 2022 - 2024 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

import { InputValidationError } from './validationErrorTypes'
import { RuntimeError } from './runtimeError'

export type AppError = InputValidationError | RuntimeError
