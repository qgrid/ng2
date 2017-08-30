import {Resource} from '../resource/resource';
import {ModeType} from '../selection/selection.model';

export declare class SortModel {
	constructor();
	resource: Resource;
	by: any[];
	mode: ModeType;
	trigger: string[];
}
