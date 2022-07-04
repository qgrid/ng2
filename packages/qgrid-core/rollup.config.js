import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import sourcemaps from 'rollup-plugin-sourcemaps';
// import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './public-api.js',
    output: {
      file: './dist/public-api.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ preferBuiltins: false, browser: true }),
      commonjs(),
      sourcemaps(),
    ],
  },
  {
    input: './public-api.d.ts',
    output: {
      file: './dist/public-api.d.ts',
    },
    plugins: [dts()],
  },
];
