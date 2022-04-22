export class Lazy {

	get instance() {
		return this.value || (this.value = this.build());
	}

	constructor(build) {
		this.build = build;
	}
}
