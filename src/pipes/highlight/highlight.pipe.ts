import { Pipe, PipeTransform } from '@angular/core';
import { GRID_PREFIX } from '@grid/view/definition';

@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
	transform(text: string | number, search: string | number): string {
		if ((text || text === 0) && (search || search === 0)) {
			text = text.toString();
			search = search.toString();

			const contains = new RegExp(escapeRegexp(search), 'gi');
			if (contains.test(text)) {
				return text.replace(contains,
					s => `<span class="${GRID_PREFIX}-highlight-part">${htmlEncode(s)}</span>`
				);
			}

			const contained = new RegExp(escapeRegexp(text), 'gi');
			if (contained.test(search)) {
				return `<span class="${GRID_PREFIX}-highlight-part">${htmlEncode(text)}</span>`;
			}
		}

		return htmlEncode(text);
	}
}

function htmlEncode(s: string): string {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function escapeRegexp(text: string): string {
	if (!text) {
		return text;
	}
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
