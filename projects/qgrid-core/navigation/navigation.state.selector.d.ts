import { NavigationState } from './navigation.state';
import { ColumnModel } from '../column-type/column.model';

export declare function selectRow(state: NavigationState): any;
export declare function selectColumn(state: NavigationState): ColumnModel;
export declare function selectRowIndex(state: NavigationState): number;
export declare function selectColumnIndex(state: NavigationState): number;
