import {Resource} from '../resource/resource';

export interface IToolbarObj {
	top: boolean;
	bottom: boolean;
	right: boolean;
	left: boolean;
}

export interface IPinObj {
	left: boolean;
	right: boolean;
}

export declare class VisibilityModel {
	constructor();

	resource: Resource;
	head: boolean;
	foot: boolean;
	body: boolean;
	toolbar: IToolbarObj
	pin: IPinObj;
	plugin: object;
}