import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';
import { noop } from '../utility/kit';

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

let count = 0;

export class ObservableEvent {
    constructor(event, disposable) {
        this.errorSignal = new Event();
        this.nextSignal = event;
        this.disposable = disposable;
    }

    subscribe(next, error, complete) {
        if (error) {
            const errorOff = this.errorSignal.on(error);
            this.disposable.add(errorOff);
        }

        if (next) {
            const eventOff = this.subscribeEvent(next);

            let disposed = false;
            const unsubscribe = () => {
                if (!disposed) {
                    disposed = true;

                    eventOff();
                    this.disposable.remove(unsubscribe);
 
                    if (complete) {
                        complete();
                    }
                }
            };

            this.disposable.add(unsubscribe);
            return new SubscriptionLike(unsubscribe);
        }

        return new SubscriptionLike(noop);
    }

    subscribeEvent(next) {
        return this
            .nextSignal
            .on(e => {
                try {
                    next(e);
                } catch (ex) {
                    this.catchError(ex);
                }
            });
    }

    catchError(ex) {
        this.errorSignal.emit(ex);
        throw ex;
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

export class ObservableReplyEvent extends ObservableEvent {
    subscribeEvent(next) {
        return this
            .nextSignal
            .watch(e => {
                try {
                    next(e);
                } catch (ex) {
                    this.catchError(ex);
                }
            });
    }
}

export class SubjectLike extends ObservableEvent {
    constructor() {
        super(
            new Event(),
            new Disposable()
        );
    }

    next(value) {
        this.nextSignal.emit(value);
    }

    complete() {
        this.disposable.finalize();
    }

    error(ex) {
        this.catchError(ex);
    }
}