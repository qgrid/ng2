import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TemplateService } from '../../../template/template.service';

function canBuild(column) {
	return column.type !== 'pad';
}

function buildKeys(source: string, column: ColumnModel, mode = 'view') {
	const key = column.key;
	switch (mode) {
		case 'view': {
			const type = column.type;
			return [
				`${source}-cell-${type}-${key}.tpl.html`,
				`${source}-cell-${key}.tpl.html`,
				`${source}-cell-${type}.tpl.html`,
				`${source}-cell.tpl.html`,
				`${source}-cell-text.tpl.html`
			];
		}
		case 'edit': {
			const type = column.editor || column.type;
			return [
				`${mode}-cell-${type}-${key}.tpl.html`,
				`${mode}-cell-${key}.tpl.html`,
				`${mode}-cell-${type}.tpl.html`,
				`${mode}-cell.tpl.html`,
				`${mode}-cell-text.tpl.html`
			];
		}
		default:
			throw new AppError('cell.service', `Invalid mode "${mode}"`);
	}
}

@Injectable()
export class CellService {
	constructor(private templateService: TemplateService) {}

	public build(source: string, column: any, mode = 'view') {
		if (!canBuild(column)) {
			return noop;
		}

		const keys = buildKeys(source, column, mode);
		const link = this.templateService.find(keys);
		if (!link) {
			throw new AppError(
				'cell.service',
				`Can't find template for ${keys[0]}`
			);
		}

		return (viewContainerRef: ViewContainerRef, context: any) => {
			viewContainerRef.clear();
			const createView = this.templateService.viewFactory(context);
			createView(link, viewContainerRef);
		};
	}
}
