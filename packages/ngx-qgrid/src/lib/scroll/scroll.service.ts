import { Injectable } from '@angular/core';
import { IVscrollContext, IVscrollSettings } from '@qgrid/core';
import { VscrollContext } from '../vscroll/vscroll.context';

@Injectable()
export class ScrollService {
	factory(settings: IVscrollSettings): IVscrollContext {
		return new VscrollContext(settings);
	}
}
