import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '../expression-builder/model/node';
import { MarkupVisitor } from '@qgrid/core/expression/markup.visitor';
import { SerializationService } from '../expression-builder/serialization.service';
import * as converter from './schema/converter';
import { QueryBuilderService, ColumnMap } from './query-builder.service';
import { Validator } from './schema/validator';

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
				const validator = new Validator(service);
				const columnMap = service.columnMap();
				this.visitor =
					new MarkupVisitor(
						k => columnMap[k].title,
						k => columnMap[k].type,
						(k, v) => validator.for(k)(v).length === 0
					);
			}

			const serializer = new SerializationService();
			const filter = serializer.serialize(node);
			const expression = converter.visit(filter);
			if (expression) {
				return this.visitor.visit(expression);
			}
		}

		return 'Please, select a query';
	}
}
