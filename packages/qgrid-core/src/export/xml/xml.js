import { hasOwnProperty, isArray, isObject, isString } from '../../utility/kit';

const begin = '<?xml version="1.0" encoding="UTF-8"?><root>';

function escape(value) {
  let result = '' + value;
  const characters = [
    /</g,
    />/g,
    /&/g,
    /'/g,
    /"/g,
    /\s\s+/g,
    /\n/g,
  ];
  const replacements = [
    '&lt;',
    '&gt;',
    '&amp;',
    '&apos;',
    '&quot;',
    ' ',
    '&#xA;',
  ];
  for (let i = 0; i < characters.length; i++) {
    result = result.replace(characters[i], replacements[i]);
  }
  return result;
}

function objToXml(obj) {
  let result = '';

  for (const [prop, value] of Object.entries(obj)) {
    if (hasOwnProperty.call(obj, prop)) {
      if (isObject(value) && !isArray(value) && !isString(value)) {
        result += `<${prop}>${objToXml(value)}</${prop}>`;
      } else if (isArray(value)) {
        for (const item of value) {
          if (isString(item)) {
            result += `<${prop}>${escape(item)}</${prop}>`;
          } else {
            result += `<${prop}>${objToXml(item)}</${prop}>`;
          }
        }
      } else if (isString(value)) {
        result += `<${prop}>${escape(value)}</${prop}>`;
      }
    }
  }
  return result;
}

export class XmlExport {
  write(rows) {
    const result = [begin];
    for (const row of rows) {
      result.push(objToXml({ row }));
    }
    result.push('</root>');
    return result.join('');
  }
}
