import { Model } from '../infrastructure/model';

export declare class FocusService {
    constructor(model: Model);

    activate(rowIndex?: number, columnIndex?: number);
}