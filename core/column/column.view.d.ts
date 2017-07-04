import {View} from '../view/view';
import {Model} from "../infrastructure/model";

export declare class ColumnView extends View {
	constructor(model: Model, public service: object);

	updateOn(generation: string): boolean;
}