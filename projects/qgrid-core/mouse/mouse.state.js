export class MouseState {
	constructor() {
		this.status = 'release';
		this.code = null;
		this.target = null;
		this.timestamp = new Date().getMilliseconds();
	}
}
