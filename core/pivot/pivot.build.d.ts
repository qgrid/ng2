import {IMapResult} from '../column/column.service';
import {IValueFactory} from '../services/value';
import {IPivot} from '../pipe/pipe.item';

export declare function build(columnMap: IMapResult, pivotBy: any[], valueFactory: IValueFactory): IPivot;
