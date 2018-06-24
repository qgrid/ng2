import { VscrollContext } from '../../../common/vscroll/vscroll.context';

export class VScrollService {
	constructor() {
	}

	factory(settings) {
		return new VscrollContext(settings);
	}
}
