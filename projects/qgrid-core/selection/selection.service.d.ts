import { Model } from '../infrastructure/model';

export declare class SelectionService {
	constructor(model: Model);

	lookup(items: any[], unit?: string): any[];
	map(entries: any[]): any[];
	keyFactory<K>(unit: string): (any) => K;
	hashFactory(): (key: string) => any;
}
