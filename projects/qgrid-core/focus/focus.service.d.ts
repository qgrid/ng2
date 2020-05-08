import { Model } from '../model/model';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class FocusService {
    constructor(model: Model);

    activate(rowIndex?: number, columnIndex?: number);
}

export declare class FocusAfterRenderService {
    constructor(plugin: GridPlugin);
}