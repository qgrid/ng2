function vscrollFilter() {
    var empty = [];

    return function (data, context) {
        if (!data) {
            return empty;
        }

        if (!context) {
            throw new Error('vscroll filter context is not set');
        }

        var count = data.length;
        var container = context.container;

        container.update(count);
        if (count) {
            var view = container.items;
            var cursor = container.cursor;
            var settings = context.settings;
            var threshold = settings.threshold;
            var first = cursor; // Math.min(Math.max(0, count - threshold), cursor);
            if (container.force || first !== container.position) {
                var last = Math.min(cursor + threshold, count);
                container.position = first;
                container.drawEvent.emit({
                    first: first,
                    last: last,
                    position: cursor
                });

                view.length = last - first;
                for (var i = first, j = 0; i < last; i++ , j++) {
                    view[j] = data[i];
                }

                container.force = false;
            }

            return view;
        }

        return empty;
    };
}
