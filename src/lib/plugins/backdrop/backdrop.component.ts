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
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackdropComponent extends PluginComponent implements OnDestroy {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();
	private backdrop: BackdropView;

	constructor(root: RootService, element: ElementRef) {
		super(root);

		const context = {
			element: element.nativeElement,
			onKeyDown: () => { }
		};

		this.backdrop = new BackdropView(context);
		this.using(this.backdrop.closeEvent.on(() => this.closeEvent.emit()));
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.backdrop.dispose();
	}
}
