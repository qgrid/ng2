import {Model} from '../infrastructure/model';

export interface IEditorOptions {
	trigger: string;
	modelFactory: () => Model;
	label: any;
	fetch: any;
	value: any;
}

export interface IValue {
	(row: any, value?: any): any;
}

export interface ILabel {
	(row: any, value?: any): any;
}

export declare class ColumnModel {
	constructor(type?: string);

	type: string;
	key: string;
	title: string;
	value: IValue;
	$value: IValue;
	path: string;
	pin: string;
	origin: string;
	source: string;
	class: string;
	editor: string;
	editorOptions: IEditorOptions;
	width: number;
	minWidth: number;
	maxWidth: number;
	canEdit: boolean;
	canResize: boolean;
	canSort: boolean;
	canMove: boolean;
	canFilter: boolean;
	canHighlight: boolean;
	canFocus: boolean;
	isVisible: boolean;
	index: number;
	label: ILabel;
	$label: ILabel;
}
