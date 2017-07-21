import {View} from '../view/view';
import {ColumnModel} from "../column-type/column.model";

export declare class LayoutView extends View {
	constructor();
	onInit(): void;
	readonly form: ColumnModel;
	invalidateColumns(form: object): void;
	destroy(): void;
	readonly styleId: string;
}
