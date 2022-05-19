import { Expression } from '../model/expression';
import { evaluateFactory } from './evaluate';

export class Watcher {
  private evaluate: (x: unknown) => unknown;
  private oldValue: unknown;
  private isFirstRun = true;

  constructor(
    private expression: Expression,
    private key: string,
    private handler: (context: Expression, e: unknown) => void,
    private args = [],
  ) {
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
