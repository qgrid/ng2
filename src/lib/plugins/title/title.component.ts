import { Component, Optional } from '@angular/core';
import { PluginService } from '../plugin.service';

// @depricated
@Component({
	selector: 'q-grid-title',
	templateUrl: './title.component.html',
	providers: [PluginService]
})
export class TitleComponent {
	context: { $implicit: TitleComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	public get value() {
		return this.plugin.model.grid().title;
	}
}
