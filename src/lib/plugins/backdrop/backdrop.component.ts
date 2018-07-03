import { PluginService } from './../plugin.service';
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
	Injector,
	ReflectiveInjector,
	forwardRef,
	Inject,
	ViewContainerRef,
	InjectionToken
} from '@angular/core';

import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';
import { BackdropService } from './backdrop.service';

export const BACKDROP_CONTROL_TOKEN = new InjectionToken<any>('BACKDROP SERVICE');

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

	constructor(vcREf: ViewContainerRef, private injector: Injector, element: ElementRef) {
		const {backdropService, closeEditor} = injector.get(BACKDROP_CONTROL_TOKEN);

		const context = {
			element: element.nativeElement,
			onKeyDown: () => { },
			propagate: false
		};

		const backdrop = new BackdropView(context);
		backdrop.closeEvent.on(() => closeEditor());

		if (backdropService) {
			backdropService.element = element.nativeElement;
		}
	}
}
