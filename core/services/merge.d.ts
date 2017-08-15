﻿export interface IMergeResult {
	(left: any[], right: any[], result: any[]): IMergeResultObject;
}

export interface IMergeResultObject {
	updated: number;
	removed: number;
	inserted: number;
}

export interface ISettings {
	equals: (l: any, r: any) => boolean;
	update: (l: any, r: any, left: any[], i: number) => void;
	remove: (l: any, left: any, i: number) => void;
	insert: (r: any, left: any) => void;
}

export declare function merge(settings: ISettings): IMergeResult;