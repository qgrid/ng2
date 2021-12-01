import { Disposable } from '../infrastructure/disposable';
import { Event } from '../event/event';

export declare interface ObserverLike<T> {
    next(value?: T): void;
    error(ex: Error): void;
    complete(): void;
}

export declare interface UnsubscribableLike {
    unsubscribe(): void;
    readonly closed: boolean;
}

export declare interface SubscribableLike<T> {
    subscribe(observer?: Partial<ObserverLike<T>>): UnsubscribableLike;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: null | undefined, error: null | undefined, complete: () => void): UnsubscribableLike;
    /** @deprecated Use an observer instead of an error callback */
    subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): UnsubscribableLike;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): UnsubscribableLike;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): UnsubscribableLike;
}

export declare interface UnaryFunctionLike<T, R> {
    (source: T): R;
}

export declare interface OperatorFunctionLike<T, R> extends UnaryFunctionLike<ObservableLike<T>, ObservableLike<R>> {
}

export declare interface ObservableLike<T> extends SubscribableLike<T> {
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

    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): UnsubscribableLike;
    subscribe(observer: Partial<ObserverLike<T>>): UnsubscribableLike;

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

export declare class SubjectLike<T> extends ObservableEvent<T> implements ObserverLike<T> {
    constructor();

    next(value?: T): void;
    error(ex: Error): void;
    complete(): void;
}