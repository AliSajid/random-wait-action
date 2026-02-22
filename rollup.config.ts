// SPDX-FileCopyrightText: 2022 - 2026 Ali Sajid Imami
//
// SPDX-License-Identifier: MIT

// See: https://rollupjs.org/introduction/
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const config = {
    input: 'src/main.ts',
    output: {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        indent: false,
        compact: true,
        validate: true,
        plugins: [
            terser({
                compress: {
                    passes: 2
                },
                mangle: {
                    keep_fnames: false,
                    toplevel: true
                },
                format: {
                    comments: false
                },
                ecma: 2020,
                module: false
            })
        ]
    },
    plugins: [
        typescript(),
        nodeResolve({ preferBuiltins: true }),
        commonjs()
    ]
}

export default config
