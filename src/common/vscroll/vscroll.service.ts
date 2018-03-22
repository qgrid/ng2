import { Injectable } from '@angular/core';
import { VscrollContainer } from './vscroll.container';
import { VscrollSettings, IVscrollSettings } from './vscroll.settings';
import { VscrollContext } from './vscroll.context';

@Injectable()
export class VscrollService {
	context(settings: IVscrollSettings) {
		const container = new VscrollContainer(settings);
		Object.assign(settings, new VscrollSettings(container));

		container.update(0, true);

		return new VscrollContext(container, settings);
	}
}
