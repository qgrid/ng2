export class Layer {
	constructor(private onDestroy: () => void) {
	}

	destroy() {
		this.onDestroy();
	}
}
