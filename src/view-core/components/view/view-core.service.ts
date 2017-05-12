import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';

@Injectable()
export class ViewCoreService {
  markup: any = {};
  table: any = null;
  group: any = null;
  filter: any = null;
  pivot: any = null;
  sort: any = null;
  pagination: any = null;
  columns: any = null;
  head: any = null;
  body: any = null;
  foot: any = null;
  layout: any = null;
  selection: any = null;
  highlight: any = null;
  edit: any = null;
  nav: any = null;
  scroll: any = null;
  style: any = null;
  pin: string = null;

  constructor() {
    this.markup.document = document;
  }
}
