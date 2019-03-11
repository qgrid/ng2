import {
	Component,
	TemplateRef,
	Output,
	EventEmitter,
	OnDestroy,
	ElementRef,
	ChangeDetectionStrategy,
	ViewChild
} from '@angular/core';
import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';
import { BackdropService } from './backdrop.service';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html'
})
export class BackdropComponent implements OnDestroy {
	@ViewChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: BackdropComponent } = {
		$implicit: this
	};

	constructor(private backdropService: BackdropService, elementRef: ElementRef) {
		backdropService.element = elementRef;

		const context = {
			element: elementRef.nativeElement,
			onKeyDown: () => { },
			propagate: false
		};

		const backdrop = new BackdropView(context);
		backdrop.closeEvent.on(() => this.closeEvent.emit());
	}

	ngOnDestroy() {
		this.backdropService.element = null;
	}
}
