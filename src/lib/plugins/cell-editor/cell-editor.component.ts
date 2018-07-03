import { PluginService } from './../plugin.service';
import {
	Component,
	TemplateRef,
	ContentChild,
	EventEmitter,
	Output,
	Injector,
	ReflectiveInjector
} from '@angular/core';
import { BackdropComponent, BACKDROP_CONTROL_TOKEN } from '../backdrop/backdrop.component';
import { BackdropService } from '../backdrop/backdrop.service';

@Component({
	selector: 'q-grid-cell-editor',
	templateUrl: './cell-editor.component.html',
	providers: [BackdropService]
})
export class CellEditorComponent {
	@Output('close') closeEvent = new EventEmitter<any>();
	@ContentChild(TemplateRef) template: TemplateRef<any>;

	backdropComponent = BackdropComponent;
	backdropInjector: Injector;
	backdropControl: any;

	constructor(public backdropService: BackdropService, injector: Injector) {
		this.backdropControl = {
			backdropService,
			closeEditor: () => this.close()
		};

		this.backdropInjector =
			ReflectiveInjector.resolveAndCreate([{ provide: BACKDROP_CONTROL_TOKEN, useValue: this.backdropControl }], injector);
	}

	context: { $implicit: CellEditorComponent } = {
		$implicit: this
	};

	close() {
		this.closeEvent.emit();
	}
}
