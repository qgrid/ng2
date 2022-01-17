import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	{
		input: './public-api.js',
		output: {
			file: './dist/public-api.js',
			format: 'es',
			name: "@qgrid/core",
			plugins: [commonjs(), nodeResolve() /* terser(), */]
		}
	},
	// {
	// 	input: "./public-api.d.ts",
	// 	output: [
	// 		{
	// 			file: "./dist/public-api.d.ts",
	// 			format: "es",
	// 			name: "@qgrid/core"
	// 		}
	// 	],
	// 	plugins: [dts()],
	// },
];