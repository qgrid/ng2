import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';

export class SubscriptionLike {
    constructor(off) {
        this.off = off;
    }

    unsubscribe() {
        if (this.off) {
            this.off();
            this.off = null;
        }
    }
}

export class ObservableEvent {
    constructor(event, reply, disposable) {
        this.event = event;
        this.reply = reply;
        this.disposable = disposable;
    }

    subscribe(next) {
        let off;
        if (this.reply) {
            off = this.event.watch(next);
            return
        } else {
            off = this.event.on(next);
        }

        if (this.disposable) {
            this.disposable.add(off);
        }

        const dispose = () => {
            off();

            this.disposable.remove(off);
        };

        return new SubscriptionLike(dispose);
    }

    toPromise() {
        return new Promise(resolve => {
            let isResolved = false;
            const sub = this.subscribe(() => {
                resolve();
                isResolved = true;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            });

            if (isResolved && sub) {
                sub.unsubscribe();
            }
        });
    };

    pipe(...operators) {
        let target = this;
        for (let op of operators) {
            target = op(target);
        }

        return target;
    }
}

export class SubjectLike extends ObservableEvent {
    constructor() {
        super(new Event(), false, new Disposable());
    }

    next(value) {
        this.event.emit(value);
    }

    complete() {
        this.disposable.finalize();
    }
}