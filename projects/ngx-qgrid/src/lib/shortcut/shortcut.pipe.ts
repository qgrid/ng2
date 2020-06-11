import { Pipe, PipeTransform } from '@angular/core';
// import { SHORTCUT_SEPARATOR, SHORTCUT_KEY_SEPARATOR } from './shortcut.service';

@Pipe({
	name: 'qGridShortcut',
})
export class ShortcutPipe implements PipeTransform {
	transform(value: string): string {
		// if (value) {
		// 	return '' + value
		// 		.split(SHORTCUT_SEPARATOR)
		// 		.map(shct => shct
		// 			.split(SHORTCUT_KEY_SEPARATOR)
		// 			.map(key => `<span class="q-grid-shortcut-key">${key}</span>`)
		// 			.join(SHORTCUT_KEY_SEPARATOR)
		// 		)
		// 		.join(', ');
		// }

		return '';
	}
}
