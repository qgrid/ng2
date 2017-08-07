import {View} from '../view/view';
import {SingleOrMultipleMode} from '../row/row.model';

export declare class ScrollView extends View {
	constructor();
	invalidate(): void;
	readonly mode: SingleOrMultipleMode;
}