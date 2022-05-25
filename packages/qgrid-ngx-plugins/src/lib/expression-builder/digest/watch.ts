import { Expression } from '../model/expression';
import { Line } from '../model/line';
import { Node } from '../model/node';
import { Evaluate, evaluateFactory, Evaluated } from './evaluate';

export class Watcher {
  private evaluate: Evaluate;
  private oldValue: Evaluated<Expression[keyof Expression]>;
  private isFirstRun = true;

  constructor(
    private expression: Expression,
    private key: keyof Expression,
    private handler: (...params: any[]) => void,
    private args: [Node, Line],
  ) {
    this.evaluate = evaluateFactory(expression, args);
    this.oldValue = this.evaluate<Expression[keyof Expression]>(expression[key]);
  }

  detect() {
    const inst = this.expression[this.key];
    const newValue: Evaluated<Expression[keyof Expression]> = this.evaluate<Expression[keyof Expression]>(inst);
    if (this.isFirstRun || this.oldValue !== newValue) {
      this.isFirstRun = false;
      this.handler.apply(this.expression, [
        newValue,
        this.oldValue,
        ...this.args,
      ]);
      this.oldValue = newValue;
    }
  }
}
