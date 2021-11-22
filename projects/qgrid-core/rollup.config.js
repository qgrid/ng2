// rollup.config.js
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
export default [
  {
    input: './public-api.js',
    output: {
      file: './dist/public-api.js',
      format: 'es',
      plugins: [terser()]
    }
  },
  {
    input: "./public-api.d.ts",
    output: [
      {
        file: "./dist/public-api.d.ts", 
        format: "es"
      }
    ],
    plugins: [dts()],
  },
];