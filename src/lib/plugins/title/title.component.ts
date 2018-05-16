import { Component, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';

@Component({
	selector: 'q-grid-title',
	templateUrl: './title.component.html'
})
export class TitleComponent extends PluginComponent {
	constructor(root: RootService) {
		super(root);
	}

	public get value() {
		return this.model.grid().title;
	}
}
