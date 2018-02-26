import { OnDestroy, OnInit, Optional, Component } from '@angular/core';
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

	ngOnInit() {
		const shortcut = this.model.action().shortcut;
		this.using(
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
		);
	}

	get actions() {
		return this.model.action().items;
	}

	ngOnDestroy() {
		if (this.shortcutOff) {
			this.shortcutOff();
			this.shortcutOff = null;
		}
	}
}
