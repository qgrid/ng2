import {CharReader} from '../../io';

export class Csv {
	constructor(delimiter = ',') {
		this.delimiter = delimiter;
	}

	read(text) {
		const reader = new CharReader(text);
		const delimiter = this.delimiter;

		const result = [];
		let line = [];
		let term = '';
		const condition = true;
		do {
			const c = reader.peek();
			if (c === ' ') {
				reader.read();
				continue;
			}

			if (c === delimiter) {
				reader.read();

				line.push(term);
				term = '';
				continue;
			}

			if (c === '\n') {
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					term = '';
				}

				if (line.length > 0) {
					result.push(line);
					line = [];
				}

				continue;
			}

			if (c === '\r' && reader.peekPeek() === '\n') {
				reader.read();
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					term = '';
				}

				if (line.length > 0) {
					result.push(line);
					line = [];
				}

				continue;
			}

			if (c === CharReader.eof) {
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					result.push(line);
				}
				break;
			}

			if (c === '"') {
				term = this.readEscapedValue(reader, term);
			}
			else {
				term = this.readUnescapedValue(reader, term);
			}
		}
		while (condition);

		return result.map(this.lineToObj);
	}

	readEscapedValue(reader, term) {
		// Omit double quote
		let c = reader.read();
		while (c !== CharReader.eof) {
			c = reader.read();
			if (c === '"') {
				if (reader.peek() === '"') {
					term += reader.read();
					continue;
				}
				break;
			}
			term += c;
		}

		return term;
	}

	readUnescapedValue(reader, term) {
		const delimiter = this.delimiter;
		let c = reader.peek();
		while (c !== CharReader.eof) {
			if (c === delimiter || c === '\n' ||
				(c === '\r' && reader.peekPeek() === '\n'))
				break;

			term += reader.read();
			c = reader.peek();
		}

		return term;
	}

	lineToObj(line) {
		const result = {};
		for (let i = 0, length = line.length; i < length; i++) {
			result[i] = line[i];
		}
		return result;
	}
}