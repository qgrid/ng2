
	function vscrollCtrl($scope, $element, $window) {
		var box = $element[0];
		var window = $window;
		var scrollEvent = new Event();
		var resetEvent = new Event();

		this.scrollEvent = scrollEvent;
		this.resetEvent = resetEvent;
		this.element = box;

		this.drawPlaceholder = function (width, height) {
			var style = box.style;
			var placeholder = placeholderBitmap(width || box.clientWidth, height || box.clientHeight);

			style.backgroundImage = 'url(' + placeholder + ')';
			style.backgroundRepeat = 'repeat';
		};

		this.resetX = function () {
			box.scrollLeft = 0;
		};

		this.resetY = function () {
			box.scrollTop = 0;
		};

		var onScroll = function () {
			scrollEvent.emit();
		};

		var onResize = function () {
			var e = { handled: false, source: 'resize' };
			resetEvent.emit(e);
		};

		box.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);

		$scope.$on('$destroy', function () {
			box.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		});
	}

	function vscrollDirective() {
		return {
			restrict: 'A',
			controller: vscrollCtrl
		};
	}