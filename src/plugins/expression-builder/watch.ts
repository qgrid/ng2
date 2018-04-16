import {evaluateFactory} from './evaluate';

export class Watcher {
	private evaluate: (object: any) => any;
	private oldVal: any;
	private cold: boolean;

	constructor(private context: any, private key: string, private handler: (n: any, o: any) => void, private args = []) {
		this.evaluate = evaluateFactory(context, args);
		this.oldVal = this.evaluate(context[key]);
		this.cold = true;
	}

	detect() {
		const val = this.evaluate(this.context[this.key]);
		if (this.cold || this.oldVal !== val) {
			this.handler.apply(this.context, [val, this.oldVal].concat(this.args));
			this.oldVal = val;
			this.cold = false;
		}
	}
}
