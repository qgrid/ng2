import * as markup from './markup';
import cssEscape from 'css.escape';

export const escape = cssEscape;

export function sheet(id) {
	let sheet = document.getElementById(id);
	const getSheet = () => {
		if (!sheet) {
			sheet = document.createElement('style');
			sheet.type = 'text/css';
			sheet.id = id;
			document.getElementsByTagName('head')[0].appendChild(sheet);
		}

		return sheet;
	};

	return {
		set: css => {
			const sheet = getSheet();
			sheet.innerHTML = markup.build(css);
		},
		remove: () => {
			if (sheet) {
				sheet.parentNode.removeChild(sheet);
			}
		}
	};
}

export function escapeClass(name) {
	return cssEscape(name.replace(/ /g, '_'));
}