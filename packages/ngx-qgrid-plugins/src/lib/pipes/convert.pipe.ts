import { Pipe, PipeTransform } from '@angular/core';
import { parseFactory } from '@qgrid/core';

@Pipe({
	name: 'qGridConvert'
})
export class ConvertPipe implements PipeTransform {
	constructor() { }

	transform(value: any, type: string) {
		const parse = parseFactory(type);
		const result = parse(value);
		return result === null ? value : result;
	}
}
