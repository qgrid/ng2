import { SubjectLike } from './rx';
import { noop } from '../utility/kit';

export function takeOnce() {
    return source => {
        const subject = new SubjectLike();

        let subscription;
        let completed = false;

        const error = noop;

        const complete = () => {
            completed = true;

            if (subscription) {
                subscription.unsubscribe();
                subscription = null;
            }

            subject.complete();
        };

        const next = x => {
            subject.next(x);
            complete();
        };


        subscription = source
            .subscribe(next, error, complete);

        if (completed && subscription) {
            subscription.unsubscribe();
            subscription = null;
        }

        return subject;
    }
}

export function filter(test) {
    return source => {
        const subject = new SubjectLike();

        const error = ex => subject.error(ex);

        const complete = () => subject.complete();

        const next = x => {
            if (test(x)) {
                subject.next(x);
            }
        };

        source.subscribe(next, error, complete);
        return subject;
    }
}