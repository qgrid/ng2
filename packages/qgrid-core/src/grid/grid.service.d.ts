import { Model } from '../model/model';
import { ModelChanges } from '../model/model.event';
import { PipeCallback, PipeUnitWhy } from '../pipe/pipe.types';

export declare class GridService {
  constructor(model: Model);

  invalidate(settings?: Partial<{
		source: string;
		changes: ModelChanges<any>;
		pipe: PipeCallback<any, any>[];
		why: PipeUnitWhy;
	}>): Promise<void>;

  busy(): () => void;

  focus(rowIndex?: number, columnIndex?: number): void;
}
