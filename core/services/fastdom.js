import FastDom from 'fastdom';

export class Fastdom {
    static mutate(task) {
        return FastDom.mutate(task);
    }

    static measure(task) {
        return FastDom.measure(task);
    }

    static clear(task) {
        return FastDom.clear(task);
    }
}
