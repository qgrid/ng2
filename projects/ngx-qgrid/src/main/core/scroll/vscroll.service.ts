import { VscrollContext } from '../../../common/vscroll/vscroll.context';
import { IVscrollSettings } from '../../../common/vscroll/vscroll.settings';
import { IVscrollContainer } from '../../../common/vscroll/vscroll.container';
import { Injectable } from "@angular/core";

@Injectable()
export class VScrollService {
	factory(settings: IVscrollSettings): {
		container: IVscrollContainer,
		settings: IVscrollSettings,
		id: (index: number) => number
	} {
		return new VscrollContext(settings);
	}
}
