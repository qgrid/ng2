import { Expression } from '../model/expression';
import { evaluateFactory } from './evaluate';

export class Watcher {
  private evaluate: (x: unknown) => unknown;
  private oldValue: unknown;
  private isFirstRun = true;

  constructor(
    private expression: Expression,
    private key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handler: (context: any, e: any) => void,
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.handler.apply(this.expression, [newValue, this.oldValue].concat(this.args) as any);
      this.oldValue = newValue;
    }
  }
}
