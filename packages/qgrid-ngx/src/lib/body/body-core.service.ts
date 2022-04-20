import { Injectable } from '@angular/core';
import { RowModelPin } from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';

@Injectable()
export class BodyCoreService {

	constructor(private plugin: GridPlugin) {
	}

	pin: RowModelPin;

	get offsetIndex() {
		switch (this.pin) {
			case "body": return this.plugin.model.row().pinTop.length;
			case "bottom": return this.plugin.model.scene().rows.length - this.plugin.model.row().pinBottom.length;
			default: return 0; 
		}
	}
}