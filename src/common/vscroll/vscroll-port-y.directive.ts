function vscrollPortYDirective() {
    return {
        scope: true,
        restrict: 'A',
        controller: ['$element', vscrollPortCtrlFactory(yLayoutFactory)],
        require: ['^vscroll', 'vscrollPortY'],
        controllerAs: '$portY',
        bindToController: {
            context: '<vscrollPortY'
        },
        link: vscrollPortLinkFactory(
            'vscrollPortY',
            function (newValue, oldValue) {
                return !oldValue.portHeight || newValue.scrollTop !== oldValue.scrollTop;
            })
    };
}