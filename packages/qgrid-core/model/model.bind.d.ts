import { GridPlugin } from '../plugin/grid.plugin';

export declare class ModelBinder {
	constructor(host: any, plugin: GridPlugin);

	bound(stateNames: string[], run: boolean, track?: boolean): () => void;
}
