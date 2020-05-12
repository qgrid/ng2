import { SubjectLike } from './rx';

export function takeOnce() {
    return source => {
        const subject = new SubjectLike();

        let subscription;
        let completed = false;
        subscription = source
            .subscribe(x => {
                completed = true;

                if (subscription) {
                    subscription.unsubscribe();
                    subscription = null;
                }

                subject.next(x);
                subject.complete();
            });

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

        source
            .subscribe(x => {
                if (test(x)) {
                    subject.next(x);
                }
            });

        return subject;
    }
}