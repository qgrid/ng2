import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';
import { noop, isFunction } from '../utility/kit';
import { GridError } from '../infrastructure/error';

export class UnsubscribableLike {
    constructor(off) {
        this.off = off;
        this.closed = false;
    }

    unsubscribe() {
        if (!this.closed) {
            this.off();
            this.off = null;
            this.closed = true;
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
            return new UnsubscribableLike(unsubscribe);
        }

        return new UnsubscribableLike(noop);
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
        let source = this;
        for (let op of operators) {
            source = op(source);
        }

        return source;
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

        this.isCompleted = false;
    }

    next(value) {
        if (this.isCompleted) {
            throw new GridError('rx', 'can\'t call next, observable is completed');
        }

        this.nextSignal.emit(value);
    }

    error(ex) {
        if (this.isCompleted) {
            throw new GridError('rx', 'can\'t call error, observable is completed');
        }

        this.catchError(ex);
    }

    complete() {
        if (!this.isCompleted) {
            this.isCompleted = true;
            this.disposable.finalize();
        }
    }
}

export class Operator extends SubjectLike {
    constructor(subscriber) {
        super();
        
        this.subscriber = subscriber;
    }

    subscribe(...args) {
        super.subscribe(...args);
        this.subscriber(this);
    }
}