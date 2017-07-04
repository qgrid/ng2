import {Resource} from '../resource/resource';

export declare type SingleOrMulipleMode = 'single' | 'multiple';

export declare type  DataOrDetailsUnit = 'data' | 'details';

export declare class RowModel {
	constructor();

	resource: Resource;

	mode: SingleOrMulipleMode; //single|multiple
	unit: DataOrDetailsUnit; //data|details
	height: number;
	status: Map;
}