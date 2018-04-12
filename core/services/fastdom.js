import fastdom from 'fastdom';

export class Fastdom {
    static mutate(...args) {
        return Fastdom.invoke(() => fastdom.mutate(...args));
    }

    static measure(...args) {
        return Fastdom.invoke(() => fastdom.measure(...args));
    }

    static clear(...args) {
        return Fastdom.invoke(() => fastdom.clear(...args));
    }

    static invoke(task) {
        return task();
    }
}
