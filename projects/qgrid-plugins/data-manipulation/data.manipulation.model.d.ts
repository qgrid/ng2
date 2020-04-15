import { Command } from '@qgrid/core/command/command';

export declare class DataManipulationModel {
	deleted: Set<any>;
	added: Set<any>;
	edited: Set<any>;

	rowFactory: (row?: any) => any;
}
