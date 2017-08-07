import {View} from '../view/view';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {GridService} from "../services/grid";
import {ColumnModel} from "../column-type/column.model";

export declare class LayoutView extends View {
	constructor(model: Model, public table: Table, public service: GridService);

	onInit(): void;

	get form(): ColumnModel;

	invalidateColumns(form: object): void;

	destroy(): void;

	get styleId(): string;
}