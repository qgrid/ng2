import {Resource} from '../resource/resource';
import {IIdentityResult} from '../utility/utility';
import {Command} from '../command/command';

export declare type UnitType = 'row' | 'cell' | 'column' | 'mix';
export declare type ModeType = 'single' | 'mutiple' | 'range';
export declare type AreaType = 'body' | 'custom';

export interface IKeyObj{
	row: IIdentityResult;
	column: IIdentityResult;
}

export declare class SelectionModel {
	constructor();

	resource: Resource;
	unit: UnitType;
	mode: ModeType;
	items: any[];
	key: IKeyObj;
	area: AreaType;
	toggle: Command;
}