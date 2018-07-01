import {
	Component,
	Optional,
	ContentChild,
	TemplateRef,
	Output,
	EventEmitter,
	OnDestroy,
	ElementRef,
	ChangeDetectionStrategy,
	Inject,
	Injector,
	InjectionToken,
	HostBinding
} from '@angular/core';

import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';

export const BACKDROP_CONTROL_TOKEN = new InjectionToken<BackdropControl>('BACKDROP CONTROL TOKEN');
export interface BackdropControl {
	closeEditor: () => void;
	isBackdropVisible: () => boolean;
}

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackdropComponent {
	isBackdropVisible: () => boolean;

	@ContentChild(TemplateRef) public template: TemplateRef<any>;

	@HostBinding('class.q-grid-backdrop-active') get active() {
		return this.isBackdropVisible();
	}
	@HostBinding('class.q-grid-backdrop-inactive') get inactive() {
		return !this.isBackdropVisible();
	}

	context: { $implicit: BackdropComponent } = {
		$implicit: this
	};

	constructor(element: ElementRef, injector: Injector) {
		const {closeEditor, isBackdropVisible} = injector.get(BACKDROP_CONTROL_TOKEN);
		this.isBackdropVisible = isBackdropVisible;

		const context = {
			element: element.nativeElement,
			onKeyDown: () => { },
			propagate: false
		};

		const backdrop = new BackdropView(context);
		backdrop.closeEvent.on(() => closeEditor());
	}
}