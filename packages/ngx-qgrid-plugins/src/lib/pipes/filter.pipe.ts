import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '@qgrid/core/node/node';
import { filterNode } from '@qgrid/core/node/node.service';
import { predicateFactory } from '@qgrid/core/services/predicate';

@Pipe({
	name: 'qGridFilter'
})
export class FilterPipe implements PipeTransform {
	transform(items: any[] | Node, { search = null, type = 'plain' }) {
		if (search || search === 0 || search === false) {
			const predicate = predicateFactory(search);
			switch (type) {
				case 'node': {
					const root = items as Node;
					return filterNode(root, predicate);
				}
				default: {
					return (items as any[]).filter(predicate);
				}
			}
		}

		return items;
	}
}
