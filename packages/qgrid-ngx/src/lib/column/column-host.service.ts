import { Injectable } from '@angular/core';
import { ColumnModel } from '@qgrid/core';

@Injectable()
export class ColumnHostService {
  column: ColumnModel;
}
