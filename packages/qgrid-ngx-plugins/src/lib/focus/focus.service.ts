import { Injectable, Optional } from '@angular/core';
import { FocusAfterRenderService } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Injectable()
export class FocusAfterRender {
	constructor(
		@Optional() plugin: GridPlugin,
	) {
		if (plugin) {
			new FocusAfterRenderService(plugin);
		}
	}
}
