import { Bag } from './bag';
import { Table } from './table';

export function tableFactory(model, layer) {
	const box = {
		markup: {
			document
		},
		bag: {
			head: new Bag(),
			body: new Bag(),
			foot: new Bag()
		},
		layer,
	};

	return new Table(model, box);
}