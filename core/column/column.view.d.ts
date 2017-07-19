import {View} from '../view/view';
import {GenerationMode} from '../column-list/column.list.model';

export declare class ColumnView extends View {
  constructor();
  updateOn(generation: GenerationMode): boolean;
}
