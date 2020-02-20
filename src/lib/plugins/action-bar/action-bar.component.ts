import { OnDestroy, OnInit, Component, ChangeDetectorRef } from '@angular/core';
import { Action } from 'ng2-qgrid/core/action/action';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-action-bar',
	templateUrl: './action-bar.component.html',
	providers: [PluginService]
})
export class ActionBarComponent implements OnInit, OnDestroy {
	private shortcutOff: () => void = null;

	context: { $implicit: ActionBarComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private cd: ChangeDetectorRef) {
	}

	ngOnInit() {
		const { model } = this.plugin;

		model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				if (this.shortcutOff) {
					this.shortcutOff();
					this.shortcutOff = null;
				}

				const { shortcut, manager } = model.action();
				this.shortcutOff = shortcut.register(manager, e.state.items.map(act => act.command));

				this.cd.markForCheck();
				this.cd.detectChanges();
			}
		});
	}

	get actions(): Action[] {
		return this.plugin.model.action().items;
	}

	ngOnDestroy() {
		if (this.shortcutOff) {
			this.shortcutOff();
			this.shortcutOff = null;
		}
	}
}
