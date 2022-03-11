import { IVscrollContext, IVscrollSettings } from '@qgrid/core';
import { VscrollContainer } from './vscroll.container';
import { VscrollSettings } from './vscroll.settings';

export class VscrollContext implements IVscrollContext {
	settings: IVscrollSettings;
	container: VscrollContainer;

	constructor(settings?: Partial<IVscrollSettings>) {
		this.settings = new VscrollSettings(() => this.container.count);
		if (settings) {
			Object.assign(this.settings, settings);
		}

		this.container = new VscrollContainer(this.settings);
	}

	id(index: number) {
		return index;
	}
}
