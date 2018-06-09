import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TemplateService } from '../../../template/template.service';
import { TemplateLink } from '../../../template/template-link';

function canBuild(column) {
	return column.type !== 'pad';
}

function buildId(source: string, column: ColumnModel, mode = 'view') {
	let { key, type, itemType } = column as any;
	return `${source}-${mode}-cell-${type}-of-${itemType}-the-${key}.tpl.html`;
}

function buildKeys(source: string, column: ColumnModel, mode = 'view') {
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

	public build(source: string, column: ColumnModel, mode: 'view' | 'edit' = 'view') {
		if (!canBuild(column)) {
			return noop;
		}

		const id = buildId(source, column, mode);
		const commits = this.commits;
		let commit = commits.get(column.key);
		if (commit) {
			return commit;
		}

		const templateService = this.templateService;
		const keys = buildKeys(source, column, mode);
		const link = templateService.find(keys);

		if (!link) {
			throw new AppError(
				'cell.service',
				`Can't find template for ${keys[0]}`
			);
		}

		commit = (container: ViewContainerRef, context: any) => {
			container.clear();

			const createView = templateService.viewFactory(context);
			createView(link, container);
		};

		commits.set(id, commit);
		return commit;
	}
}
