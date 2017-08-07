import {Resource} from '../resource/resource';
import {SingleOrMulipleMode} from "../row/row.model";

export declare class SortModel {
	constructor();

	resource: Resource;
	by: any[];
	mode: SingleOrMulipleMode;
	trigger: string[];
}