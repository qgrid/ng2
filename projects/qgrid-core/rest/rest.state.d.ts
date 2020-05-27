import { Model } from '../model/model';

export declare class RestState {
	url: string;
	method: string;
	serialize: (model: Model) => {
		order: string,
		filter: string,
		skip: number,
		take: number
	};
}
