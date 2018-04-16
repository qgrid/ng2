import { evaluateFactory } from './evaluate';

export class Watcher {
	private evaluate: (x: any) => any;
	private oldValue: any;
	private isFirstRun = true;

	constructor(
		private expression: any,
		private key: string,
		private handler: (context: any, e: any) => void,
		private args = []) {

		this.evaluate = evaluateFactory(expression, args);
		this.oldValue = this.evaluate(expression[key]);
	}

	detect() {
		const inst = this.expression[this.key];
		const newValue = this.evaluate(inst);
		if (this.isFirstRun || this.oldValue !== newValue) {
			this.isFirstRun = false;

			this.handler.apply(this.expression, [newValue, this.oldValue].concat(this.args));
			this.oldValue = newValue;
		}
	}
}
