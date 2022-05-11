import { isArray } from '../../utility/kit';

export class JsonImport {
  read(data) {
    const rows = JSON.parse(data);
    if (isArray(rows)) {
      return rows;
    }
    return [rows];
  }
}
