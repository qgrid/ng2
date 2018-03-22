function vscrollMarkDirective() {
    return {
        restrict: 'A',
        require: ['^?vscrollPortX', '^?vscrollPortY'],
        link: function ($scope, $element, $attrs, ctrls) {
            var element = $element[0];
            var mark = $attrs.vscrollMark;
            var ports = ctrls.filter(function (ctrl) {
                return !!ctrl;
            });

            ports.forEach(function (port) {
                port.markup[mark] = element;
            });

            $scope.$on('$destroy', function () {
                ports.forEach(function (port) {
                    if (port.markup) {
                        port.markup[mark] = null;
                    }
                });
            });
        }
    };
}