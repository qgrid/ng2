import { Expression } from '../model/expression';
import { Evaluate, evaluateFactory, Evaluated } from './evaluate';

export class Watcher {
  private evaluate: Evaluate;
  private oldValue: Evaluated<Expression[keyof Expression]>;
  private isFirstRun = true;

  constructor(
    private expression: Expression,
    private key: keyof Expression,
    private handler: (context: Expression, e: unknown) => void,
    private args: Evaluated<Expression[keyof Expression]>[] = [],
  ) {
    this.evaluate = evaluateFactory(expression, args);
    this.oldValue = this.evaluate<Expression[keyof Expression]>(expression[key]);
  }

  detect() {
    const inst = this.expression[this.key];
    const newValue = this.evaluate<Expression[keyof Expression]>(inst);
    if (this.isFirstRun || this.oldValue !== newValue) {
      this.isFirstRun = false;
      this.handler.apply(this.expression, [newValue, this.oldValue].concat(this.args));
      this.oldValue = newValue;
    }
  }
}
