import { Injectable } from '@angular/core';
import { IVscrollSettings } from '@qgrid/core';
import { VscrollContext } from './vscroll.context';

@Injectable()
export class VscrollService {
  context(settings: Partial<IVscrollSettings> = {}): VscrollContext {
    const context = new VscrollContext();
    Object.assign(context.settings, settings);

    return context;
  }
}
