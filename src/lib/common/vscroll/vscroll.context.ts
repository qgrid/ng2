import { VscrollContainer } from './vscroll.container';
import { VscrollSettings, IVscrollSettings } from './vscroll.settings';

export class VscrollContext {
	settings: IVscrollSettings;
	container: VscrollContainer;

	constructor(settings?: IVscrollSettings) {
		this.settings = new VscrollSettings(() => this.container.total);
		if (settings) {
			Object.assign(this.settings, settings);
		}

		this.container = new VscrollContainer(this.settings);
	}

	id(index: number) {
		return index;
	}
}
