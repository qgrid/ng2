import { Bag } from './bag';
import { Table } from './table';

export function tableFactory(model, layer) {
	const markup = { document };

	const bag = {
		head: new Bag(),
		body: new Bag(),
		foot: new Bag()
	};

	const context = {
		bag,
		layer,
	};

	return new Table(model, markup, context);
}