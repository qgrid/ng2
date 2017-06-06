import {isObject, isArray, isString} from '@grid/core/utility';

const begin = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><rows xmlns:xsd="http://www.w3.org/2001/XMLSchema">';
const schema = '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"><xsd:element name="rows"><xsd:complexType>' +
	'<xsd:sequence><xsd:element name="head"><xsd:complexType><xsd:sequence><xsd:element name="column" maxOccurs="unbounded">' +
	'<xsd:complexType><xsd:sequence><xsd:element name="key" type="xsd:string" minOccurs="1" maxOccurs="1"/>' +
	'<xsd:element name="title" type="xsd:string" minOccurs="1" maxOccurs="1"/><xsd:element name="type" type="xsd:string" minOccurs="1" maxOccurs="1"/>' +
	'</xsd:sequence></xsd:complexType></xsd:element></xsd:sequence></xsd:complexType></xsd:element><xsd:element name="body">' +
	'<xsd:complexType><xsd:sequence><xsd:element name="row" minOccurs="0" maxOccurs="unbounded"><xsd:complexType>' +
	'<xsd:sequence><xsd:element name="name" minOccurs="0" maxOccurs="1"><xsd:complexType><xsd:sequence>' +
	'<xsd:element name="first" type="xsd:string" minOccurs="1" maxOccurs="1"/>' +
	'<xsd:element name="last" type="xsd:string" minOccurs="1" maxOccurs="1"/></xsd:sequence></xsd:complexType></xsd:element>' +
	'<xsd:element name="gender" type="xsd:string" minOccurs="0" maxOccurs="1"/><xsd:element name="birthday" type="xsd:date" minOccurs="0" maxOccurs="1"/>' +
	'<xsd:element name="contact" minOccurs="0" maxOccurs="1"><xsd:complexType><xsd:sequence><xsd:element name="address" minOccurs="0" maxOccurs="1">' +
	'<xsd:complexType><xsd:sequence><xsd:element name="street" type="xsd:string" minOccurs="0" maxOccurs="1"/>' +
	'<xsd:element name="zip" type="xsd:string" minOccurs="0" maxOccurs="1"/><xsd:element name="city" type="xsd:string" minOccurs="0" maxOccurs="1"/>' +
	'<xsd:element name="state" type="xsd:string" minOccurs="0" maxOccurs="1"/></xsd:sequence></xsd:complexType></xsd:element>' +
	'<xsd:element name="email" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/><xsd:element name="region" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>' +
	'<xsd:element name="phone" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/></xsd:sequence></xsd:complexType>' +
	'</xsd:element><xsd:element name="likes" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>' +
	'<xsd:element name="memberSince" minOccurs="0" maxOccurs="1" type="xsd:date"/></xsd:sequence></xsd:complexType>' +
	'</xsd:element></xsd:sequence></xsd:complexType></xsd:element></xsd:sequence></xsd:complexType></xsd:element></xsd:schema>';

function escape(value) {
	let result = '' + value;
	const characters = [/</g, />/g, /&/g, /'/g, /"/g, /\s\s+/g, /\n/g];
	const replacements = ['&lt;', '&gt;', '&amp;', '&apos;', '&quot;', ' ', '&#xA;'];
	for (let i = 0; i < characters.length; i++) {
		result = result.replace(characters[i], replacements[i]);
	}
	return result;
}

function objToXml(obj) {
	let result = '';

	for (let [prop, value] of Object.entries(obj)) {
		if (obj.hasOwnProperty(prop)) {
			if (isObject(value) && !isArray(value) && !isString(value)) {
				result += `<${prop}>${objToXml(value)}</${prop}>`;
			} else if (isArray(value)) {
				for (let item of value) {
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
function formHead(columns) {
	const headers = ['<head>'];
	for (let column of columns) {
		headers.push(`<column><key>${column.key}</key><title>${column.title}</title><type>${column.type}</type></column>`);
	}
	headers.push('</head>');
	return headers.join('');
}

export class Xml {
	write(rows, columns) {
		const result = [`${begin}${schema}`, ...formHead(columns), '<body>'];
		for (let row of rows) {
			result.push(`<row>${objToXml(row)}</row>`);
		}
		result.push('</body></rows>');
		return result.join('');
	}
}