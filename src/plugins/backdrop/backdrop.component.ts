import {
	Component,
	Optional,
	ContentChild,
	TemplateRef,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { BackdropView } from 'ng2-qgrid/plugin/backdrop/backdrop.view';

@Component({
	selector: 'q-grid-backdrop',
	templateUrl: './backdrop.component.html'
})
export class BackdropComponent extends PluginComponent implements OnDestroy {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Output('close') closeEvent = new EventEmitter<any>();
	private backdrop: BackdropView;

	constructor(root: RootService) {
		super(root);

		const backdrop = new BackdropView(this);
		this.using(backdrop.closeEvent.on(() => this.closeEvent.emit());
	}

	ngOnDestroy() {
		this.backdrop.dispose();
	}
}
