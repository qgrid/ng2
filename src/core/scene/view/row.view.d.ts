export interface RowViewPosition {
	readonly index: number;
}

export interface RowView extends RowViewPosition {
	readonly model: any;
}