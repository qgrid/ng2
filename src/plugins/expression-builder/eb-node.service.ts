import { Injectable, EventEmitter } from '@angular/core';
import { EbNodeComponent } from './eb-node.component';

export interface EbNodeServiceEventArg<T> {
	newValue: T;
	oldValue: T;
}

@Injectable()
export class EbNodeService {
	private node: EbNodeComponent = null;

	currentNodeChange = new EventEmitter<EbNodeServiceEventArg<EbNodeComponent>>();

	get currentNode() {
		return this.node;
	}

	set currentNode(value) {
		const oldNode = this.node;
		if (value !== oldNode) {
			this.node = value;
			this.currentNodeChange.emit({
				oldValue: oldNode,
				newValue: value
			});
		}
	}
}
