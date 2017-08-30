import {Resource} from '../resource/resource';

export interface IToolbar {
	top: boolean;
	bottom: boolean;
	right: boolean;
	left: boolean;
}

export interface IPin {
	left: boolean;
	right: boolean;
}

export declare class VisibilityModel {
	constructor();

	resource: Resource;
	head: boolean;
	foot: boolean;
	body: boolean;
	toolbar: IToolbar;
	pin: IPin;
	plugin: object;
}
