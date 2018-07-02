import { Model } from '../infrastructure/model';
import { PipeUnit } from '../pipe/pipe.unit';
import { Command } from '../command/command';
import { Action } from '../action/action';
import { RowDetailsStatus } from '../row-details/row.details.status';
import { Pipe } from '../pipe/pipe';
import { Node } from '../node/node';
import { GridService } from './grid';

/**
 * Use this class to create a q-grid model or service
 */
export declare interface Grid {
	/**
	 * Model factory.
	 */
	model(): Model;

	/**
	 * Service factory.
	 * 	 
	 */
	service(model: Model): GridService;

	readonly noop: () => void;

	readonly identity: (x: any) => any;

	readonly pipe: Pipe

	readonly pipeUnit: PipeUnit;

	/**
	 * Command type constructor.
	 */
	readonly Command: Command;

	/**
	 * Action type constructor.
	 */
	readonly Action: Action;

	/**
	 * Node type constructor.
	 */
	readonly Node: Node;

	/**
	 * RowDetailsStatus constructor.
	 */
	readonly RowDetailsStatus: RowDetailsStatus

	readonly valueFactory: (key: string) => (row: any) => any;
	readonly labelFactory: (key: string) => (row: any) => any;
}
