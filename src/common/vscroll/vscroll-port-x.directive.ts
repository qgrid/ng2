function vscrollPortXDirective() {
    return {
        scope: true,
        restrict: 'A',
        controller: ['$element', vscrollPortCtrlFactory(xLayoutFactory)],
        require: ['^vscroll', 'vscrollPortX'],
        controllerAs: '$portX',
        bindToController: {
            context: '<vscrollPortX'
        },
        link: vscrollPortLinkFactory(
            'vscrollPortX',
            function (newValue, oldValue) {
                return !oldValue.portWidth || newValue.scrollLeft !== oldValue.scrollLeft;
            }
        )
    };
}
