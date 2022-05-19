import { EventEmitter, Injectable } from '@angular/core';
import { Node } from './model/node';

export interface EbNodeServiceEventArg<T> {
  newValue: T;
  oldValue: T;
}

@Injectable()
export class EbNodeService {
  private node: Node = null;

  currentChange = new EventEmitter<EbNodeServiceEventArg<Node>>();

  get current() {
    return this.node;
  }

  set current(value) {
    const oldNode = this.node;
    if (value !== oldNode) {
      this.node = value;
      this.currentChange.emit({
        oldValue: oldNode,
        newValue: value,
      });
    }
  }
}
