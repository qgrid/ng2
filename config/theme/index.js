const fs = require('fs');
const path = require('path');

class ThemePlugin {
	constructor(settings) {
		this.settings = Object.assign({
			encoding: 'utf-8'
		}, settings);
	}

	apply(compiler) {
		const settings = this.settings;
		compiler.plugin('compile', (compilation) => {
			console.info('theme: compile');
			const files = fs.readdirSync(settings.path);
			const content = files
				.filter(f => f.match(settings.pattern))
				.map(f => {
					const p = path.join(settings.path, f);
					console.info(`read: ${p}`);
					return fs.readFileSync(p, {encoding: settings.encoding});
				})
				.join('');

			console.info(`write: ${settings.outputPath}`);

			if (!fs.existsSync(settings.outputPath) || fs.readFileSync(settings.outputPath, {encoding:settings.encoding}) !== content) {
				fs.writeFileSync(settings.outputPath, content);
			}
		});
	};
}

module.exports = ThemePlugin;
