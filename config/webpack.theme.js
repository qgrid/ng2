
const helpers = require('./helpers');
const ThemePlugin = require('./theme');

module.exports = {
	entry: {
		main: helpers.root('out-tsc/src/theme/material/templates/index.ts')
	},
	output: {
		path: helpers.root('out-tsc/src/theme/material/templates/'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'raw-loader'
			}
		]
	},
	plugins: [
		new ThemePlugin({
			path: helpers.root('out-tsc/src/theme/material/templates'),
			outputPath: helpers.root('out-tsc/src/theme/material/theme.component.gen.html'),
			pattern: /.*\.tpl\.html/
		})
	]
};
