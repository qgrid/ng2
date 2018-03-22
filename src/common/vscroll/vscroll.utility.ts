var rAF = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;

	var UNSET_ARM = Number.MAX_SAFE_INTEGER;
	var UNSET_OFFSET = 0;

	function capitalize(text) {
		return text[0].toUpperCase() + text.slice(1);
	}

	function sizeFactory(size, container, element, index) {
		if (isFunction(size)) {
			return function () {
				return size(element, container.position + index);
			}
		}

		if (isNumber(size)) {
			return function () {
				return size;
			}
		}

		throw new Error('vscroll invalid size option ' + size);
	}

	var findIndexAt = function (items, value) {
		var length = items.length;
		var min = 0;
		var max = length - 1;
		while (min <= max) {
			var mid = (min + max) >> 1;
			var k = items[mid];
			if (k === value) {
				return mid;
			}
			else if (k < value) {
				min = mid + 1;
			}
			else {
				max = mid - 1;
			}
		}

		return min;
	};

	var recycleFactory = function (items) {
		var offsets = [];
		return function (index, count) {
			var threshold = items.length;
			var cursor = offsets.length;
			var diff = Math.min(count, threshold + index) - cursor;

			for (var i = threshold - diff; i < threshold; i++) {
				var value = items[i]();
				if (cursor === 0) {
					offsets[cursor] = value;
				}
				else {
					offsets[cursor] = offsets[cursor - 1] + value;
				}

				cursor++;
			}

			return offsets;
		};
	};

	var findPosition = function (offsets, value, itemSize) {
		if (itemSize) {
			var index = Math.round(value / itemSize);
			return {
				index: index,
				offset: itemSize * index,
				lastOffset: 0,
				value: value
			};
		}

		var index = findIndexAt(offsets, value);
		var length = offsets.length;
		if (index > 0) {
			return {
				index: index,
				offset: offsets[index - 1],
				lastOffset: offsets[length - 1],
				value: value
			};
		}

		return {
			index: 0,
			offset: 0,
			lastOffset: length ? offsets[length - 1] : 0,
			value: value
		};
	};

	var Event = function () {
		var events = [];

		this.on = function (f) {
			events.push(f);
			return function () {
				var index = events.indexOf(f);
				if (index >= 0) {
					events.splice(index, 1);
				}
			}
		};

		this.emit = function (e) {
			var temp = events.slice();
			for (var i = 0, length = temp.length; i < length; i++) {
				temp[i](e);
			}
		};
	};

	function placeholderBitmap(width, height) {
		var minWidth = Math.max(width, 1);
		var minHeight = Math.max(height, 1);
		var canvas = document.createElement('canvas');
		canvas.width = Math.max(width * 2, 1);
		canvas.height = Math.max(height * 2, 1);

		var ctx = canvas.getContext('2d');
		ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
		ctx.fillRect(0, 0, minWidth, minHeight);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
		ctx.fillRect(width, height, minWidth, minHeight);

		return canvas.toDataURL();
	}