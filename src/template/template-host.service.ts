import { Injectable } from '@angular/core';
import { identity } from 'ng2-qgrid/core/utility/utility';

@Injectable()
export class TemplateHostService {
	public key: (x: string) => string = identity;

	constructor() {
	}
}
