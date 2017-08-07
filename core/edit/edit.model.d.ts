import {Resource} from '../resource/resource';
import {Command} from '../infrastructure/command';

export declare type ModeType = 'cell' | 'row';
export declare type StateType = 'view' | 'edit';

export interface ICommitShortcuts {
	'$default': string,
	'date': string,
	'array': string,
	'reference': string,
	'email': string,
	'file': string,
	'image': string
}

export declare class EditModel {
	constructor();

	resource: Resource;
	mode: ModeType// cell | row
	state: StateType; // view | edit
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	commitShortcuts: ICommitShortcuts;
}