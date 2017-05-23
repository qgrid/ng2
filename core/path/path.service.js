import {AppError} from '../infrastructure';

export class PathService {
	constructor(bag) {
		this.bag = bag;
	}

	cell(path) {
		for (let node of path) {
			if (node.nodeName === 'TD' || node.nodeName === 'TH') {
				if (!this.bag.has(node)) {
					new AppError('path.find', `Can't find model for ${node.nodeName}`);
				}

				return this.bag.get(node);
			}
		}

		return null;
	}

	row(path) {
		for (let node of path) {
			if (node.nodeName === 'TR') {
				if (!this.bag.has(node)) {
					new AppError('path.find', `Can't find model for ${node.nodeName}`);
				}

				return this.bag.get(node);
			}
		}

		return null;
	}
}
