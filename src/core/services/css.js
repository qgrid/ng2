import * as markup from './markup';
import cssEscape from 'css.escape';

export function sheet(id, source) {
	const sheetId = `${id}-${source}`;
	let sheet = document.getElementById(sheetId);
	const getSheet = () => {
		if (!sheet) {
			sheet = document.createElement('style');
			sheet.type = 'text/css';
			sheet.id = escapeAttr(sheetId);
			document.getElementsByTagName('head')[0].appendChild(sheet);
		}

		return sheet;
	};

	return {
		set: css => {
			const sheet = getSheet();
			const lines = markup.buildLines(css);
			const styleId = `#${escape(id)}`;
			sheet.innerHTML = lines.map(line => `${styleId} ${line}`).join('\n');
		},
		remove: () => {
			if (sheet) {
				sheet.parentNode.removeChild(sheet);
			}
		}
	};
}

export function escapeAttr(name) {
	return ('' + name).replace(/\s|\t|\n|"|'/g, '_');
}

export function escape(name) {
	return cssEscape(escapeAttr(name));
}
