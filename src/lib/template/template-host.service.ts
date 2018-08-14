import { Injectable } from '@angular/core';
import { identity } from 'ng2-qgrid/core/utility/kit';

@Injectable()
export class TemplateHostService {
	key: (x: string) => string = identity;
}
