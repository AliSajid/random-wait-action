// SPDX-FileCopyrightText: 2022 - 2025 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// See: https://rollupjs.org/introduction/
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
    input: 'src/main.ts',
    output: {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        typescript(),
        nodeResolve({ preferBuiltins: true }),
        commonjs()
    ],
    onwarn: (warning, warn) => {
        // Skip circular dependency warnings from @actions/core
        if (
            warning.code === 'CIRCULAR_DEPENDENCY' &&
            warning.message.includes('@actions/core')
        ) {
            return;
        }
        warn(warning);
    }
});
