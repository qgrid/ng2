import { ColumnModel } from '../column-type/column.model';
import { Model } from '../model/model';
import { ColumnListStateTypeDetection } from './column.list.state';

export declare interface ColumnListGenerationSettings {
	columnFactory: (type: string) => ColumnModel;
	deep: boolean;
	cohort: boolean;
	rows: any[];
	testNumber: number;
	typeDetection: ColumnListStateTypeDetection;
	title: (text: string) => string;
}

export declare function generateFactory(model: Model): () => { hasChanges: boolean, columns: any[] };
export declare function generate(settings: Partial<ColumnListGenerationSettings>): ColumnModel[];
