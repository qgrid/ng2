import { ColumnIndexPipeUnit } from './units/column.index.pipe.unit';
import { ColumnPipeUnit } from './units/column.pipe.unit';
import { DefaultPipeUnit } from './units/default.pipe.unit';
import { GroupPipeUnit } from './units/group.pipe.unit';
import { RowDetailsPipeUnit } from './units/row.details.pipe.unit';
import { RowPipeUnit } from './units/row.pipe.unit';
import { ScenePipeUnit } from './units/scene.pipe.unit';
import { ViewPipeUnit } from './units/view.pipe.unit';

export declare class PipeUnit {
	static readonly column: ColumnPipeUnit;
	static readonly columnIndex: ColumnIndexPipeUnit;
	static readonly default: DefaultPipeUnit;
	static readonly group: GroupPipeUnit;
	static readonly row: RowPipeUnit;
	static readonly rowDetails: RowDetailsPipeUnit;
	static readonly scene: ScenePipeUnit;
	static readonly view: ViewPipeUnit;
}
