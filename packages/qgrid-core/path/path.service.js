export class PathService {
	constructor(bag) {
		this.bag = bag;
	}

	cell(path) {
		for (let node of path) {
			if (node.nodeName === 'TD' || node.nodeName === 'TH') {
				const model = this.bag.findModel(node);
				if (!model) {
					break;
				}

				return model;
			}
		}

		return null;
	}

	row(path) {
		for (let node of path) {
			if (node.nodeName === 'TR') {
				const model = this.bag.findModel(node);
				if (!model) {
					break;
				}

				return model;
			}
		}

		return null;
	}
}