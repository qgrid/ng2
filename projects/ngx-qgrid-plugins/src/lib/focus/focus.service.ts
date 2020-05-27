import { Injectable, Optional } from '@angular/core';
import { FocusAfterRenderService } from '@qgrid/core/focus/focus.service';
import { GridPlugin } from '@qgrid/ngx';

@Injectable()
export class FocusAfterRender {
	constructor(
		@Optional() plugin: GridPlugin,
	) {
		if (plugin) {
			// tslint:disable-next-line:no-unused-expression
			new FocusAfterRenderService(plugin);
		}
	}
}
