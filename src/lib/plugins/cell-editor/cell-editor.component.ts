import {
	Component,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
	Injector,
	ReflectiveInjector,
	Input
} from '@angular/core';
import { BackdropComponent, BACKDROP_CONTROL_TOKEN } from '../backdrop/backdrop.component';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent {
	@Input('backdropVisible') backdropVisible: boolean = true;
	@Output('close') closeEvent = new EventEmitter<any>();

	@ContentChild(TemplateRef) public template: TemplateRef<any>;

	backdrop = BackdropComponent;
	backdropInjector: Injector;
	backdropControl = {
		isBackdropVisible: () => this.backdropVisible,
		closeEditor: () => this.close()
	};

	constructor(private injector: Injector) {
		this.backdropInjector =
			ReflectiveInjector.resolveAndCreate([{ provide: BACKDROP_CONTROL_TOKEN, useValue: this.backdropControl }], this.injector);
	}

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	hideBackdrop() {
		this.backdropVisible = false;
	}

	revealBackdrop() {
		this.backdropVisible = true;
	}

	close() {
		this.closeEvent.emit();
	}
}