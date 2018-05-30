import { Injectable } from '@angular/core';
import { Event } from 'ng2-qgrid/core/infrastructure/event';

@Injectable()
export class ThemeService {
	private themeName = '';

	public changed = new Event();
	public component: any;

	constructor() {}

	get name(): string {
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
