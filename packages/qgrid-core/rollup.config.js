import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
//import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: './public-api.js',
		output: {
			file: './dist/public-api.js',
			format: 'es',
		},
		plugins: [
			nodeResolve({ preferBuiltins: false, browser: true, }),
			commonjs(),
		]
	},
	{
		input: './public-api.d.ts',
		output: {
			file: './dist/public-api.d.ts',
		},
		plugins: [
			dts()
		],
	}
];