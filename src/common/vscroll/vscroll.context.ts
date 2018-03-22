import { VscrollContainer } from './vscroll.container';
import { IVscrollSettings } from './vscroll.settings';

export class VscrollContext {
	constructor(public container: VscrollContainer, public settings: IVscrollSettings) {
	}
}
