import {
  alphaTitle,
  columnFactory,
  CsvImport,
  firstRowTitle,
  generate,
  GridError,
  JsonImport,
  numericTitle,
  PluginService,
  XmlImport,
} from '@qgrid/core';
import { XlsxReader } from './xlsx';

function getType(name) {
  const delimiter = /[.]/g.test(name);
  if (delimiter) {
    const type = name.split('.');
    return type[type.length - 1];
  }
}

function readFile(e, file, model, options = {}) {
  const data = e.target.result;
  const type = file.type === '' ? getType(file.name) : file.type;
  const pluginService = new PluginService(model);
  switch (type) {
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'xlsx': {
      const lib = pluginService.resolve('xlsx');
      const xlsx = new XlsxReader(lib);
      const rows = xlsx.read(data, options);
      const createColumn = columnFactory(model);
      const columns = generate({
        rows,
        columnFactory: (type, body) => createColumn('text', body),
        deep: false,
      });
      model.data({
        columns,
        rows,
      }, { source: 'read' });
      break;
    }
    case 'application/json':
    case 'text/json':
    case 'json': {
      const json = new JsonImport();
      const rows = json.read(data);
      if (rows.length) {
        const createColumn = columnFactory(model);
        const columns = generate({
          rows,
          columnFactory: (type, body) => createColumn('text', body),
          deep: true,
        });
        model.data({
          columns,
          rows,
        }, { source: 'read' });
      } else {
        throw new GridError('import', 'JSON for input should be an array of objects');
      }
      break;
    }
    case 'application/xml':
    case 'text/xml':
    case 'xml': {
      const xml = new XmlImport();
      const rows = xml.read(data);
      const columns = generate({
        rows,
        columnFactory: columnFactory(model),
        deep: true,
      });
      model.data({
        columns,
        rows,
      }, { source: 'read' });
      break;
    }
    case 'application/vnd.ms-excel':
    case 'text/csv':
    case 'csv': {
      const csv = new CsvImport();
      const rows = csv.read(data);

      let title = firstRowTitle;

      if (options.head === 'alpha') {
        title = alphaTitle;
      } else if (options.head === 'numeric') {
        title = numericTitle;
      }

      const columns = generate({
        rows,
        columnFactory: columnFactory(model),
        deep: false,
        title,
      });

      if (title === firstRowTitle) {
        rows.shift(0);
      }
      model.data({
        columns,
        rows,
      }, { source: 'read' });
      break;
    }
    default: {
      throw new GridError('import', `This is not valid file type ${type}`);
    }
  }
}

export {
  readFile,
};

