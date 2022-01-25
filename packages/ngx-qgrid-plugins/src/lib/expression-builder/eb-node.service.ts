import { Injectable, EventEmitter } from '@angular/core';
import { EbNodeComponent } from './eb-node.component';
import { Node } from './model/node';

export interface EbNodeServiceEventArg<T> {
	newValue: T;
	oldValue: T;
}

@Injectable()
export class EbNodeService {
	private node: Node | null = null;

	currentChange = new EventEmitter<EbNodeServiceEventArg<Node>>();

	get current() {
		return this.node;
	}

	set current(value: any) {
		const oldNode: any = this.node;
		if (value !== oldNode) {
			this.node = value;
			this.currentChange.emit({
				oldValue: oldNode,
				newValue: value
			});
		}
	}
}
