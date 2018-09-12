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
} from '@angular/core';
import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';
import { BackdropService } from './backdrop.service';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackdropComponent implements OnDestroy {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	context: { $implicit: BackdropComponent } = {
		$implicit: this
	};

	constructor(private backdropService: BackdropService, element: ElementRef) {
		backdropService.element = element;

		const context = {
			element: element.nativeElement,
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
