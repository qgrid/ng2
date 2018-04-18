import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '../expression-builder/model/node';
import { MarkupVisitor } from 'ng2-qgrid/core/expression/markup.visitor';
import { SerializationService } from '../expression-builder/serialization.service';
import { convert } from './schema/converter';
import { QueryBuilderService } from './query-builder.service';

@Pipe({
	name: 'qGridQueryBuilderMarkup',
	pure: false
})
export class QueryBuilderPipe implements PipeTransform {
	visitor: MarkupVisitor;

	transform(value: any, service: QueryBuilderService): any {
		const node = value as Node;
		if (node) {
			if (!this.visitor) {
				const columnMap = service.columnMap();
				this.visitor =
					new MarkupVisitor(
						key => columnMap[key].title,
						key => columnMap[key].type
					);
			}

			const serializer = new SerializationService();
			const filter = serializer.serialize(node);
			const expression = convert(filter);
			if (expression) {
				return this.visitor.visit(expression);
			}
		}

		return 'Please, select a query';
	}
}
