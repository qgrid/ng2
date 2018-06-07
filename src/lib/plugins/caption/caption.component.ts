import { Component, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';

@Component({
	selector: 'q-grid-caption',
	templateUrl: './caption.component.html'
})
export class CaptionComponent extends PluginComponent {
	constructor(root: RootService) {
		super(root);
	}

	public get value() {
		const { caption, title } = this.model.grid()
		return caption || title;
	}
}
