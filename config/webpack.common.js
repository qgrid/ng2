/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const ThemePlugin = require('./theme');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ngcWebpack = require('ngc-webpack');


/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
	title: 'q-grid',
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

// TODO: make it configurable
const THEME_PATH = helpers.root('src/themes/material');

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
	isProd = options.env === 'production';
	return {
		/*
		 * Cache generated modules and chunks to improve performance for multiple incremental builds.
		 * This is enabled by default in watch mode.
		 * You can pass false to disable it.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#cache
		 */
		//cache: false,

		/*
		 * The entry point for the bundle
		 * Our Angular.js app
		 *
		 * See: http://webpack.github.io/docs/configuration.html#entry
		 */
		entry: {

			'polyfills': './demo/polyfills.browser.ts',
			'main': AOT ? './src/grid.module.ts' : './demo/main.browser.ts'

		},

		/*
		 * Options affecting the resolving of modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve
		 */
		resolve: {

			/*
			 * An array of extensions that should be used to resolve modules.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
			 */
			extensions: ['.ts', '.js', '.json'],

			// An array of directory names to be resolved to the current directory
			modules: [helpers.root('node_modules')],

			alias: {
				'ng2-qgrid/core': helpers.root('core'),
				'ng2-qgrid': helpers.root('src')
			}
		},

		/*
		 * Options affecting the normal modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module
		 */
		module: {

			rules: [

				/*
				 * Typescript loader support for .ts
				 *
				 * Component Template/Style integration using `angular2-template-loader`
				 * Angular 2 lazy loading (async routes) via `ng-router-loader`
				 *
				 * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
				 * order of the loader matter.
				 *
				 * See: https://github.com/TheLarkInn/angular2-template-loader
				 * See: https://github.com/shlomiassaf/ng-router-loader
				 */
				{
					test: /\.ts$/,
					use: [
						{
							loader: '@angularclass/hmr-loader',
							options: {
								pretty: !isProd,
								prod: isProd
							}
						},
						{ // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
							loader: 'ng-router-loader',
							options: {
								loader: 'async-import',
								genDir: 'compiled',
								aot: AOT
							}
						},
						{
							loader: 'ts-loader'
						},
						{
							loader: 'angular2-template-loader'
						}
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},

				//TODO: get rid of babel when core will be compiled
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},

				/*
				 * Json loader support for *.json files.
				 *
				 * See: https://github.com/webpack/json-loader
				 */
				{
					test: /\.json$/,
					use: 'json-loader'
				},

				/*
				 * to string and css loader support for *.css files (from Angular components)
				 * Returns file content as string
				 *
				 */
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					exclude: [helpers.root('demo', 'styles')]
				},

				/*
				 * to string and sass loader support for *.scss files (from Angular components)
				 * Returns compiled css content as string
				 *
				 */
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					exclude: [helpers.root('demo', 'styles')]
				},

				/* Raw loader support for *.html
				 * Returns file content as string
				 *
				 * See: https://github.com/webpack/raw-loader
				 */
				{
					test: /\.html$/,
					use: 'raw-loader',
					exclude: [helpers.root('demo/index.html')]
				},

				/*
				 * File loader for supporting images, for example, in CSS files.
				 */
				{
					test: /\.(jpg|png|gif)$/,
					use: 'file-loader'
				},

				/* File loader for supporting fonts, for example, in CSS files.
				 */
				{
					test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
					use: 'file-loader'
				}

			],

		},

		/*
		 * Add additional plugins to the compiler.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#plugins
		 */
		plugins: [
			new ThemePlugin({
				path: helpers.root('src/themes/material/templates'),
				outputPath: helpers.root('src/themes/material/theme.component.gen.html'),
				pattern: /.*\.tpl\.html/
			}),
			new CircularDependencyPlugin({
				// exclude detection of files based on a RegExp
				exclude: /node_modules/,
				// add errors to webpack instead of warnings
				failOnError: true,
				// override `exclude` and `failOnError` behavior
				// `onDetected` is called for each module that is cyclical
				onDetected({paths, compilation}) {
					// `paths` will be an Array of the relative module paths that make up the cycle
					compilation.errors.push(new Error(paths.join(' -> ')))
				}
			}),

			new AssetsPlugin({
				path: helpers.root('dist'),
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/**
			 * Plugin: ContextReplacementPlugin
			 * Description: Provides context to Angular's use of System.import
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
			 * See: https://github.com/angular/angular/issues/11580
			 */
			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)@angular/,
				helpers.root('demo'), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),

			/*
			 * Plugin: CopyWebpackPlugin
			 * Description: Copy files and directories in webpack.
			 *
			 * Copies project static assets.
			 *
			 * See: https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([
				//{from: 'demo/assets', to: 'assets'},
				{from: 'demo/meta'}
			]),


			/*
			 * Plugin: HtmlWebpackPlugin
			 * Description: Simplifies creation of HTML files to serve your webpack bundles.
			 * This is especially useful for webpack bundles that include a hash in the filename
			 * which changes every compilation.
			 *
			 * See: https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				template: 'demo/index.html',
				title: METADATA.title,
				chunksSortMode: 'dependency',
				metadata: METADATA,
				inject: 'head'
			}),

			/*
			 * Plugin: ScriptExtHtmlWebpackPlugin
			 * Description: Enhances html-webpack-plugin functionality
			 * with different deployment options for your scripts including:
			 *
			 * See: https://github.com/numical/script-ext-html-webpack-plugin
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			}),

			/*
			 * Plugin: HtmlElementsPlugin
			 * Description: Generate html tags based on javascript maps.
			 *
			 * If a publicPath is set in the webpack output configuration, it will be automatically added to
			 * href attributes, you can disable that by adding a "=href": false property.
			 * You can also enable it to other attribute by settings "=attName": true.
			 *
			 * The configuration supplied is map between a location (key) and an element definition object (value)
			 * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
			 *
			 * Example:
			 *  Adding this plugin configuration
			 *  new HtmlElementsPlugin({
			 *    headTags: { ... }
			 *  })
			 *
			 *  Means we can use it in the template like this:
			 *  <%= webpackConfig.htmlElements.headTags %>
			 *
			 * Dependencies: HtmlWebpackPlugin
			 */
			new HtmlElementsPlugin({
				headTags: require('./head-config.common')
			}),

			/**
			 * Plugin LoaderOptionsPlugin (experimental)
			 *
			 * See: https://gist.github.com/sokra/27b24881210b56bbaff7
			 */
			new LoaderOptionsPlugin({}),

			// Fix Angular 2
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)async/,
				helpers.root('node_modules/@angular/core/src/facade/async.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)collection/,
				helpers.root('node_modules/@angular/core/src/facade/collection.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)errors/,
				helpers.root('node_modules/@angular/core/src/facade/errors.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)lang/,
				helpers.root('node_modules/@angular/core/src/facade/lang.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)math/,
				helpers.root('node_modules/@angular/core/src/facade/math.js')
			),

			new ngcWebpack.NgcWebpackPlugin({
				disabled: !AOT,
				tsConfigPath: helpers.root('tsconfig.prod.json'),
				resourceOverride: helpers.root('config/resource-override.js')
			})
		],

		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
}
