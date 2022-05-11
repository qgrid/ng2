import { Box } from './box';
import { SelectorMark } from './selector/selector.mark';
import { VirtualBox } from './virtual/box';

export class Body extends Box {
  constructor(context, model) {
    super(context, model, new SelectorMark(model, context.markup, 'body'));
  }
}

export class VirtualBody extends VirtualBox {
  constructor(context, model) {
    super(context, model, new SelectorMark(model, context.markup, 'body'));
  }
}
