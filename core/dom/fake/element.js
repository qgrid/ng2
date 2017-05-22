import {FakeClassList} from './class.list';

export class FakeElement {
	constructor() {
		this.classList = new FakeClassList();
	}

	getBoundingClientRect() {
		return {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			width: 0,
			height: 0
		};
	}

	get clientWidth() {
		return 0;
	}

	get clientHeight() {
		return 0;
	}
}