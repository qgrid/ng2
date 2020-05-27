export declare class DataManipulationState {
	deleted: Set<any>;
	added: Set<any>;
	edited: Set<any>;

	rowFactory: (row?: any) => any;
}
