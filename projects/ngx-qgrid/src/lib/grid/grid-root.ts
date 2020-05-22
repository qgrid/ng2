import { Injectable } from '@angular/core';
import { DomTable } from '../dom/dom';
import { GridModel } from '../grid/grid-model';

@Injectable()
export class GridRoot {
	model: GridModel;
	table: DomTable;
}
