import { OnDestroy, OnInit, Component, ChangeDetectorRef } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action-bar',
	templateUrl: './action-bar.component.html',
	providers: [GridPlugin]
})
export class ActionBarComponent implements OnInit, OnDestroy {
	private shortcutOff: () => void = null;

	context: { $implicit: ActionBarComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		const { model, observeReply } = this.plugin;

		observeReply(model.actionChanged)
			.subscribe(e => {
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
