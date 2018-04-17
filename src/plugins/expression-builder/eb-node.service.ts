import { Injectable, EventEmitter } from '@angular/core';
import { EbNodeComponent } from './eb-node.component';
import { Node } from './model/node';

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

	static findUp(node: EbNodeComponent, test: (node: Node) => boolean) {
		while (node) {
			if (test(node.model)) {
				return node;
			}

			node = node.parent;
		}

		return null;
	}
}
