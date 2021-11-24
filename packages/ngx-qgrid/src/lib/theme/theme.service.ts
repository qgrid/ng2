import { Injectable } from '@angular/core';
import { Event } from '@qgrid/core/event/event';

export interface ThemeNameChangeEventArg {
	oldName: string;
	newName: string;
}

@Injectable()
export class ThemeService {
	private themeName = '';

	changed = new Event<ThemeNameChangeEventArg>();
	component: any;

	constructor() { }

	get name() {
		return this.themeName;
	}

	set name(value: string) {
		if (value !== this.themeName) {
			const oldName = this.themeName;
			const newName = value;

			this.changed.emit({ oldName, newName });
		}
	}
}
