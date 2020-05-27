import { GRID_PREFIX } from '../definition';
import { escapeAttr } from '../services/css';

export function bodyCellClassifier(column) {
    const classList = [
        `${GRID_PREFIX}-the-${escapeAttr(column.key)}`,
        `${GRID_PREFIX}-${escapeAttr(column.type)}`,
    ];

    if (column.editor) {
        classList.push(`${GRID_PREFIX}-${escapeAttr(column.editor)}`);
    }

    if (column.viewWidth) {
        classList.push(`${GRID_PREFIX}-has-view-width`);
    }

    if (column.class) {
        classList.push(escapeAttr(column.class));
    }

    const className = ' ' + classList.join(' ');
    return element => element.className += className;
}

export function headCellClassifier(column) {
    const classList = [];
    if (column.canEdit) {
        classList.push(`${GRID_PREFIX}-can-edit`);
    }

    if (column.canResize) {
        classList.push(`${GRID_PREFIX}-can-resize`);
    }

    if (column.canSort) {
        classList.push(`${GRID_PREFIX}-can-sort`);
    }

    if (column.canMove) {
        classList.push(`${GRID_PREFIX}-can-move`);
    }

    if (column.canFilter) {
        classList.push(`${GRID_PREFIX}-can-filter`);
    }

    if (column.canHighlight) {
        classList.push(`${GRID_PREFIX}-can-highlight`);
    }

    const className = ' ' + classList.join(' ');
    return element => element.className += className;
}