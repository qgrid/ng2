// rollup.config.js
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
export default [
  //qgrid-core
  {
    input: './projects/qgrid-core/public-api.js',
    output: {
      file: './temp/qgrid-core/public-api.js',
      format: 'es',
      plugins: [terser()]
    }
  },
  {
    input: "./projects/qgrid-core/public-api.d.ts",
    output: [
      {
        file: "./temp/qgrid-core/public-api.d.ts", 
        format: "es"
      }
    ],
    plugins: [dts()],
  },
  //qgrid-plugins
  {
    input: './projects/qgrid-plugins/public-api.js',
    output: {
      file: './temp/qgrid-plugins/public-api.js',
      format: 'es',
      plugins: [terser()]
    }
  },
  {
    input: "./projects/qgrid-plugins/public-api.d.ts",
    output: [
      {
        file: "./temp/qgrid-plugins/public-api.d.ts", 
        format: "es"
      }
    ],
    plugins: [dts()],
  }
];