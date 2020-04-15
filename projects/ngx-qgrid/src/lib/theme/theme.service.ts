import { Injectable } from '@angular/core';
import { Event } from '@qgrid/core/infrastructure/event';

@Injectable()
export class ThemeService {
	private themeName = '';

	changed = new Event();
	component: any;

	constructor() {}

	get name() {
		return this.themeName;
	}

	set name(value: string) {
		if (value !== this.themeName) {
			this.themeName = value;
			this.changed.emit({
				newValue: value,
				oldValue: value
			});
		}
	}
}
