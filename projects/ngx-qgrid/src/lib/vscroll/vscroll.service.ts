import { Injectable } from '@angular/core';
import { IVscrollSettings } from '@qgrid/core/scroll/scroll.let';
import { VscrollContext } from './vscroll.context';

@Injectable()
export class VscrollService {
	context(settings: Partial<IVscrollSettings> = {}) {
		const context = new VscrollContext();
		Object.assign(context.settings, settings);

		return context;
	}
}
