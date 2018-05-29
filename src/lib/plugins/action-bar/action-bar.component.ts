import { OnDestroy, OnInit, Optional, Component } from '@angular/core';
import { Action } from 'ng2-qgrid/core/action/action';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-action-bar',
	templateUrl: './action-bar.component.html'
})
export class ActionBarComponent extends PluginComponent
	implements OnInit, OnDestroy {

	private shortcutOff: () => void = null;

	constructor(@Optional() root: RootService) {
		super(root);
	}

	onReady() {
		const shortcut = this.model.action().shortcut;
		this.model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				if (this.shortcutOff) {
					this.shortcutOff();
					this.shortcutOff = null;
				}

				this.shortcutOff = shortcut.register(
					this.root.commandManager,
					e.state.items.map(act => act.command)
				);
			}
		})
	}

	get actions(): Action[] {
		return this.model.action().items;
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		if (this.shortcutOff) {
			this.shortcutOff();
			this.shortcutOff = null;
		}
	}
}
