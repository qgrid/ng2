import { Injectable } from '@angular/core';
import { IVscrollSettings } from './vscroll.settings';
import { VscrollContext } from './vscroll.context';

@Injectable()
export class VscrollService {
	context(settings: IVscrollSettings = {}) {
		const context = new VscrollContext();
		Object.assign(context.settings, settings);
		return context;
	}
}
