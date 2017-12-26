import {
	Injectable,
	ComponentFactory,
	ComponentRef,
	Injector
} from '@angular/core';
import { Event } from 'ng2-qgrid/core/infrastructure';

let themeName = '';

@Injectable()
export class ThemeService {
	public changed = new Event();
	public componentFactory: (injector: Injector) => ComponentRef<any>;

	constructor() {}

	get name(): string {
		return themeName;
	}

	set name(value: string) {
		if (value !== themeName) {
			themeName = value;
			this.changed.emit({
				newValue: value,
				oldValue: value
			});
		}
	}
}
