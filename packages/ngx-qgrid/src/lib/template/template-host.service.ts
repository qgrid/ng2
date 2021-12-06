import { Injectable } from '@angular/core';
import { identity } from '@qgrid/core';

@Injectable()
export class TemplateHostService {
	key: (x: string) => string = identity;
}
