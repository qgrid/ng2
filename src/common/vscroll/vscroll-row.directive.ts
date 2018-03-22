

function vscrollRowDirective() {
    return {
        restrict: 'A',
        require: '^vscrollPortY',
        link: function ($scope, $element, $attrs, port) {
            var index = parseInt($attrs.vscrollRow);
            if (isNaN(index)) {
                throw new Error('vscroll incorrect index "' + $attrs.vscrollRow + '" for row');
            }

            var row = $element[0];
            var context = port.context;
            var size = sizeFactory(context.settings.rowHeight, context.container, row, index);

            port.setItem(index, size);
            $scope.$on('$destroy', function () {
                port.removeItem(index);
            });
        }
    };
}