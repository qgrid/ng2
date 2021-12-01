import { ColumnModel } from '../column-type/column.model';

export declare interface Td {
    // @deprecated
    readonly element: HTMLElement;

	readonly value: any;
	readonly label: any;

    readonly columnIndex: number;
    readonly rowIndex: number;
    readonly column: ColumnModel;
	readonly row: any;

	mode(value: string): void;
}
