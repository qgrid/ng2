import { Injectable } from '@angular/core';
import { VscrollContainer } from './vscroll.container';
import { VscrollSettings, IVscrollSettings } from './vscroll.settings';
import { VscrollContext } from './vscroll.context';

@Injectable()
export class VscrollService {
    factory(settings: IVscrollSettings) {
        const container = new VscrollContainer();
        const options = Object.assign(new VscrollSettings(container), settings);

        container.update(0, true);

        return new VscrollContext(container, options);
    };
}
