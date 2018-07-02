import { Pipe, PipeTransform } from '@angular/core';

import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { htmlEncode, escapeRegexp } from 'ng2-qgrid/core/utility/kit';

@Pipe({
	name: 'qGridHighlight'
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

		return htmlEncode(text as string);
	}
}
