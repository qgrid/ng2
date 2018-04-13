import { TraverseService } from '../../expression-builder/traverse.service';

export class Validator {
	validate(node) {
		const depth = TraverseService.depth(node);
		return depth((memo, expression, line, node) =>
			node.attr('placeholder')
				? memo
				: memo && expression.isValid()
			, true);
	}
}
