export declare interface StyleRowContext {
	class: (name: string, style?: { [key: string]: any }) => void;
	row: number;
	value: any;
}

export declare interface StyleCellContext {
	class: (name: string, style?: { [key: string]: any }) => void;
	row: number;
	column: number;
	value: any;
}