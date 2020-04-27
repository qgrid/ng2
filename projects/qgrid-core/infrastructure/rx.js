export class SubscriptionLike {
    constructor(off, disposable) {
        this.off = off;
        this.disposable = disposable;
    }

    unsubscribe() {
        if (this.off) {
            this.off();
            this.disposable.remove(this.off);

            this.off = null;
        }
    }
}

export class ObservableLike {
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

        this.disposable.add(off);
        return new SubscriptionLike(off, this.disposable);
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