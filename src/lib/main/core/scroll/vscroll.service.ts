import { VscrollContext } from '../../../common/vscroll/vscroll.context';

export class VScrollService {
	factory(settings) {
		return new VscrollContext(settings);
	}
}
