import { Watcher } from '../digest/watch';

export abstract class Expression {
  id: string;
  type: string;
  templateUrl = '';
  method: string[] = [];
  $watch?: Watcher;
  isValid?(): boolean;
}

export class GroupExpression extends Expression {
  expressions: Expression[] = [];

  constructor() {
    super();

    this.type = 'group';
    this.templateUrl = 'eb-group.tpl.html';
  }
}

