import {
	Component,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
	Injector,
	ReflectiveInjector
} from '@angular/core';
import { BackdropComponent, EDITOR } from '../backdrop/backdrop.component';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html'
})
export class CellEditorComponent {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();

	backdrop = BackdropComponent;
	backdropInjector: Injector;
	backdropHandler = {
		isVisible: () => this.isBackdropVisible(),
		open: () => this.openBackdrop(),
		close: () => this.closeBackdrop()
	};

	constructor(private injector: Injector) {
		const editorTrigger = {
			close: () => this.close()
		};

		this.backdropInjector = ReflectiveInjector.resolveAndCreate([{ provide: EDITOR, useValue: editorTrigger }], injector);
	}

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	close() {
		this.closeEvent.emit();
	}

	closeBackdrop() {
		this.backdrop = null;
	}

	openBackdrop() {
		this.backdrop = BackdropComponent;
	}

	isBackdropVisible() {
		return this.backdrop !== null;
	}
}