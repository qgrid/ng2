import { Visitor } from './expression.visitor';
import { AppError } from '../infrastructure/error';

function stringify(value, type) {
    switch (type) {
        case 'TEXT':
            return stringifyText(value);
        case 'INTEGER':
            return stringifyInteger(value);
        case 'NUMBER':
            return stringifyNumber(value);
        case 'DATETIME':
            return stringifyDate(value);
        default:
            return '' + value;
    }
}

function stringifyText(value) {
    return `<span class="markup-condition-quote">'</span>
                <span class="markup-condition-value markup-condition-value-text">${value}</span>
            <span class="markup-condition-quote">'</span>`;
}

function stringifyDate(value) {
    const date = new Date(value);
    if (date !== 'Invalid Date' && !isNaN(date)) {
        return `<span class="markup-condition-quote">'</span>
                    <span class="markup-condition-value markup-condition-value-date">${value}</span>
                <span class="markup-condition-quote">'</span>`;
    }

    return `<span class="markup-condition-quote">'</span>
                <span class="markup-condition-value markup-condition-value-date markup-condition-error">${value}</span>
            <span class="markup-condition-quote">'</span>`;
}

function stringifyNumber(value) {
    const number = parseFloat(value);
    if (!isNaN(number) && isFinite(number)) {
        return `<span class="markup-condition-value markup-condition-number">${value}</span>`;
    }

    return `<span class="markup-condition-value markup-condition-number markup-condition-error">${value}</span>`;
}

function stringifyInteger(value) {
    const number = parseInt(value);
    if (!isNaN(number) && isFinite(number)) {
        return `<span class="markup-condition-value markup-condition-number">${value}</span>`;
    }

    return `<span class="markup-condition-value markup-condition-number markup-condition-error">${value}</span>`;
}

export class MarkupVisitor extends Visitor {
    constructor() {
        super();
    }

    visitGroup(group, depth) {
        if (group.right) {
            const l = this.visit(group.left, depth);
            const r = this.visit(group.right, depth);

            const expr = `<div class="markup-node-left">${l}</div><span class="markup-group-op">${group.op}</span><div class="markup-node-right">${r}</div>`;
            return `<div class="markup-node">${(depth > 1 ? `<span class="markup-group-open">(</span>${expr}<span class="markup-group-close">)</span>` : expr)}</div>`;
        }

        return `<div class="markup-node">${this.visit(group.left, depth)}<div class="markup-node">`;
    }

    visitUnary(condition) {
        switch (condition.op) {
            case 'isNotNull':
                return `<span class="markup-condition-left">${this.label(condition.left)}</span><span class="markup-condition-right">is not empty</span>`;
            case 'isNull':
                return `<span class="markup-condition-left">${this.label(condition.left)}</span><span class="markup-condition-right">is empty</span>`;
            default:
                throw new AppError('markup.visitor', `Invalid operation ${condition.op}`)
        }
    }

    visitBinary(condition) {
        const op;

        switch (condition.op) {
            case 'equals':
                op = '=';
                break;
            case 'notEquals':
                op = '&lt;&gt;';
                break;
            case 'greaterThanOrEquals':
                op = '&gt;='
                break;
            case 'greaterThan':
                op = '&gt;';
                break;
            case 'lessThanOrEquals':
                op = '&lt;=';
                break;
            case 'lessThan':
                op = '&lt;';
                break;
            case 'like':
                op = 'like';
                break
            case 'notLike':
                op = 'not like';
                break;
            case 'startsWith':
                op = 'starts with';
                break;
            case 'endsWith':
                op = 'ends with';
                break;
            default:
                throw new AppError('markup.visitor', `Invalid operation ${condition.op}`);
        }

        return `<span class="markup-condition-left">${this.label(condition.left)}</span>
                <span class="markup-condition-op">${op}</span>
                <span class="markup-condition-right">${stringify(condition.right, this.type(condition.left))}</span>`;
    }

    visitBetween(condition) {
        return `<span class="markup-condition-left">${this.label(condition.left)}</span>
                <span class="markup-condition-op"> between </span>
                <span class="markup-condition-right">${stringify(condition.right[0], this.type(condition.left))}</span>
                <span class="markup-condition-op"> and </span>
                <span class="markup-condition-right">${stringify(condition.right[1], this.type(condition.left))}</span>`;
    }

    visitIn(condition) {
        return `<span class="markup-condition-left">${this.label(condition.left)}</span>
                <span class="markup-condition-op"> in </span>
                <span class="markup-condition-open">(</span>
                <span class="markup-condition-right">${condition.right.map(item => stringify(item, this.type(condition.left))).join(', ')}</span>
                <span class="markup-condition-close">)</span>`;
    }
}
