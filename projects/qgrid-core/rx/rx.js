import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';
import { noop, isObject, isFunction } from '../utility/kit';

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
    constructor(nextSignal, disposable) {
        this.errorSignal = new Event();
        this.nextSignal = nextSignal;
        this.disposable = disposable;
    }

    subscribe(...args) {
        let observer = args[0];
        if (isFunction(observer)) {
            observer = {
                next: args[0],
                error: args[1],
                complete: args[2]
            };
        }

        if (observer.error) {
            const errorOff = this.errorSignal.on(ex => observer.error(ex));
            this.disposable.add(errorOff);
        }

        if (observer.next) {
            const eventOff = this.subscribeEvent(e => observer.next(e));

            let disposed = false;
            const unsubscribe = () => {
                if (!disposed) {
                    disposed = true;

                    eventOff();
                    this.disposable.remove(unsubscribe);

                    if (observer.complete) {
                        observer.complete();
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
                    throw ex;
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