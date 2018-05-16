import { Injectable } from '@angular/core';
import { identity } from 'ng2-qgrid/core/utility/index';

@Injectable()
export class TemplateHostService {
	public key: (x: string) => string = identity;

	constructor() {
	}
}
