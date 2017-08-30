import {Model} from "../../infrastructure/model";
import {IHashFactoryResult, SelectionService} from "../selection.service";

export declare type NodeOrArrayOfNode = Node | Node[];

export interface IToggleResult{
	(item: NodeOrArrayOfNode, state: boolean, key: string): void;
}

export declare class SelectionState {
	constructor(model: Model, service: SelectionService);
	model: Model;
	service: SelectionService;
	select(item: NodeOrArrayOfNode, state: boolean, key: string): void;
	toggle(item: NodeOrArrayOfNode): IToggleResult;
	state(item: NodeOrArrayOfNode, key: string): boolean;
	keyFactory(): IHashFactoryResult;
	clear(): void;
}