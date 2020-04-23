import { Injectable } from '@angular/core';
import { VscrollContext } from '../vscroll/vscroll.context';
import { IVscrollSettings } from '../vscroll/vscroll.settings';
import { IVscrollContainer } from '../vscroll/vscroll.container';

@Injectable()
export class ScrollService {
	factory(settings: IVscrollSettings): {
		container: IVscrollContainer,
		settings: IVscrollSettings,
		id: (index: number) => number
	} {
		return new VscrollContext(settings);
	}
}
