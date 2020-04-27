import { Model } from '../infrastructure/model';

export declare interface RestModel {
	url: string;
	method: string;
	serialize: (model: Model) => {
		order: string,
		filter: string,
		skip: number,
		take: number
	};
}
