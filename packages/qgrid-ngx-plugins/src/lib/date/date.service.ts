import { Injectable } from '@angular/core';
import { isDate, parseFactory } from '@qgrid/core';

@Injectable()
export class DateService {
	private toDateTime: (x: Date | string) => Date = parseFactory('datetime');

	parseDateTime(dateOrText: Date | string, format: string): Date | null {
		if (!dateOrText) {
			return null;
		}

		if (isDate(dateOrText)) {
			return dateOrText as Date;
		}

		if (format) {
			const simpleFormat = format.replace(/[^A-Za-z]/g, '');
			const justDigitsValue = (dateOrText as string).replace(/[^0-9]/g, '');
			return this.parseDateText(justDigitsValue, simpleFormat);
		}

		return this.toDateTime(dateOrText);
	}

	isValid(dateOrText: Date | string, format: string) {
		if (!dateOrText) {
			return true;
		}

		const result = this.parseDateTime(dateOrText, format);
		return result && !isNaN(result.getTime());
	}

	private parseDateText(text: string, format: string): Date | null {
		let year = '';
		let month = '';
		let day = '';

		let cursor = 0;
		for (const formatKey of format) {

			switch (formatKey) {
				case 'y': {
					const digit = text[cursor++];
					if (digit) {
						year += digit;
					}
				}
					break;
				case 'M': {
					const digit = text[cursor++];
					if (digit) {
						month += digit;
					}
				}
					break;
				case 'd': {
					const digit = text[cursor++];
					if (digit) {
						day += digit;
					}
				}
					break;
			}
		}

		if (year.length < 4 || month.length < 1 || day.length < 1) {
			return null;
		}

		month = month.length === 1 ? '0' + month : month;
		day = day.length === 1 ? '0' + day : day;

		return this.toDateTime(`${year}-${month}-${day}`);
	}
}
