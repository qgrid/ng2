import { Pipe, PipeTransform } from '@angular/core';
import { parseFactory } from 'ng2-qgrid/core/services';
import { getMoment } from 'ng2-qgrid/core/services';
import { AppError } from 'ng2-qgrid/core/infrastructure';

/*
 * Transforms Date value to the formatted string.
 * Takes an format argument that defaults to 'h:mm A'.
 * Usage:
 *   date | time:format
 * Example:
 *   {{ '16:05:25' | time:'h:mm:ss A' }}
 * result: '4:05:25 PM'
*/
@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
    private moment = getMoment();

    transform(value: string | Date, formatString?: string): string | Date {
        let date: Date = null;

        if (typeof value !== "string") {
            date = value;
        } else {
            const parse = parseFactory('time');
            date = parse(value, false);
        }

        if (date === null) {
            throw new AppError(`Time Parser ERROR for value: '${value}'`);
        }
        if (!formatString) {
            return date;
        }
        return this.moment(date).format(formatString);
    }
}