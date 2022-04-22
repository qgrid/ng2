import { FakeClassList } from './class.list';

const emptyRect = Object.freeze({
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	width: 0,
	height: 0
});

export class FakeElement {

	get clientWidth() {
		return 0;
	}

	get clientHeight() {
		return 0;
	}

	get offsetWidth() {
		return 0;
	}

	get offsetHeight() {
		return 0;
	}

	constructor() {
		this.classList = new FakeClassList();
	}

	getBoundingClientRect() {
		return emptyRect;
	}
}
