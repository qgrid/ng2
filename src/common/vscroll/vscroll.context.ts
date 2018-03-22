import { VscrollContainer } from './vscroll.container';
import { VscrollSettings } from './vscroll.settings';

export class VscrollContext {
    constructor(public container: VscrollContainer, public settings: VscrollSettings) {
    }
}
