import { Range } from '../../infrastructure/range';

export class SelectorMark {
	constructor(model, markup, name) {
		this.model = model;
		this.name = name;
		this.markup = markup;
	}

	select() {
		const result = [];
		const addNext = this.addFactory(result);
		['top', 'mid', 'bottom'].forEach(pos => (['left', 'mid', 'right'].forEach(pin => addNext(pin, pos))));
		return result;
	}

	addFactory(result) {
		const { model } = this;
		const columnArea = model.scene().column.area;

		return (pinLR, pinTB) => {

			const { pinTop, pinBottom } = model.row();
			const pinned = new Set([...pinTop, ...pinBottom]);

			const rows = pinTB == 'top' ? pinTop : pinTB == 'bottom' ? pinBottom : 
				(pinned.size ? model.scene().rows.filter(row => !pinned.has(row)) : model.scene().rows);

			const name = this.name + ((pinTB && pinTB !== 'mid') ? `-${pinTB}` : '') + (pinLR ? `-${pinLR}` : ''); 
			const element = this.markup[name];
			if (element) {
				const prev = result[result.length - 1] && result[result.length - 1].name === (this.name + ((pinTB == 'top' || pinTB == 'bottom') ? `-${pinTB}` : '')) ? 
				result[result.length - 1] : null;
				const columnStart = prev ? prev.columnRange.end : 0;
				const columnCount = columnArea[pinLR].length;
				const rowStart = pinTB === 'mid' ? pinTop.length : pinTB === 'bottom' ? 
					model.scene().rows.length - pinBottom.length : 0;
				const rowCount = rows.length;

				result.push({
					name: this.name + ((pinTB == 'top' || pinTB == 'bottom') ? `-${pinTB}` : ''),
					element,
					columnRange: new Range(columnStart, columnStart + columnCount),
					rowRange: new Range(rowStart, rowStart + rowCount)
				});
			}

			return result;
		};
	}
}