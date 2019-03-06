import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

export declare interface ColumnListGenerationSettings {
	columnFactory: (type: string) => ColumnModel;
	deep: boolean;
	cohort: boolean;
	rows: any[];
	testNumber: number;	
}

export declare function generateFactory(model: Model): (GenerateOptions) => ColumnModel[];
export declare function generate(settings: ColumnListGenerationSettings): ColumnModel[];
