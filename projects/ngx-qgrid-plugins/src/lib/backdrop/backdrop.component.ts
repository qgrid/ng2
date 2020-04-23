import {
	Component,
	TemplateRef,
	Output,
	EventEmitter,
	OnDestroy,
	ElementRef,
	ViewChild,
	Input,
	OnInit
} from '@angular/core';
import { BackdropPlugin } from '@qgrid/plugins/backdrop/backdrop.plugin';
import { BackdropService } from './backdrop.service';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html'
})
export class BackdropComponent implements OnInit, OnDestroy {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();
	@Input() propagate = true;

	context: { $implicit: BackdropComponent } = {
		$implicit: this
	};

	constructor(private backdropService: BackdropService, elementRef: ElementRef) {
		backdropService.element = elementRef;
	}

	ngOnInit() {
		const context = {
			element: this.backdropService.element.nativeElement,
			propagate: this.propagate,
			onKeyDown: () => { },
		};

		const backdrop = new BackdropPlugin(context);
		backdrop.closeEvent.on(() => this.closeEvent.emit());
	}

	ngOnDestroy() {
		this.backdropService.element = null;
	}
}
