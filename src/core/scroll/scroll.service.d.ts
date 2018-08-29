import { Bag } from '../dom/bag';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare class ScrollService {
    constructor(model: Model, table: Table, bag: Bag, view: any);

    start(): void;
    stop(): void;
    invalidate(): void; 
}
