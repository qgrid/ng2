function vscrollColumnDirective() {
    return {
        restrict: 'A',
        require: '^vscrollPortX',
        link: function ($scope, $element, $attrs, port) {
            var index = parseInt($attrs.vscrollColumn);
            if (isNaN(index)) {
                throw new Error('vscroll incorrect index "' + $attrs.vscrollColumn + '" for column')
            }

            var column = $element[0];
            var context = port.context;
            var size = sizeFactory(context.settings.columnWidth, context.container, column, index);
            port.setItem(index, size);
            $scope.$on('$destroy', function () {
                port.removeItem(index);
            });
        }
    };
}