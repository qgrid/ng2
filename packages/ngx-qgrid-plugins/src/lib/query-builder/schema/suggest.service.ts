import { QueryBuilderService } from '../query-builder.service';

export function suggestFactory(service: QueryBuilderService, name: string) {
	return function (node: any, line: any) {
		const search = this.value == null ? '' : ('' + this.value).toLowerCase() as any;
		const field = line.get(name).expressions[0].value;
		return service.suggest(field, 0, 10, search);
	};
}

export function suggestsFactory(service: QueryBuilderService, name: string) {
	return function (node: any, line: any) {
		const search = this.search;
		const field = line.get(name).expressions[0].value;
		const selection =
			(this.values || [])
				.map((item: any) => ('' + item).toLowerCase());

		return new Promise((resolve, reject) =>
			service
				.suggest(field, 0, 10, search, selection)
				.then(items => {
					const result = selection.length
						? items.filter(item => selection.indexOf(('' + item).toLowerCase()) < 0)
						: items;
				})
				.catch(ex => reject(ex))
		);
	};
}
