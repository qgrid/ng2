import { Event } from 'ng2-qgrid/core/infrastructure';
import { rAF } from './vscroll.utility';

export class VscrollContainer {
    public count = 0;
    public total = 0;
    public position = 0;
    public cursor = 0;
    public page = 0;
    public items = [];
    public force = true;
    public resetEvent = new Event();
    public updateEvent = new Event();
    public drawEvent = new Event();

    tick(f) {
        rAF(f);
    }

    read(f) {
        f();
    }

    write(f) {
        f();
    }

    apply: function (f, emit) {
    emit(f);
},

update: function (count, force) {
    var self = this;
    var threshold = settings.threshold;
    var cursor = self.cursor;
    var oldPage = self.page;
    var newPage = Math.ceil((cursor + threshold) / threshold) - 1;

    if (self.count !== count) {
        self.count = count;
        self.total = Math.max(self.total, count);
        self.updateEvent.emit({
            force: isUndef(force)
                ? (isNumber(settings.rowHeight) && settings.rowHeight > 0) || (isNumber(settings.columnWidth) && settings.columnWidth > 0)
                : force
        });
    }

    if (force || newPage > oldPage) {
        self.page = newPage;

        var deferred = $q.defer();
        deferred.promise
            .then(function (count) {
                if (count !== self.total) {
                    self.total = count;
                    self.force = true;

                    self.updateEvent.emit({
                        force: isUndef(force)
                            ? (isNumber(settings.rowHeight) && settings.rowHeight > 0) || (isNumber(settings.columnWidth) && settings.columnWidth > 0)
                            : force
                    });
                }
            });

        if (newPage === 0) {
            settings.fetch(0, threshold, deferred);
        }
        else {
            var skip = (oldPage + 1) * threshold;
            if (self.total < skip) {
                deferred.resolve(self.total);
            }
            else {
                var take = (newPage - oldPage) * threshold;
                settings.fetch(skip, take, deferred);
            }
        }

    }
},

reset: function () {
    this.count = 0;
    this.total = 0;
    this.position = 0;
    this.cursor = 0;
    this.page = 0;
    this.items = [];

    this.force = true;

    var e = { handled: false, source: 'container' };
    this.resetEvent.emit(e);
    this.update(this.count, true);
}
};
