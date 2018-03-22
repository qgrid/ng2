import { isFunction, isNumber } from 'ng2-qgrid/core/utility';
import { AppError } from 'ng2-qgrid/core/infrastructure';

export const rAF = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

export const UNSET_ARM = Number.MAX_SAFE_INTEGER;
export const UNSET_OFFSET = 0;

export function capitalize(text: string) {
    return text[0].toUpperCase() + text.slice(1);
}

export function sizeFactory(size: number | ((el: HTMLElement, i: number) => number), container, element: HTMLElement, index: number) {
    if (isFunction(size)) {
        return () => size(element, container.position + index);
    }

    if (isNumber(size)) {
        return () => size;
    }

    throw new AppError('vscroll.utility', `Invalid size ${size}`);
}

export function findIndexAt(items: Array<number>, value: number) {
    const length = items.length;
    let min = 0;
    let max = length - 1;
    while (min <= max) {
        var mid = (min + max) >> 1;
        var k = items[mid];
        if (k === value) {
            return mid;
        }
        else if (k < value) {
            min = mid + 1;
        }
        else {
            max = mid - 1;
        }
    }

    return min;
}

export function recycleFactory(items: Array<() => number>) {
    const offsets = new Array<number>();
    return (index: number, count: number) => {
        var threshold = items.length;
        var cursor = offsets.length;
        var diff = Math.min(count, threshold + index) - cursor;

        for (var i = threshold - diff; i < threshold; i++) {
            var value = items[i]();
            if (cursor === 0) {
                offsets[cursor] = value;
            }
            else {
                offsets[cursor] = offsets[cursor - 1] + value;
            }

            cursor++;
        }

        return offsets;
    };
}

export function findPosition(offsets: Array<number>, value: number, itemSize: number) {
    if (itemSize) {
        const index = Math.round(value / itemSize);
        return {
            index: index,
            offset: itemSize * index,
            lastOffset: 0,
            value: value
        };
    }

    const index = findIndexAt(offsets, value);
    const length = offsets.length;
    if (index > 0) {
        return {
            index: index,
            offset: offsets[index - 1],
            lastOffset: offsets[length - 1],
            value: value
        };
    }

    return {
        index: 0,
        offset: 0,
        lastOffset: length ? offsets[length - 1] : 0,
        value: value
    };
}

export function placeholderBitmap(width: number, height: number) {
    const minWidth = Math.max(width, 1);
    const minHeight = Math.max(height, 1);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(width * 2, 1);
    canvas.height = Math.max(height * 2, 1);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, minWidth, minHeight);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(width, height, minWidth, minHeight);

    return canvas.toDataURL();
}