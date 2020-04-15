import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { AppError } from '@qgrid/core/infrastructure/error';
import { noop } from '@qgrid/core/utility/kit';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { TemplateService } from '../template/template.service';

function canBuild(column) {
	return column.type !== 'pad';
}

function buildId(source: string, column: ColumnModel, mode = 'view') {
	const { key, type, itemType } = column as any;
	return `${source}-${mode}-cell-${type}-of-${itemType}-the-${key}.tpl.html`;
}

function buildKeys(source: string, column: ColumnModel, mode = 'view') {
	// tslint:disable-next-line
	let { key, type, itemType } = column as any;

	switch (mode) {
		case 'view': {
			const result = [
				`${source}-cell-${type}-the-${key}.tpl.html`,
				`${source}-cell-the-${key}.tpl.html`,
				`${source}-cell-${type}.tpl.html`,
				`${source}-cell.tpl.html`,
				`${source}-cell-text.tpl.html`
			];

			if (itemType) {
				result.splice(0, 0, ...[
					`${source}-cell-${type}-of-${itemType}-the-${key}.tpl.html`,
					`${source}-cell-${type}-of-${itemType}.tpl.html`
				]);
			}

			return result;
		}
		case 'change':
		case 'edit': {
			type = column.editor || type;
			const result = [
				`${mode}-cell-${type}-the-${key}.tpl.html`,
				`${mode}-cell-the-${key}.tpl.html`,
				`${mode}-cell-${type}.tpl.html`,
				`${mode}-cell.tpl.html`,
				`${mode}-cell-text.tpl.html`
			];

			if (itemType) {
				result.splice(0, 0, ...[
					`${mode}-cell-${type}-of-${itemType}-the-${key}.tpl.html`,
					`${mode}-cell-${type}-of-${itemType}.tpl.html`,
				]);
			}

			return result;
		}
		default:
			throw new AppError('cell.service', `Invalid mode '${mode}'`);
	}
}

@Injectable()
export class CellService {
	private commits = new Map<string, (container: ViewContainerRef, context: any) => void>();

	constructor(private templateService: TemplateService) { }

	build(source: string, column: ColumnModel, mode: 'view' | 'edit' | 'change' = 'view') {
		if (!canBuild(column)) {
			return noop;
		}
		const id = buildId(source, column, mode);
		let commit = this.commits.get(id);
		if (commit) {
			return commit;
		}
		const keys = buildKeys(source, column, mode);
		const templateLink = this.templateService.find(keys);
		if (!templateLink) {
			return null;
		}
		commit = (container: ViewContainerRef, context: any) => {
			container.clear();
			const createView = this.templateService.viewFactory(context);
			createView(templateLink, container);
		};
		this.commits.set(id, commit);
		return commit;
	}
}
