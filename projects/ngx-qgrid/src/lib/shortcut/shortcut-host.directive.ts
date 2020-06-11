import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ShortcutService } from './shortcut.service';
import { Disposable } from '../infrastructure/disposable';
import { GridPlugin } from '../plugin/grid-plugin';

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

		const keyDown = (e: KeyboardEvent) => this.shortcutService.keyDown(e);
		window.addEventListener('keydown', keyDown, isPassive);

		const keyUp = (e: KeyboardEvent) => this.shortcutService.keyUp(e);
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
