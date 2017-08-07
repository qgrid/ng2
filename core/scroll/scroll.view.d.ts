import {View} from '../view/view';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {Vscroll} from "..src//view/services/";
import {GridService} from "../services/grid";
import {SingleOrMulipleMode} from "../row/row.model";

export declare class ScrollView extends View {
	constructor(model: Model, public table: Table, public vscroll: Vscroll, gridService: GridService);

	invalidate(): void;

	readonly mode: SingleOrMulipleMode;
}