import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ShortcutService } from './shortcut.service';
import { Disposable } from '../infrastructure/disposable';
import { GridPlugin } from '../plugin/grid-plugin';
import { Keyboard } from '@qgrid/core/keyboard/keyboard';

@Directive({
	selector: '[q-grid-shortcut-host]',
	providers: [
		ShortcutService,
		// We need to create a new instance of plugin
		// to child elements have correct shortcut service
		GridPlugin
	]
})
export class ShortcutHostDirective implements OnInit {
	@Input('q-grid-shortcut-host')
	hostType: 'document' | 'self' = 'self';

	// tslint:disable-next-line:no-input-rename
	@Input('q-grid-shortcut-host-mode')
	mode: 'passive' | 'active' = 'active';

	constructor(
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		public shortcutService: ShortcutService
	) { }

	ngOnInit() {
		const { disposable } = this.plugin;

		const element =
			this.hostType === 'document'
				? document : this.elementRef.nativeElement;

		const isPassive = this.mode === 'passive';

		const keyDown = (e: KeyboardEvent) => {
			const code = Keyboard.translate(e.code);
			if (this.shortcutService.keyDown(code)) {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		};

		window.addEventListener('keydown', keyDown, isPassive);

		const keyUp = (e: KeyboardEvent) => {
			const code = Keyboard.translate(e.code);
			this.shortcutService.keyUp(code);
		};

		element.addEventListener('keyup', keyUp, isPassive);

		const focusOut = () => this.shortcutService.reset();
		element.addEventListener('focusout', focusOut);
		window.addEventListener('blur', focusOut);

		disposable.add(() => {
			element.removeEventListener('keydown', keyDown);
			element.removeEventListener('keyup', keyUp);
			element.removeEventListener('focusout', focusOut);
			window.removeEventListener('blur', focusOut);
		});
	}
}
