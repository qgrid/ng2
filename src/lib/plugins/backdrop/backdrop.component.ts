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
} from '@angular/core';

import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';

export const EDITORTRIGGER = new InjectionToken<any>('EDITORTRIGGER');

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackdropComponent {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: BackdropComponent } = {
		$implicit: this
	};

	constructor(element: ElementRef, injector: Injector) {
		const editorTrigger = injector.get(EDITORTRIGGER);

		const context = {
			element: element.nativeElement,
			onKeyDown: () => { },
			propagate: false
		};

		const backdrop = new BackdropView(context);
		backdrop.closeEvent.on(() => editorTrigger.close());
	}
}