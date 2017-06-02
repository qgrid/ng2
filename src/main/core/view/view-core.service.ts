import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';

@Injectable()
export class ViewCoreService {
  public group: any = null;
  public filter: any = null;
  public pivot: any = null;
  public sort: any = null;
  public pagination: any = null;
  public columns: any = null;
  public head: any = null;
  public body: any = null;
  public foot: any = null;
  public layout: any = null;
  public selection: any = null;
  public highlight: any = null;
  public edit: any = null;
  public nav: any = null;
  public scroll: any = null;
  public style: any = null;

  constructor() {
  }
}
