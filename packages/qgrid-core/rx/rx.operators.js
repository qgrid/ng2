import { Operator } from './rx';

export function takeOnce() {
    return source =>
        new Operator(subscriber =>
            source.subscribe({
                next: x => {
                    subscriber.next(x);
                    subscriber.complete();
                }
            })
        );
}

export function filter(test) {
    return source =>
        new Operator(subscriber =>
            source.subscribe({
                next: x => {
                    if (test(x)) {
                        subscriber.next(x);
                    }
                }
            })
        );
}