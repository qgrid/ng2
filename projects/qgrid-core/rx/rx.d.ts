import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';

export declare class SubscriptionLike {
    unsubscribe(): void;
    readonly closed: boolean;
}

export interface UnaryFunctionLike<T, R> {
    (source: T): R;
}

export interface OperatorFunctionLike<T, R> extends UnaryFunctionLike<ObservableLike<T>, ObservableLike<R>> {
}

export declare interface ObservableLike<T> {
    subscribe(next: (value: T) => void): SubscriptionLike;
    toPromise(): Promise<T>;

    pipe(): ObservableLike<T>;
    pipe<A>(op1: OperatorFunctionLike<T, A>): ObservableLike<A>;
    pipe<A, B>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>): ObservableLike<B>;
    pipe<A, B, C>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>): ObservableLike<C>;
    pipe<A, B, C, D>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>): ObservableLike<D>;
    pipe<A, B, C, D, E>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>): ObservableLike<E>;
    pipe<A, B, C, D, E, F>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>): ObservableLike<F>;
    pipe<A, B, C, D, E, F, G>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>): ObservableLike<G>;
    pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>): ObservableLike<H>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>): ObservableLike<I>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>, ...operations: OperatorFunctionLike<any, any>[]): ObservableLike<{}>;
}


export declare class ObservableEvent<T> implements ObservableLike<T> {
    constructor(event: Event<T>, disposable: Disposable);

    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): SubscriptionLike;
    subscribe(observer: Partial<{
        next: (value: T) => void;
        error: (err: any) => void;
        complete: () => void;
    }>);

    toPromise(): Promise<T>;
    pipe(): ObservableLike<T>;
    pipe<A>(op1: OperatorFunctionLike<T, A>): ObservableLike<A>;
    pipe<A, B>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>): ObservableLike<B>;
    pipe<A, B, C>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>): ObservableLike<C>;
    pipe<A, B, C, D>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>): ObservableLike<D>;
    pipe<A, B, C, D, E>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>): ObservableLike<E>;
    pipe<A, B, C, D, E, F>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>): ObservableLike<F>;
    pipe<A, B, C, D, E, F, G>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>): ObservableLike<G>;
    pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>): ObservableLike<H>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>): ObservableLike<I>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunctionLike<T, A>, op2: OperatorFunctionLike<A, B>, op3: OperatorFunctionLike<B, C>, op4: OperatorFunctionLike<C, D>, op5: OperatorFunctionLike<D, E>, op6: OperatorFunctionLike<E, F>, op7: OperatorFunctionLike<F, G>, op8: OperatorFunctionLike<G, H>, op9: OperatorFunctionLike<H, I>, ...operations: OperatorFunctionLike<any, any>[]): ObservableLike<{}>;
}

export declare class ObservableReplyEvent<T> extends ObservableEvent<T> {
}

export declare class SubjectLike<T> extends ObservableEvent<T> {
    constructor();

    next(value?: T);
    error(ex: Error);
    complete();
}

