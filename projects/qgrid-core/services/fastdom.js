import FastDom from 'fastdom';

export class Fastdom {
    static mutate(task) {
        return Fastdom.invoke(() => FastDom.mutate(task));
    }

    static measure(task) {
        return Fastdom.invoke(() => FastDom.measure(task));
    }

    static clear(task) {
        return Fastdom.invoke(() => FastDom.clear(task));
    }

    static invoke(task) {
        return task();
    }
}
