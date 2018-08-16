import { Pipe, PipeTransform } from '@angular/core';
import { predicateFactory } from 'ng2-qgrid/core/services/predicate';
import { filter } from 'ng2-qgrid/core/node/node.service';
import { Node } from 'ng2-qgrid/core/node/node';

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
					return filter(root, predicate);
				}
				default: {
					return (items as any[]).filter(predicate);
				}
			}
		}

		return items;
	}
}
