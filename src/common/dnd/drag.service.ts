import {Injectable} from "@angular/core";
let transfer = null;

@Injectable()
export class DragService {
  constructor() {
  }

  static get mimeType() {
    return 'application/x-q-grid+json';
  }

  static get transfer() {
    return transfer;
  }

  static set transfer(value) {
    transfer = value;
  }

  static decode(source) {
    return JSON.parse(source);  // eslint-disable-line angular/json-functions
  }

  static encode(source) {
    return JSON.stringify(source);  // eslint-disable-line angular/json-functions
  }
}
