export class CharReader {
	constructor(text) {
		this.text = text || '';
		this.peeks = [];
		this.position = 0;
		this.length = this.text.length;
	}

	static get eof() {
		return undefined;
	}

	read() {
		const peeks = this.peeks;
		if (peeks.length > 0) {
			return peeks.pop();
		}

		const nextPosition = this.position + 1;
		if (nextPosition < this.length) {
			const c = this.text[this.position];
			this.position = nextPosition;
			return c;
		}

		return CharReader.eof;
	}

	peek() {
		return this.peekCore(0);
	}

	peekPeek() {
		return this.peekCore(1);
	}

	peekCore(offset) {
		const peeks = this.peeks;
		if (offset < peeks.length) {
			return peeks[offset];
		}

		const length = this.length;
		for (let i = peeks.length; i <= offset; i++) {
			const nextPosition = this.position + 1;
			if (nextPosition >= length) {
				return CharReader.eof;
			}

			const c = this.text[this.position];
			this.position = nextPosition;
			peeks.push(c);
		}

		return peeks[offset];
	}

	seek(offset) {
		const peeks = this.peeks;
		const peekCount = peeks.length;
		peeks.splice(0, Math.Min(offset, peekCount));
		offset -= peekCount;
		while (--offset >= 0) {
			this.read();
		}

		return this.peek();
	}
}