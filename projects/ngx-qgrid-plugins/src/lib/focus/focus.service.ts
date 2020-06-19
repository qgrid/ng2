import { Injectable, Optional } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { FOCUS_AFTER_RENDER_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';

@Injectable()
export class FocusAfterRender {
	constructor(
		@Optional() plugin: GridPlugin,
	) {
		if (plugin) {
			const { commandPalette } = plugin;
			const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
			focusAfterRender.execute();
		}
	}
}
