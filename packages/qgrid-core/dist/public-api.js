import assignWith from 'lodash-es/assignWith';
export { default as assignWith } from 'lodash-es/assignWith';
import clone from 'lodash-es/clone';
export { default as clone } from 'lodash-es/clone';
import cloneDeep from 'lodash-es/cloneDeepWith';
export { default as cloneDeep } from 'lodash-es/cloneDeepWith';
import dropWhile from 'lodash-es/dropWhile';
export { default as dropWhile } from 'lodash-es/dropWhile';
import flatten from 'lodash-es/flatten';
export { default as flatten } from 'lodash-es/flatten';
import isArray from 'lodash-es/isArray';
export { default as isArray } from 'lodash-es/isArray';
import isBoolean from 'lodash-es/isBoolean';
export { default as isBoolean } from 'lodash-es/isBoolean';
import isDate from 'lodash-es/isDate';
export { default as isDate } from 'lodash-es/isDate';
import same from 'lodash-es/isEqual';
export { default as same } from 'lodash-es/isEqual';
import isFunction from 'lodash-es/isFunction';
export { default as isFunction } from 'lodash-es/isFunction';
import isNumber from 'lodash-es/isNumber';
export { default as isNumber } from 'lodash-es/isNumber';
import isObject from 'lodash-es/isObject';
export { default as isObject } from 'lodash-es/isObject';
import isString from 'lodash-es/isString';
export { default as isString } from 'lodash-es/isString';
import isUndefined from 'lodash-es/isUndefined';
export { default as isUndefined } from 'lodash-es/isUndefined';
import max from 'lodash-es/maxBy';
export { default as max } from 'lodash-es/maxBy';
import min from 'lodash-es/minBy';
export { default as min } from 'lodash-es/minBy';
import startCase from 'lodash-es/startCase';
export { default as startCase } from 'lodash-es/startCase';
import sumBy from 'lodash-es/sumBy';
export { default as sumBy } from 'lodash-es/sumBy';
import takeWhile from 'lodash-es/takeWhile';
export { default as takeWhile } from 'lodash-es/takeWhile';
import uniq from 'lodash-es/uniq';
export { default as uniq } from 'lodash-es/uniq';
import zip from 'lodash-es/zip';
export { default as zip } from 'lodash-es/zip';
import FastDom from 'fastdom';
import cssEscape from 'css.escape';
import LIVR from 'livr';

class Action {
	constructor(command, title, icon, templateUrl) {
		this.command = command;

		this.title = title;
		this.icon = icon;
		this.templateUrl = templateUrl;
	}
}

class Resource {
	constructor(data = {}, scope = {}) {
		this.data = data;
		this.scope = scope;
	}
}

const controlSet = new Set([
	'shift',
	'ctrl',
	'alt',
	'pause',
	'break',
	'capslock',
	'escape',
	'insert',
	'left',
	'right',
	'end',
	'home',
	'pageup',
	'pagedown',
	'up',
	'down',
	'f1',
	'f2',
	'f3',
	'f4',
	'f5',
	'f6',
	'f7',
	'f8',
	'f9',
	'f10',
	'f11',
	'f12',
	'numlock',
	'scrolllock'
]);

const nonPrintableSet = new Set([
	'enter'
]);

const codeMap = new Map()
	.set(8, 'backspace')
	.set(9, 'tab')
	.set(13, 'enter')
	.set(16, 'shift')
	.set(17, 'ctrl')
	.set(18, 'alt')
	.set(20, 'capslock')
	.set(27, 'escape')
	.set(32, 'space')
	.set(33, 'pageup')
	.set(34, 'pagedown')
	.set(35, 'end')
	.set(36, 'home')
	.set(37, 'left')
	.set(38, 'up')
	.set(39, 'right')
	.set(40, 'down')
	.set(45, 'insert')
	.set(46, 'delete')
	.set(96, 'numpad0')
	.set(97, 'numpad1')
	.set(98, 'numpad2')
	.set(99, 'numpad3')
	.set(100, 'numpad4')
	.set(101, 'numpad5')
	.set(102, 'numpad6')
	.set(103, 'numpad7')
	.set(104, 'numpad8')
	.set(105, 'numpad9')
	.set(112, 'f1')
	.set(113, 'f2')
	.set(114, 'f3')
	.set(115, 'f4')
	.set(116, 'f5')
	.set(117, 'f6')
	.set(118, 'f7')
	.set(119, 'f8')
	.set(120, 'f9')
	.set(121, 'f10')
	.set(122, 'f11')
	.set(123, 'f12')
	.set(144, 'numlock')
	.set(145, 'scrolllock');

const codeSet = new Set(codeMap.values());

const printableMap = new Map()
	.set('space', ' ');

class Keyboard {
	static isPrintable(code) {
		return !nonPrintableSet.has(code) && !Keyboard.isControl(code);
	}

	static isControl(code) {
		return controlSet.has(code);
	}

	static stringify(code, key) {
		if (codeSet.has(code)) {
			return printableMap.get(code) || '';
		}

		return key;
	}

	static translate(code) {
		return codeMap.get(code) || String.fromCharCode(code);
	}
}

class Shortcut {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
		this.keyCode = {
			key: null,
			code: null
		};
	}

	static isControl(keyCode) {
		if (!keyCode) {
			return false;
		}

		const code = keyCode.code;
		const parts = code.split('+');
		return parts.some(part => part === 'ctrl' || part === 'alt') ||
			parts.every(part => Keyboard.isControl(part));
	}

	static isPrintable(keyCode) {
		if (!keyCode) {
			return false;
		}

		const code = keyCode.code;
		const parts = code.split('+');
		return parts.some(part => Keyboard.isPrintable(part));
	}

	static stringify(keyCode) {
		if (!keyCode) {
			return '';
		}

		return Keyboard.stringify(keyCode.code, keyCode.key);
	}

	static translate(e) {
		const codes = [];
		const code = Keyboard.translate(e.keyCode).toLowerCase();
		if (e.ctrlKey) {
			codes.push('ctrl');
		}

		if (e.shiftKey) {
			codes.push('shift');
		}

		if (e.altKey) {
			codes.push('alt');
		}

		if (code !== 'ctrl' &&
			code !== 'shift' &&
			code !== 'alt') {
			codes.push(code);
		}

		return codes.join('+');
	}

	factory(manager) {
		const self = this;
		return {
			register: commands => self.register(manager, commands)
		};
	}

	keyDown(e, source) {
		const code = Shortcut.translate(e);
		this.keyCode = {
			key: e.key,
			code: code
		};

		return this.dispatcher.execute(code, source);
	}

	register(manager, commands) {
		return this.dispatcher.register(manager, commands);
	}
}

const noop = () => { };
const yes = () => true;
const no = () => false;
const identity = x => x;

const toCamelCase = (...names) => {
	const length = names.length;
	const nameList = names.map(name => '' + name);
	if (length > 0) {
		return (nameList[0] +
			nameList.slice(1)
				.map(name => name[0].toUpperCase() + name.substring(1, name.length))
				.join(''));
	}

	return '';
};

const isEmail = value => {
	if (value) {
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
		return re.test(value);
	}

	return false;
};

function compare(x, y) {
	if (x === y) {
		return 0;
	}

	if (x === null || x === undefined || x === '') {
		return 1;
	}

	if (y === null || y === undefined || y === '') {
		return -1;
	}

	return x > y ? 1 : -1;
}

function orderBy(data, selectors, compares) {
	const length = selectors.length;
	const result = [];
	const count = data.length;

	// iterate through data to create array with applied selectors
	let index = count;
	while (index--) {
		const row = data[index];
		const criteria = [];
		for (let i = 0; i < length; i++) {
			const select = selectors[i];
			criteria.push(select(row));
		}

		result.push({ row, criteria, index });
	}

	// multi selector comparator
	const compare = (x, y) => {
		let result = 0;
		for (let i = 0; i < length; i++) {
			const compare = compares[i];
			const xv = x.criteria[i];
			const yv = y.criteria[i];

			result = compare(xv, yv, x.row, y.row);
			if (result !== 0) {
				return result;
			}
		}

		// ensures a stable sort
		return x.index - y.index;
	};

	result.sort(compare);

	// copy origin values to result array
	index = count;
	while (index--) {
		result[index] = result[index].row;
	}

	return result;
}

function htmlEncode(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function escapeRegexp(text) {
	if (!text)
		return text;

	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function binarySearch(list, value) {
	let low = 0;
	let high = list.length;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (list[mid] < value) {
			low = mid + 1;
		}
		else {
			high = mid;
		}
	}

	return low;
}

function isUrl(value) {
	var a = document.createElement('a');
	a.href = value;
	return (a.host && a.host != window.location.host);
}

function isImage(value) {
	return ('' + value).match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function matchISO8601(date) {
	return /^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2})))))))$/.test('' + date)
}

function getTypeName(type) {
	if (type.name) {
		return type.name;
	}

	const nameRegexp = /function (.{1,})\(/;
	const results = (nameRegexp).exec(type.constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
}

const WILDCARD_SYMBOL = '*';
const notWildcard = cmd => cmd.shortcut !== WILDCARD_SYMBOL;


class ShortcutDispatcher {
	constructor() {
		this.managerMap = new Map();
	}

	register(manager, commands) {
		commands = commands.values ? commands.values() : commands;
		let context = this.managerMap.get(manager);
		if (!context) {
			context = {
				commands: [],
				shortcuts: new Map()
			};

			this.managerMap.set(manager, context);
		}

		const disposes = [];
		for (let cmd of commands) {
			if (cmd.shortcut) {
				if (isFunction(cmd.shortcut)) {
					context.commands.push(cmd);
					disposes.push(() => {
						const index = context.commands.indexOf(cmd);
						if (index >= 0) {
							context.commands.splice(index, 1);
						}
					});
				}
				else {
					cmd.shortcut
						.toLowerCase()
						.split('|')
						.forEach(shct => {
							let shortcuts = [];
							if (context.shortcuts.has(shct)) {
								shortcuts = context.shortcuts.get(shct);
							}

							shortcuts.push(cmd);
							context.shortcuts.set(shct, shortcuts);
							disposes.push(() => {
								const shortcutCommands = context.shortcuts.get(shct);
								if (shortcutCommands) {
									const index = shortcutCommands.indexOf(cmd);
									if (index >= 0) {
										shortcutCommands.splice(index, 1);
										if (!shortcutCommands.length) {
											context.shortcuts.delete(shct);
										}
									}
								}
							});
						});
				}
			}
		}

		return () => {
			disposes.forEach(dispose => dispose());
			if (context.commands.length === 0 && Object.keys(context.shortcuts).length === 0) {
				this.managerMap.delete(manager);
			}
		};
	}

	execute(code, source) {
		const activities = this.fetchActivities(code, source);

		return activities.reduce((memo, activity) => {
			const commands = activity.commands;
			const manager = activity.manager;
			const result = manager.invoke(commands, null, source) || result;
			if (result) {
				memo.push(...commands.map(cmd => cmd.source));
			}
			return memo;
		}, []);
	}

	canExecute(code, source) {
		const activities = this.fetchActivities(code, source);
		return activities.length > 0;
	}

	fetchActivities(code, source) {
		const search = this.searchFactory(code);

		const candidates = Array
			.from(this.managerMap.entries())
			.map(([manager, context]) => ({
				manager,
				commands: manager.filter(search(context), source)
			}));

		// Skip wildcard commands if there are some explicit shortcuts
		const allCommands = flatten(candidates.map(x => x.commands));
		const hasNotWildcardCommand = allCommands.filter(notWildcard).length > 0;
		const test = hasNotWildcardCommand ? notWildcard : yes;
		return candidates
			.map(({ commands, manager }) => ({
				manager,
				commands: commands.filter(test),
			}))
			.filter(({ commands }) => commands.length > 0);
	}

	searchFactory(code) {
		return context => {
			let result = [];
			if (context.shortcuts.has(code)) {
				result = result.concat(context.shortcuts.get(code));
			}

			if (context.shortcuts.has(WILDCARD_SYMBOL) && code !== WILDCARD_SYMBOL) {
				result = result.concat(context.shortcuts.get(WILDCARD_SYMBOL));
			}

			result = result.concat(context.commands
				.map(cmd => cmd.clone({ shortcut: cmd.shortcut() }))
				.filter(cmd => this.test(cmd.shortcut, code)));

			return result;
		};
	}

	test(shortcut, code) {
		code = code.toLowerCase();
		return ('' + shortcut)
			.toLowerCase()
			.split('|')
			.some(shct => shct === WILDCARD_SYMBOL || code === shct);
	}
}

class CommandManager {
	constructor(apply = f => f(), context) {
		this.apply = apply;
		this.context = context;
	}

	invoke(commands, context) {
		context = context || this.context;
		if (commands.length) {

			const priorityCommands = Array.from(commands);
			priorityCommands.sort((x, y) => y.priority - x.priority);

			this.apply(() => {
				for (const cmd of priorityCommands) {
					if (context) {
						if (cmd.execute(context) === false) {
							break;
						}
					} else {
						if (cmd.execute() === false) {
							break;
						}
					}

				}
			});

			return true;
		}

		return false;
	}

	filter(commands) {
		return commands.filter(cmd => cmd.sink = cmd.canExecute());
	}
}

class ActionState {
	constructor() {
		this.resource = new Resource();

		this.items = [];

		this.shortcut = new Shortcut(new ShortcutDispatcher());
		this.manager = new CommandManager();
	}
}

class AnimationState {
	constructor() {
		this.apply = [];
	}
}

class Fastdom {
    static mutate(task) {
        return Fastdom.invoke(() => FastDom.mutate(task));
    }

    static measure(task) {
        return Fastdom.invoke(() => FastDom.measure(task));
    }

    static clear(task) {
        return Fastdom.invoke(() => FastDom.clear(task));
    }

    static invoke(task) {
        return task();
    }
}

const GRID_PREFIX = 'q-grid';

class Event {
	constructor(reply) {
		this.handlers = [];

		this.lastArg = null;
		this.reply = reply || (() => this.lastArg);
	}

	on(next, lifecycle = 'app') {
		const { handlers } = this;

		const handler = { next, lifecycle };
		const off = () => {
			const index = handlers.indexOf(handler);
			if (index >= 0) {
				handlers.splice(index, 1);
			}
		};

		handler.off = off;
		handlers.push(handler);

		return off;
	}

	watch(next, lifecycle = 'app') {
		const off = this.on(next, lifecycle);
		if (this.lastArg) {
			const e = this.reply();
			next(e, off);
		}

		return off;
	}

	emit(value) {
		this.lastArg = value;

		const handlers = Array.from(this.handlers);
		for (let i = 0, length = handlers.length; i < length; i++) {
			const handler = handlers[i];
			handler.next(value, handler.off);
		}
	}
}

class Defer {
	constructor() {
		this.promise = new DeferPromise();
	}

	reject() {
		this.promise.reject();
	}

	resolve(value) {
		this.promise.resolve(value);
	}
}

class DeferPromise {
	constructor() {
		this.catchEvent = new Event();
		this.thenEvent = new Event();
	}

	reject() {
		this.catchEvent.emit();
		return this;
	}

	resolve(value) {
		this.thenEvent.emit(value);
		return this;
	}

	catch(handler) {
		this.catchEvent.on(handler);
		return this;
	}

	then(handler) {
		this.thenEvent.on(handler);
		return this;
	}
}

class GridError extends Error {
	constructor(name, message) {
		super(message);
		this.name = this.constructor.name;
		this.message = `qgrid.${name}: ${message}`;
		if (isFunction(Error.captureStackTrace)) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error(message)).stack;
		}
	}
}

function jobLine(delay) {
	let defer = null;
	const reset = () => {
		if (defer) {
			defer.reject();
			defer = null;
		}
	};

	return job => {
		reset();

		if (!isFunction(job)) {
			throw new GridError('job.line', 'job is not invocable');
		}

		const doJob = () => {
			if (defer) {
				job();
				defer.resolve();
				defer = null;
			}
		};

		defer = jobLine.run(doJob, delay);
		return defer.promise;
	};
}

jobLine.run = (job, delay) => {
	const defer = new Defer();

	const token = Fastdom.invoke(() => setTimeout(job, delay));
	defer.promise.catch(() => clearTimeout(token));

	return defer;
};

const VERTICAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-vertical`;
const HORIZONTAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-horizontal`;
const DEFAULT_DELTA_Y = 100;

class BodyHost {
	constructor(plugin) {
		this.plugin = plugin;
		this.scrollingJob = jobLine(100);
	}

	scroll(e) {
		const { model, table } = this.plugin;
		const { scroll } = model;

		const oldValue = scroll();
		const newValue = {};
		let hasChanges = false;
		if (oldValue.top !== e.scrollTop) {
			table.view.addClass(VERTICAL_SCROLL_CLASS);
			newValue.top = e.scrollTop;
			hasChanges = true;
		}

		if (oldValue.left !== e.scrollLeft) {
			table.view.addClass(HORIZONTAL_SCROLL_CLASS);
			newValue.left = e.scrollLeft;
			hasChanges = true;
		}

		if (hasChanges) {
			scroll(newValue, {
				source: 'body.core',
				behavior: 'core'
			});
		}

		this.scrollingJob(this.scrollEnd.bind(this));
	}

	scrollEnd() {
		const { table } = this.plugin;

		table.view.removeClass(VERTICAL_SCROLL_CLASS);
		table.view.removeClass(HORIZONTAL_SCROLL_CLASS);
	}

	wheel(e) {
		if (e.shiftKey) {
			return;
		}

		const { model, table } = this.plugin;
		if (model.edit().status === 'view') {
			const { scroll } = model;
			const upper = 0;

			Fastdom.measure(() => {
				const lower = table.view.scrollHeight() - table.view.height();
				const deltaY = DEFAULT_DELTA_Y * Math.sign(e.deltaY);
				const top = Math.min(lower, Math.max(upper, scroll().top + deltaY));

				scroll({ top }, { source: 'body.core' });
			});
		}
	}

	mouseLeave() {
		this.clearHighlight();
	}

	clearHighlight() {
		const { view } = this.plugin;
		const { highlight } = view;
		if (highlight.clear.canExecute()) {
			highlight.clear.execute();
		}
	}
}

/*eslint-disable  no-console*/

class Log {
	static info(source, message) {
		//console.info(`qgrid.${source}: ${message}`);
	}

	static warn(source, message) {
		//console.warn(`qgrid.${source}: ${message}`);
	}

	static error(source, message) {
		console.error(`qgrid.${source}: ${message}`);
	}
}

/*eslint-enable*/

class Node {
	constructor(key, level = 0, type = 'group') {
		this.key = key;
		this.level = level;
		this.rows = [];
		this.children = [];
		this.type = type;
		this.source = null;
		this.value = null;
		
		this.state = {
			expand: false
		};
	}
}

class RowDetails {
	constructor(item, column) {
		this.item = item;
		this.column = column;
	}
}

function compile$1(parts) {
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function (entry, value) {
			if (arguments.length === 2) {
				const host = accessor(entry);
				if (host) {
					host[key] = value;
				}

				Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
				return;
			}

			const host = accessor(entry);
			if (host) {
				return host[key];
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		};
	}

	return function (entry, value) {
		if (!entry) {
			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		}

		if (arguments.length === 2) {
			entry[key] = value;
		}

		return entry[key];
	};
}

function compileGet(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function (entry) {
			const host = accessor(entry);
			if (host) {
				return host[key];
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		};
	}

	return function (entry) {
		if (!entry) {
			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
			return null;
		}

		return entry[key];
	};
}

function compileSet(path) {
	const parts = path.split('.');
	const last = parts.length - 1;
	const accessor = getAccessor(parts, last);
	const key = parts[last];
	if (accessor) {
		return function (entry, value) {
			const host = accessor(entry);
			if (host) {
				host[key] = value;
				return;
			}

			Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
		};
	}

	return function (entry, value) {
		if (entry) {
			entry[key] = value;
			return;
		}

		Log.warn('path.compile', `Object reference ${parts.join('.')} is not set.`);
	};
}

function getAccessor(parts, last) {
	if (parts.length > 1) {
		const firstPart = parts[0];
		return parts
			.filter((_, index) => index > 0 && index !== last)
			.reduce(
				(accessor, part) => {
					return graph => {
						const host = accessor(graph);
						if (host) {
							return host[part];
						}

						return null;
					}
				},
				graph => {
					if (graph) {
						return graph[firstPart];
					}

					return null;
				}
			);
	}

	return null;
}

function getValue$1(row, column) {
	return column.$value
		? column.$value({ $row: row, $column: column })
		: column.value
			? column.value(row)
			: column.path
				? compileGet(column.path)(row)
				: row[column.key];
}

function getValueFactory(column) {
	const get = column.$value
		? row => column.$value({ $row: row, $column: column })
		: column.value
			? row => column.value(row)
			: column.path
				? compileGet(column.path)
				: row => row[column.key];

	return get;
}

function setValue(row, column, value) {
	if (isFunction(column.$value)) {
		return column.$value({ $row: row, $value: value, $column: column });
	}

	if (isFunction(column.value)) {
		return column.value(row, value);
	}

	if (column.path) {
		return compileSet(column.path)(row, value);
	}

	if (row.hasOwnProperty(column.key)) {
		return row[column.key] = value;
	}

	throw new GridError(
		'value',
		`Row can't be edit on "${column.key}" column`
	);
}

function getLabel(row, column) {
	return column.$label
		? isFunction(column.$label) ? column.$label({ $row: row }) : column.$label
		: column.label
			? isFunction(column.label) ? column.label(row) : column.label
			: column.labelPath
				? compileGet(column.labelPath)(row)
				: getValue$1(row, column);
}

function getLabelFactory(column) {
	const get = column.$label
		? isFunction(column.$label) ? row => column.$label({ $row: row }) : row => column.label
		: column.label
			? isFunction(column.label) ? row => column.label(row) : row => column.label
			: column.labelPath
				? compileGet(column.labelPath)
				: row => getValue$1(row, column);

	return get;
}

function setLabel(row, column, label) {
	if (isFunction(column.$label)) {
		return column.$label({ $row: row, $label: label });
	}

	if (isFunction(column.label)) {
		return column.label(row, label);
	}

	if (column.labelPath) {
		return compileSet(column.labelPath)(row, label);
	}
}

class CacheStrategy {
    constructor(plugin, strategy) {
        const { model, observeReply } = plugin;
        let storage = new Map();

        const defaultGetValue =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `valueFactory-${column.key}`;
                select = storage.get(key);
                if (!select) {
                    select = getValueFactory(column);
                    storage.set(key, select);
                }

                return strategy.getValue(row, column, select, rowIndex, columnIndex);
            };

        const readonlyGetValue =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `getValue-${rowIndex}x${column.key}`;
                if (storage.has(key)) {
                    return storage.get(key);
                }

                const value = defaultGetValue(row, column, select, rowIndex, columnIndex);
                storage.set(key, value);
                return value;
            };

        const defaultGetLabel =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `labelFactory-${column.key}`;
                select = storage.get(key);
                if (!select) {
                    select = getLabelFactory(column);
                    storage.set(key, select);
                }

                return strategy.getLabel(row, column, select, rowIndex, columnIndex);
            };

        const readonlyGetLabel =
            (row, column, select, rowIndex, columnIndex) => {
                const key = `getLabel-${rowIndex}x${column.key}`;
                if (storage.has(key)) {
                    return storage.get(key);
                }

                const value = defaultGetLabel(row, column, select, rowIndex, columnIndex);
                storage.set(key, value);
                return value;
            };


        this.getValue = defaultGetValue;
        this.getLabel = defaultGetLabel;

        this.colspan = (row, column, rowIndex, columnIndex) => {
            const key = `colspan-${rowIndex}x${column.model.key}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.colspan(row, column, rowIndex, columnIndex);
            storage.set(key, value);
            return value;
        };

        this.rowspan = (row, column, rowIndex, columnIndex) => {
            const key = `rowspan-${rowIndex}x${column.model.key}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.rowspan(row, column, rowIndex, columnIndex);
            storage.set(key, value);
            return value;
        };

        this.columns = (row, pin, rowIndex) => {
            const key = `columns-${pin}-${rowIndex}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.columns(row, pin, rowIndex);
            storage.set(key, value);
            return value;
        };

        this.setValue = (...args) => strategy.setValue(...args);
        this.setLabel = (...args) => strategy.setLabel(...args);

        this.columnList = (pin = 'mid') => {
            const key = `columnList-${pin}`;
            if (storage.has(key)) {
                return storage.get(key);
            }

            const value = strategy.columnList(pin);
            storage.set(key, value);
            return value;
        };

        observeReply(model.sceneChanged)
            .subscribe(e => {
                if (e.hasChanges('status')) {
                    if (e.state.status !== 'stop') {
                        storage = new Map();
                    }
                }
            });

        observeReply(model.gridChanged)
            .subscribe(e => {
                if (e.hasChanges('isReadonly')) {
                    storage = new Map();

                    if (e.state.isReadonly) {
                        this.getValue = readonlyGetValue;
                        this.getLabel = readonlyGetLabel;
                    } else {
                        this.getValue = getValue;
                        this.getLabel = this.getLabel;
                    }
                }
            });
    }
}

function defaultGetValue(row, column, select) {
	return select(row, column);
}

// This class is not inheritable, but construct in a way to use it as a composition without binding to `this`.
class DataRow {
	constructor(plugin) {
		const { model, observeReply } = plugin;
		let area = {};

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					area = e.state.column.area;
					e.state.column.line;
				}
			});

		this.getValue = defaultGetValue;
		this.getLabel = defaultGetValue;
		this.setValue = setValue;
		this.setLabel = setLabel;

		this.colspan = (row, column) => column.colspan;
		this.rowspan = () => 1;

		const columnList = (pin = 'mid') => area[pin] || [];

		this.columnList = columnList;
		this.columns = (row, pin) => columnList(pin);
	}
}

const resolvers = {};
class TemplatePath {
	constructor() {
	}

	static register(name, resolve) {
		if (resolvers.hasOwnProperty(name)) {
			throw new GridError(
				'template.path',
				`"${name}" is already registered`);
		}

		resolvers[name] = resolve;
		return TemplatePath;
	}

	static get(source) {
		const path = this.find(source);
		if (!path) {
			throw new GridError(
				'template.path',
				'Template path can\'t be found');
		}

		return path;
	}

	static find(source) {
		const getName = this.name;
		for (let key of Object.keys(resolvers)) {
			const name = getName(key);
			const value = source[name];
			if (!isUndefined(value) && value !== null) {
				const path = resolvers[key](source, value);
				if (path) {
					return path;
				}
			}
		}

		return null;
	}

	static getName(name) {
		return '_' + name;
	}

	static get require() {
		const getName = this.name;
		return Object.keys(resolvers)
			.reduce((memo, key) => {
				memo[getName(key)] = `^^?${key}`;
				return memo;
			}, {});
	}
}

TemplatePath.register('custom-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('custom-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class ColumnModel {
	constructor(type = 'text') {
		this.key = null;
		this.path = null;
		this.labelPath = null;

		this.type = type;
		this.title = null;
		this.description = null;
		this.pin = 'mid';
		this.origin = 'specific';
		this.source = 'user';
		this.category = 'data';
		this.class = null;
		this.editor = null;
		this.editorOptions = {
			modelFactory: ({ createDefaultModel }) => createDefaultModel(),
			trigger: 'click', // click | custom | focus
			cruise: 'control', // control | transparent
			label: null,
			value: identity,
			actions: []
		};

		this.width = null;
		this.minWidth = null;
		this.maxWidth = null;
		this.viewWidth = null;

		this.widthMode = 'relative'; // relative | absolute | fit-head

		this.canEdit = true;
		this.canResize = true;
		this.canSort = true;
		this.canMove = true;
		this.canFilter = true;
		this.canHighlight = true;
		this.canFocus = true;

		this.isVisible = true;
		this.index = -1;

		this.value = null;
		this.label = null;

		this.compare = compare;

		this.children = [];

		this.$label = null;
		this.$value = null;

		this.itemLabel = identity;

		this.startNumber = 1;
	}

	toString() {
		return `${this.type}: ${this.title}`;
	}
}

class ColumnView {
	constructor(model) {
		this.model = model;

		this.colspan = 1;
		this.rowspan = 1;
		this.rowIndex = -1;
		this.columnIndex = -1;
	}

	static model(model) {
		if (model) {
			ColumnView.assign(model);
		}
		else {
			model = new ColumnModel();
		}

		model.origin = 'custom';
		return model;
	}

	static assign(body) {
		const etalon = this.model();
		for (let key of Object.keys(etalon)) {
			if (!body.hasOwnProperty(key)) {
				let etalonValue = etalon[key];
				if (isFunction(etalonValue)) {
					etalonValue = etalonValue.bind(body);
				}
				body[key] = etalonValue;
			} else {
				const value = body[key];
				if (isArray(value)) {
					body[key] = Array.from(value);
				} else if (isObject(value) && !isFunction(value)) {
					body[key] = Object.assign({}, etalon[key], value);
				}
			}
		}
		return body;
	}
}

class FormatService {
    static number(x, format) {
        return x;
    }

    static date(x, format) {
        return x;
    }

    static currency(x, format) {
        return x;
    }
}

class DataColumnModel extends ColumnModel {
	constructor() {
		super(...arguments);

		this.isDefault = true;
		this.aggregation = null;
		this.aggregationOptions = {
			distinct: false,
			separator: '; '
		};
	}
}

TemplatePath.register('array-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('array-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class ArrayColumnModel extends DataColumnModel {
	constructor() {
		super('array');

		this.itemType = 'text';
		this.itemFormat = '';

		this.label = function (row) {
			const value = getValue$1(row, this);
			if (isArray(value)) {
				let formatter;
				switch (this.itemType) {
					case 'number': {
						formatter = FormatService.number;
						break;
					}
					case 'date':
					case 'datetime': {
						formatter = FormatService.date;
						break;
					}
					default: {
						formatter = this.itemLabel.bind(this);
						break;
					}
				}

				const format = this.itemFormat;
				return value.map(item => formatter(item, format)).join(', ');
			}

			return value;
		};
	}
}

class ArrayColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ArrayColumn.assign(model) : new ArrayColumnModel();
	}
}

TemplatePath.register('bool-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('bool-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class BoolColumnModel extends DataColumnModel {
	constructor() {
		super('bool');

		this.trueValue = true;
		this.falseValue = false;

		this.editorOptions.cruise = 'transparent';

		// as we use 'this' pointer inside, we can't use lambda in 2 here
		this.isIndeterminate = function (value) {
			return !(value === this.trueValue || value === this.falseValue);
		};

		this.isChecked = function (value) {
			return value === this.trueValue;
		};
	}
}

class BoolColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? BoolColumn.assign(model) : new BoolColumnModel();
	}
}

TemplatePath.register('cohort-cell', (template) => {
	return {
		model: template.for,
		resource: `${template.for}.${template.type}`
	};
});

class CohortColumnModel extends ColumnModel {
	constructor() {
		super('cohort');

		this.key = '$cohort';

		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canFocus = false;
		this.canFilter = false;
		this.category = 'cohort';
	}
}

class CohortColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? CohortColumn.assign(model) : new CohortColumnModel();
	}
}

TemplatePath.register('currency-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('currency-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});


class CurrencyColumnModel extends DataColumnModel {
	constructor() {
		super('currency');

		this.maxLength = 20;
		this.symbol = '$';
		this.code = 'USD';
	}
}

class CurrencyColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? CurrencyColumn.assign(model) : new CurrencyColumnModel();
	}
}

// TODO: right now we check the empty result on null, 
// we need to have a way to make it more explicitly
function parseFactory(type, editor) {
	switch (type) {
		case 'id': {
			type = editor ? editor : 'text';
			break;
		}
	}

	switch (type) {
		case 'text':
		case 'email':
		case 'url':
		case 'password':
			return parseText;
		case 'number':
		case 'currency':
			return parseNumber;
		case 'date':
			return parseDate;
		case 'time':
		case 'datetime':
			return parseDateTime;
		case 'bool':
			return parseBool;
		case 'array':
			return parseArray;
		default:
			return identity;
	}
}

function compareParseFactory(type, editor) {
	switch (type) {
		case 'id': {
			type = editor ? editor : 'text';
			break;
		}
	}

	switch (type) {
		case 'date':
			return x => {
				const date = parseDate(x);
				if (date) {
					return date.getTime();
				}

				return date;
			};
		case 'time':
		case 'datetime':
			return x => {
				const date = parseDateTime(x);
				if (date) {
					return date.getTime();
				}

				return date;
			};
		default: {
			return parseFactory(type, editor);
		}
	}
}



function resolveType(values) {
	const types = values
		.filter(x => !(isUndefined(x) || x === null || x === ''))
		.map(getType$1);

	if (types.length) {
		const test = types[0];
		if (types.every(x => x === test)) {
			return test;
		}
	}

	return 'text';
}

function getType$1(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = findType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (isNumber(value)) {
		return 'number';
	}

	if (isBoolean(value)) {
		return 'bool';
	}

	if (isDate(value)) {
		return 'datetime';
	}

	if (isString(value)) {
		return 'text';
	}

	if (isObject(value)) {
		return 'object';
	}

	return 'text';

}

function inferType(values) {
	const types = values
		.filter(x => !(isUndefined(x) || x === null || x === ''))
		.map(findType);

	if (types.length) {
		const test = types[0];
		if (types.every(x => x === test)) {
			return test;
		}
	}

	return 'text';
}

function findType(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = findType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (likeNumber(value)) {
		return 'number';
	}

	if (isBoolean(value)) {
		return 'bool';
	}

	if (likeDateTime(value)) {
		return 'datetime';
	}

	if (likeDate(value)) {
		return 'date';
	}

	if (isEmail(value)) {
		return 'email';
	}

	if (isImage(value)) {
		return 'image';
	}

	if (isUrl(value)) {
		return 'url';
	}

	if (isString(value)) {
		return 'text';
	}

	if (isObject(value)) {
		return 'object';
	}

	return 'text';
}

function isPrimitive(type) {
	switch (type) {
		case 'date':
		case 'time':
		case 'bool':
		case 'text':
		case 'number':
		case 'email':
		case 'url':
			return true;
		default:
			return false;
	}
}

function likeDateTime(value) {
	if (value === null || isUndefined(value) || value === '') {
		return false;
	}

	if (value instanceof Date) {
		return true;
	}

	value = '' + value;

	return matchISO8601(value);
}

function likeDate(value) {
	if (value === null || isUndefined(value) || value === '') {
		return false;
	}

	if (value instanceof Date) {
		return true;
	}

	value = '' + value;

	// part of ISO_8601 for dates
	return !!value.match(/^(\d{4})(-(\d{2})(-(\d{2})))$/);
}

function likeNumber(value) {
	if (isNaN(value)) {
		return false;
	}

	const number = Number.parseFloat(value);
	return !isNaN(number) && isFinite(number);
}

function parseBool(value) {
	return value === null || isUndefined(value)
		? value
		: !!value;
}

function parseText(value) {
	return value === null || isUndefined(value)
		? value
		: '' + value;
}

function parseDate(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '') {
		return null;
	}

	if (value instanceof Date) {
		return new Date(
			value.getFullYear(),
			value.getMonth(),
			value.getDate(),
			0, 0, 0, 0
		);
	}

	if (likeDate(value) || matchISO8601(value)) {
		const yearMonthDay = ('' + value).split('-');
		return new Date(
			Number.parseInt(yearMonthDay[0]),
			Number.parseInt(yearMonthDay[1]) - 1,
			Number.parseInt(yearMonthDay[2]),
			0, 0, 0, 0
		);
	}

	return new Date('' + value);
}

function parseDateTime(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '') {
		return null;
	}

	if (value instanceof Date) {
		return value;
	}

	const date = new Date('' + value);
	return date;
}

function parseNumber(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '' || isNaN(value)) {
		return null;
	}

	const number = Number.parseFloat(value);
	if (!isNaN(number) && isFinite(number)) {
		return number;
	}

	return null;
}

function parseArray(value) {
	return value;
}

TemplatePath.register('date-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('date-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class DateColumnModel extends DataColumnModel {
	constructor() {
		super('date');

		this.format = 'MM/dd/yyyy';
		this.parse = parseFactory('date');

		this.label = function (row) {
			const value = getValue$1(row, this);
			try {
				const date = this.parse(value);
				return FormatService.date(date, this.format);
			} catch (ex) {
				Log.error('date.column', ex);
				return value;
			}
		};
	}
}

class DateColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateColumn.assign(model) : new DateColumnModel();
	}
}

TemplatePath.register('datetime-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('datetime-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class DateTimeColumnModel extends DataColumnModel {
	constructor() {
		super('datetime');

		this.format = 'MM/dd/yyyy h:mm a';
		this.dateFormat = 'MM/dd/yyyy';
		this.timeFormat = 'h:mm a';
		this.parse = parseFactory('datetime');

		this.label = function (row) {
			const value = getValue$1(row, this);
			try {
				const date = this.parse(value);
				return FormatService.date(date, this.format);
			} catch (ex) {
				Log.error('datetime.column', ex);
				return value;
			}
		};
	}
}

class DateTimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateTimeColumn.assign(model) : new DateTimeColumnModel();
	}
}

TemplatePath.register('email-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('email-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class EmailColumnModel extends DataColumnModel {
	constructor() {
		super('email');

		this.editorOptions.trigger = 'custom';
	}
}

class EmailColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? EmailColumn.assign(model) : new EmailColumnModel();
	}
}

function isFileAnImage(name) {
	return !!name && name.toLowerCase().search(/png|jpg|jpeg|svg/) > -1;
}

TemplatePath.register('file-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('file-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class FileColumnModel extends DataColumnModel {
	constructor() {
		super('file');

		this.canUpload = yes;
		this.editorOptions.trigger = 'custom';

		this.hasPreview = name => isFileAnImage(name);
		this.canSort = false;
		this.canFilter = false;
	}
}

class FileColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? FileColumn.assign(model) : new FileColumnModel();
	}
}

TemplatePath.register('group-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.type
	};
});

TemplatePath.register('group-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class GroupColumnModel extends ColumnModel {
	constructor() {
		super('group');

		this.key = '$group';
		this.path = 'key';
		this.labelPath = 'key';
		this.title = 'Group';
		this.offset = 24;
		this.canEdit = false;
		this.canSort = false;
		this.canFilter = false;
		this.category = 'control';
		this.by = null;
		this.label = function (node) {
			if (node.type === 'row') {
				return '';
			}

			const { by, labelPath } = this;
			return !by || by === node.source ? node[labelPath] : '';
		};
	}
}

class GroupColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? GroupColumn.assign(model) : new GroupColumnModel();
	}
}

TemplatePath.register('group-summary-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class GroupSummaryColumnModel extends DataColumnModel {
	constructor() {
		super('group-summary');

		this.key = '$group.summary';
		this.category = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.canSort = false;
		this.canMove = false;
	}
}

class GroupSummaryColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? GroupSummaryColumn.assign(model) : new GroupSummaryColumnModel();
	}
}

TemplatePath.register('id-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('id-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class IdColumnModel extends DataColumnModel {
	constructor() {
		super('id');
	}
}

class IdColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? IdColumn.assign(model) : new IdColumnModel();
	}
}

TemplatePath.register('image-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('image-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class ImageColumnModel extends DataColumnModel {
	constructor() {
		super('image');

		this.canSort = false;
		this.canFilter = false;
		this.canUpload = yes;

		this.hasPreview = name => isFileAnImage(name);
	}
}

class ImageColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ImageColumn.assign(model) : new ImageColumnModel();
	}
}

TemplatePath.register('number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('number-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class NumberColumnModel extends DataColumnModel {
	constructor() {
		super('number');

		this.format = '';
	}
}

class NumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? NumberColumn.assign(model) : new NumberColumnModel();
	}
}

TemplatePath.register('pad-cell', (template) => {
	return {
		model: template.for,
		resource: `${template.for}.${template.type}`
	};
});

class PadColumnModel extends ColumnModel {
	constructor() {
		super('pad');

		this.key = '$pad';
		this.category = 'markup';

		this.title = '';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFocus = false;
		this.canMove = false;
		this.canFilter = false;		
		this.source = 'generation';
	}
}

class PadColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PadColumn.assign(model) : new PadColumnModel();
	}
}

TemplatePath.register('password-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('password-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class PasswordColumnModel extends DataColumnModel {
	constructor() {
		super('password');

		this.canSort = false;
		this.canFilter = false;
	}
}

class PasswordColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PasswordColumn.assign(model) : new PasswordColumnModel();
	}
}

TemplatePath.register('pivot-cell', (template) => {
	return {
		model: 'pivot',
		resource: template.for
	};
});

class PivotColumnModel extends ColumnModel {
	constructor() {
		super('pivot');

		this.key = '$pivot';
		this.title = 'Pivot';

		this.source = 'generation';
		this.category = 'pivot';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canFilter = false;
		this.canMove = false;
	}
}

class PivotColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PivotColumn.assign(model) : new PivotColumnModel();
	}
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

class Guard {
	/**
	 * If value is undefined exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notUndefined(value, name) {
		if (isUndefined(value)) {
			throw new GridError('guard.notUndefined', name);
		}
	}


	/**
	 * If value is null or undefined exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notNull(value, name) {
		if (value === null || isUndefined(value)) {
			throw new GridError('guard.notNull', name);
		}
	}

	/**
	 * If value is null or undefined or empty exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static notNullOrEmpty(value, name) {
		if (value === null || isUndefined(value) || value === '') {
			throw new GridError('guard.notNullOrEmpty', name);
		}
	}

	/**
	 * If value is not a function exception will be thrown
	 * @param {any} value - Value to check
	 * @param {string} name - Argument name
	 */
	static invokable(value, name) {
		if (!isFunction(value)) {
			throw new GridError('guard.invokable', name);
		}
	}
	
	static hasProperty(instance, name) {
		Guard.notNull(instance, 'instance');
		if (!hasOwnProperty.call(instance, name)) {
			throw new GridError('guard.hasProperty', name);
		}
	}
}

function equals(x, y) {
	// TODO: improve equality algorithm
	if (x === y) {
		return true;
	}

	if (isArray(x)) {
		if (x.length === 0 && y.length === 0) {
			return true;
		}
	}

	if (x instanceof Map) {
		if (x.size === 0 && y.size === 0) {
			return true;
		}
	}

	if (x instanceof Set) {
		if (x.size === 0 && y.size === 0) {
			return true;
		}
	}

	return false;
}

class Model {
	constructor() {
		this.accessors = new Map();
	}

	inject(name, Type) {
		const accessor = this.resolveAccessor(name, Type);
		this[name + 'Changed'] = accessor.changed;
		this[name] = accessor.state;
	}

	resolveAccessor(name, Type) {
		if (this.accessors.has(name)) {
			throw new GridError(
				'model',
				`${name} accessor already exists`
			);
		}

		const accessor = this.buildAccessor(name, Type);
		this.accessors.set(Type, accessor);
		return accessor;
	}

	buildAccessor(name, Type) {
		let state = new Type();

		const changeSet = new Set();
		const reply = () => {
			const replyChanges = Array.from(changeSet.values())
				.reduce((memo, key) => {
					const value = state[key];
					memo[key] = { newValue: value, oldValue: value };
					return memo;
				}, {});

			return {
				state,
				changes: replyChanges,
				hasChanges: replyChanges.hasOwnProperty.bind(replyChanges),
				tag: {},
				source: 'watch',
			};
		};

		const event = new Event(reply);
		const getter = () => state;
		const setter = (newState, tag) => {
			if (!isObject(newState)) {
				throw new GridError(
					`model.${name}`,
					`"${newState}" is not a valid type, should be an object`);
			}

			const changes = {};
			let hasChanges = false;

			const keys = Object.keys(newState);
			for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
				const key = keys[i];
				if (!state.hasOwnProperty(key)) {
					throw new GridError(
						`model.${name}`,
						`"${key}" is not a valid key, only [${Object.keys(state).join(', ')}] keys are supported`
					);
				}

				const newValue = newState[key];
				const oldValue = state[key];
				if (!equals(newValue, oldValue)) {
					Log.info('model', `value changed - "${name}.${key}"`);
					Guard.notUndefined(newValue, `model.${name}.${key}`);

					state[key] = newValue;
					hasChanges = true;
					changes[key] = { newValue, oldValue };

					changeSet.add(key);
				}
				else {
					Log.warn('model', `value was not changed - "${name}.${key}"`);
				}
			}

			if (hasChanges) {
				state = {
					...state
				};

				event.emit({
					state,
					changes,
					hasChanges: changes.hasOwnProperty.bind(changes),
					tag: tag || {},
					source: 'emit'
				});
			}

			return this;
		};

		const accessor = (...args) => {
			if (args.length) {
				return setter(args[0], args[1]);
			}

			return getter();
		};

		return {
			changed: event,
			state: accessor,
		};
	}

	resolve(Type) {
		let accessor = this.accessors.get(Type);
		if (!accessor) {
			const name = getTypeName(Type);
			accessor = this.resolveAccessor(name, Type);
		}

		return accessor;
	}
}

TemplatePath.register('reference-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('reference-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class ReferenceColumnModel extends DataColumnModel {
	constructor() {
		super('reference');

		this.editorOptions.trigger = 'custom';		
	}
}

class ReferenceColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ReferenceColumn.assign(model) : new ReferenceColumnModel();
	}
}

TemplatePath.register('row-details-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowDetailsColumnModel extends ColumnModel {
	constructor() {
		super('row-details');

		this.key = '$row.details';
		this.category = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.canSort = false;
		this.canMove = false;
	}
}

class RowDetailsColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowDetailsColumn.assign(model) : new RowDetailsColumnModel();
	}
}

TemplatePath.register('row-expand-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowExpandColumnModel extends ColumnModel {
	constructor() {
		super('row-expand');

		this.key = '$row.expand';
		this.category = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canFilter = false;
		this.canSort = false;
		this.canHighlight = false;
		this.canMove = false;
	}
}

class RowExpandColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowExpandColumn.assign(model) : new RowExpandColumnModel();
	}
}

TemplatePath.register('row-indicator-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowIndicatorColumnModel extends ColumnModel {
	constructor() {
		super('row-indicator');

		this.key = '$row.indicator';
		this.category = 'control';

		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canMove = false;
		this.canFocus = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.pin = 'left';
	}
}

class RowIndicatorColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowIndicatorColumn.assign(model) : new RowIndicatorColumnModel();
	}
}

TemplatePath.register('row-number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowNumberColumnModel extends ColumnModel {
	constructor() {
		super('row-number');

		this.pin = 'left';
		this.key = '$row.number';
		this.title = 'No.';
		this.canEdit = false;
		this.canResize = true;
		this.canFocus = false;
		this.canMove = false;
		this.canHighlight = false;
		this.canSort = false;
		this.canFilter = false;
		this.category = 'control';
	}
}

class RowNumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowNumberColumn.assign(model) : new RowNumberColumnModel();
	}
}

TemplatePath.register('row-options-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('row-options-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class RowOptionsColumnModel extends DataColumnModel {
	constructor() {
		super('row-options');

		this.key = '$row.options';
		this.category = 'control';

		this.canEdit = true;
		this.canResize = false;
		this.canMove = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.pin = 'right';
	}
}

class RowOptionsColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowOptionsColumn.assign(model) : new RowOptionsColumnModel();
	}
}

TemplatePath.register('select-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('select-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class SelectColumnModel extends ColumnModel {
	constructor() {
		super('select');

		this.key = '$select';
		this.title = '';
		this.category = 'control';

		this.canEdit = false;
		this.editorOptions.cruise = 'transparent';
		this.value = noop;

		this.canResize = false;
	}
}

class SelectColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? SelectColumn.assign(model) : new SelectColumnModel();
	}
}

TemplatePath.register('text-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('text-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

TemplatePath.register('text-area-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class TextColumnModel extends DataColumnModel {
	constructor() {
		super('text');

		this.maxLength = 140;
	}
}

class TextColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TextColumn.assign(model) : new TextColumnModel();
	}
}

TemplatePath.register('time-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('time-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class TimeColumnModel extends DataColumnModel {
	constructor() {
		super('time');

		this.format = 'h:mm a';
	}
}

class TimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TimeColumn.assign(model) : new TimeColumnModel();
	}
}

TemplatePath.register('url-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('url-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class UrlColumnModel extends DataColumnModel {
	constructor() {
		super('url');

		this.editorOptions.trigger = 'custom';
	}
}

class UrlColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? UrlColumn.assign(model) : new UrlColumnModel();
	}
}

function merge$2(target, source) {
	if (target && source) {
		return assignWith(target, source, (s, t) => isUndefined(s) ? t : s);
	}

	return target || clone(source);
}

function columnFactory(model) {
	const { columnList } = model;
	const columnMap = {
		'array': ArrayColumn,
		'bool': BoolColumn,
		'cohort': CohortColumn,
		'currency': CurrencyColumn,
		'custom': ColumnView,
		'date': DateColumn,
		'datetime': DateTimeColumn,
		'email': EmailColumn,
		'file': FileColumn,
		'group': GroupColumn,
		'id': IdColumn,
		'image': ImageColumn,
		'number': NumberColumn,
		'pad': PadColumn,
		'password': PasswordColumn,
		'pivot': PivotColumn,
		'reference': ReferenceColumn,
		'row-details': RowDetailsColumn,
		'row-expand': RowExpandColumn,
		'row-indicator': RowIndicatorColumn,
		'row-number': RowNumberColumn,
		'row-options': RowOptionsColumn,
		'select': SelectColumn,
		'group-summary': GroupSummaryColumn,
		'text': TextColumn,
		'time': TimeColumn,
		'url': UrlColumn
	};

	const create = (entityType, columnType, body) => {
		const Type = columnMap[entityType];
		const { reference } = columnList();
		const defaultSettings = reference['$default'];
		body = merge$2(body, defaultSettings);
		const typeSettings = reference[columnType];
		body = merge$2(body, typeSettings);

		const model = Type.model(body);
		return new Type(model);
	};

	return (type, body = null) => {
		if (!type) {
			type = 'text';
		}

		if (columnMap.hasOwnProperty(type)) {
			return create(type, type, body);
		}

		return create('custom', type, body);
	};
}

class DetailsRow {
	constructor(model, dataRow) {
		const createColumn = columnFactory(model);
		const emptyColumn = createColumn('pad', { key: 'row-details-pad' });

		this.columns = dataRow.getColumns;
		this.rowspan = dataRow.rowspan;

		this.colspan = (rowDetails, column) => {
			return sumBy(dataRow.columnList(column.model.pin), c => c.colspan);
		};

		this.columns = (rowDetails, pin) => {
			if (rowDetails.column.model.pin === pin) {
				return [rowDetails.column];
			}

			return [emptyColumn];
		};

		this.getValue = () => null;
		this.getLabel = () => null;
		this.setValue = () => null;
		this.setLabel = () => null;
	}
}

class Aggregation {
	constructor() {
	}

	static first(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		return getValue(rows[0]);
	}

	static last(rows, getValue) {
		const length = rows.length;
		if (!length) {
			return null;
		}

		return getValue(rows[length - 1]);
	}

	static max(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let max = Number.MIN_SAFE_INTEGER;
		while (length--) {
			max = Math.max(max, getValue(rows[length]));
		}

		return max;
	}

	static min(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let min = Number.MAX_SAFE_INTEGER;
		while (length--) {
			min = Math.min(min, getValue(rows[length]));
		}

		return min;
	}

	static minMax(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let min = Number.MAX_SAFE_INTEGER;
		let max = Number.MIN_SAFE_INTEGER;
		while (length--) {
			const value = getValue(rows[length]);
			min = Math.min(min, value);
			max = Math.max(max, value);
		}

		return [min, max];
	}

	static avg(rows, getValue, options) {
		const length = rows.length;
		if (!length) {
			return null;
		}

		if (options.distinct) {
			const set = new Set();
			return Aggregation.sum(rows, getValue, options, set) / set.size;
		}

		return Aggregation.sum(rows, getValue, options) / length;
	}

	static sum(rows, getValue, options, set) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let sum = 0;
		if (options.distinct) {
			set = set || new Set();
			while (length--) {
				const value = getValue(rows[length]);
				if (!set.has(value)) {
					sum += value;
					set.add(value);
				}
			}
		} else {
			while (length--) {
				sum += Number(getValue(rows[length]));
			}
		}

		return sum;
	}

	static join(rows, getValue, options) {
		const length = rows.length;
		if (!length) {
			return null;
		}

		let result = getValue(rows[0]);
		const separator = options.separator || '';

		if (options.distinct) {
			const set = new Set();
			let value = result;
			set.add(value);

			let i = 1;
			while (i < length) {
				value = getValue(rows[i]);

				if (!set.has(value)) {
					result += separator + value;
					set.add(value);
				}

				i++;
			}
		} else {
			let i = 1;
			while (i < length) {
				result += separator + getValue(rows[i]);
				i++;
			}
		}

		return result;
	}

	static count(rows, getValue, options) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		if (options.distinct) {
			let set = new Set();
			while (length--) {
				const count = Number(getValue(rows[length]));
				set.add(count);
			}

			return set.size;
		}

		return length;
	}

}

function flattenFactory(model) {
	const { mode, summary } = model.group();

	let push = (node, pos, result) => result.push(node);
	switch (mode) {
		case 'rowspan': {
			push = (node, pos, result) => {
				if (node.level === 0 || pos > 0) {
					result.push(node);
				}
			};
			break;
		}
	}

	let pushSummary = noop;
	switch (summary) {
		case 'leaf': {
			pushSummary = (node, pos, result, parent, posInParent) => {
				if (parent && parent.children.length - 1 === posInParent) {
					const { level, key } = node;
					const summary = new Node(`${key}-group-summary`, level, 'summary');
					summary.rows = Array.from(node.rows);
					result.push(summary);
				}
			};
			break;
		}
	}

	return function flatView(nodes, result = [], parent = null, pos = 0) {
		for (let i = 0, iLength = nodes.length; i < iLength; i++) {
			const node = nodes[i];
			push(node, i, result, parent, pos);

			if (node.state.expand) {
				const children = node.children;
				if (children.length) {
					flatView(children, result, node, i);
				}
				else {
					const { rows, level, key } = node;
					const nextLevel = level + 1;
					for (let j = 0, jLength = rows.length; j < jLength; j++) {
						const child = new Node(key, nextLevel, 'row');
						const row = rows[j];
						child.rows = [row];

						children.push(child);
						push(child, j, result, parent, pos);
					}
				}

				pushSummary(node, i, result, parent, pos);
			}
		}

		return result;
	};
}

function findFirstLeaf(node) {
	if (node.type !== 'group') {
		return node;
	}

	if (!node.state.expand) {
		return null;
	}

	return node.children.length && findFirstLeaf(node.children[0]);
}

class NodeRow {
	constructor(model, dataRow) {
		const { columnList, rowspan } = dataRow;

		this.columnList = columnList;
		this.rowspan = rowspan;

		const createColumn = columnFactory(model);
		const reference = {
			group: createColumn('group'),
			summary: createColumn('group-summary')
		};

		this.getLabel =
			this.getValue = (node, column, select, rowIndex, columnIndex) => {
				if (column.type === 'pivot') {
					return dataRow.getLabel(node, column, select, rowIndex, columnIndex);
				}

				const { rows } = model.data();
				switch (node.type) {
					case 'group':
					case 'summary': {
						const agg = column.aggregation;
						if (agg) {
							if (!Aggregation.hasOwnProperty(agg)) {
								throw new GridError(
									'node.row',
									`Aggregation ${agg} is not supported`);
							}

							const groupRows = node.rows.map(i => rows[i]);
							return Aggregation[agg](groupRows, select, column.aggregationOptions);
						}

						return null;
					}
					case 'row': {
						const rowIndex = node.rows[0];
						return select(rows[rowIndex], column);
					}
					case 'value': {
						return select(node, column);
					}
					default:
						throw new GridError(
							'node.row',
							`Invalid node type ${node.type}`
						);
				}
			};

		this.setValue = (node, column, value, rowIndex, columnIndex) => {
			switch (node.type) {
				case 'row': {
					const { rows } = model.data();
					const rowIndex = node.rows[0];
					dataRow.setValue(rows[rowIndex], column, value, rowIndex, columnIndex);
					break;
				}
				case 'value': {
					dataRow.setValue(node, column, value, rowIndex, columnIndex);
					break;
				}
				default:
					throw new GridError('node.row', `Can't set value to ${node.type} node`);
			}
		};

		this.setLabel = (node, column, value, rowIndex, columnIndex) => {
			switch (node.type) {
				case 'row': {
					const { rows } = model.data();
					const rowIndex = node.rows[0];
					dataRow.setLabel(rows[rowIndex], column, value, rowIndex, columnIndex);
					break;
				}
				case 'value': {
					dataRow.setLabel(node, column, value, rowIndex, columnIndex);
					break;
				}
				default:
					throw new GridError('node.row', `Can't set label to ${node.type} node`);
			}
		};

		this.colspan = (node, column) => {
			if (node.type === 'summary') {
				return sumBy(columnList(column.model.pin), c => c.colspan);
			}

			return column.colspan;
		};

		this.columns = (node, pin) => {
			if (node.type === 'summary') {
				// TODO: add pin support
				return [reference.summary];
			}

			return columnList(pin);
		};

		this.findGroupColumn = (pin) => {
			const columns = columnList();
			let groupColumn = columns.find(c => c.model.type === 'group');
			if (!groupColumn) {
				groupColumn = reference.group;
				if (groupColumn.model.pin === pin) {
					const firstColumn = columnList(pin)[0];
					groupColumn.columnIndex = firstColumn ? firstColumn.columnIndex : 0;
				}
			}

			return groupColumn.model.pin !== pin ? null : groupColumn;
		};
	}
}

class RowspanNodeRow {
	constructor(model, nodeRow) {
		const { columnList, getValue, getLabel, columns } = nodeRow;

		this.setValue = nodeRow.setValue;
		this.setLabel = nodeRow.setLabel;
		this.colspan = nodeRow.colspan;
		this.columnList = columnList;
		
		const rowspan = (node, column, isRoot = true) => {
			switch (node.type) {
				case 'group': {
					if (column.model.type === 'group') {
						if (node.state.expand) {
							if (!isRoot || node.source === column.model.by) {
								return node.children.reduce((memo, child, i) => memo + rowspan(child, column, false), 0);
							} else {
								if (node.children.length) {
									return rowspan(node.children[0], column, false);
								}
							}
						}
						return 1;
					}
				}
			}

			return 1;
		};

		this.rowspan = rowspan;

		const spanValue = getValue => (node, column, select) => {
			switch (node.type) {
				case 'group': {
					const leaf = findFirstLeaf(node);
					if (leaf) {
						const { rows } = model.data();
						const rowIndex = leaf.rows[0];
						return select(rows[rowIndex], column);
					}

					return null;
				}
			}

			return getValue(node, column, select);
		};

		this.getLabel = spanValue(getLabel);
		this.getValue = spanValue(getValue);

		this.columns = (node, pin) => {
			switch (node.type) {
				case 'group': {
					return dropWhile(columnList(pin), c => c.model.type === 'group' && c.model.by !== node.source);
				}
				case 'row': {
					return columnList(pin).filter(c => c.model.type !== 'group');
				}
			}

			return columns(node, pin);
		};
	}
}

class SubheadNodeRow {
	constructor(nodeRow) {
		const { columnList, columns, findGroupColumn } = nodeRow;

		this.setValue = nodeRow.setValue;
		this.setLabel = nodeRow.setLabel;
		this.getValue = nodeRow.getValue;
		this.getLabel = nodeRow.getLabel;
		this.rowspan = nodeRow.rowspan;
		this.columnList = columnList;

		this.colspan = (node, column) => {
			switch (node.type) {
				case 'group': {
					if (column.model.type === 'group') {
						const groupColumn = findGroupColumn(column.model.pin);
						if (groupColumn) {
							const nearGroupColumns = columnList(column.model.pin);
							const groupSpan = takeWhile(nearGroupColumns, c => !c.model.aggregation);
							return sumBy(groupSpan, c => c.colspan);
						}
					}
					break;
				}
			}

			return nodeRow.colspan(node, column);
		};

		this.columns = (node, pin) => {
			switch (node.type) {
				case 'group': {
					const groupColumn = findGroupColumn(pin);
					if (groupColumn) {
						const nextColumns = dropWhile(columnList(pin), c => !c.model.aggregation);
						return [groupColumn].concat(nextColumns);
					}
					break;
				}
			}

			return columns(node, pin);
		};
	}
}

class Lazy {
    constructor(build) {
        this.build = build;
    }

    get instance() {
        return this.value || (this.value = this.build());
    }
}

function flattenRows(root) {
	const rowsToUse = rowsToUseFactory();

	function markup(node, rowIndex, columnIndex, rowsLeft, result) {
		const view = node.key;
		const rowspan = rowsLeft - rowsToUse(node);
		view.rowspan = rowspan;
		view.rowIndex = rowIndex;
		view.columnIndex = columnIndex;

		const { children } = node;
		if (children.length) {
			let width = 0;
			const childResult = [];
			for (let child of children) {
				const childView = markup(child, rowIndex + rowspan, columnIndex, rowsLeft - rowspan, childResult);
				if (!childView) {
					continue;
				}

				const { colspan } = childView;
				width += colspan;
				columnIndex += colspan;
			}

			view.colspan = width;
			if (width > 0) {
				result.push(view);
				result.push(...childResult);
			}
		} else if (view.model.type !== 'cohort') {
			result.push(view);
		}

		return view;
	}

	const result = [];
	markup(root, 0, 0, rowsToUse(root), result);
	// remove root 
	result.splice(0, 1);
	return layout(result);
}

function layout(columns) {
	const mx = [];

	columns.sort((x, y) => {
		const xc = x.rowIndex - y.rowIndex;
		if (xc === 0) {
			return x.columnIndex - y.columnIndex;
		}

		return xc;
	});

	for (let column of columns) {
		if (!mx[column.rowIndex]) {
			mx[column.rowIndex] = [];
		}
		mx[column.rowIndex].push(column);
	}

	return mx;
}

function rowsToUseFactory() {
	const cache = new Map();
	return function rowsToUse(node, depth = 0) {
		const { model } = node.key;
		if (cache.has(model.key)) {
			return cache.get(model.key);
		}

		const { children } = node;
		let count = children.length == 0 ? 0 : 1;
		for (let child of children) {
			count = Math.max(count, rowsToUse(child, depth + 1));
		}

		const result = 1 + count;
		cache.set(model.key, result);
		return result;
	}
}


function expand(rows) {
	const mx = [];
	const offsets = [];
	for (let y = 0, height = rows.length; y < height; y++) {
		const columns = rows[y];
		const offset = offsets.length > y ? offsets[y] : offsets[y] = [0];
		for (let x = 0, width = columns.length; x < width; x++) {
			const column = columns[x];
			const { rowspan, colspan } = column;
			const current = offset[0];
			const next = current + colspan;
			for (let i = 0; i < rowspan; i++) {
				const yi = y + i;
				const row = mx.length > yi ? mx[yi] : mx[yi] = [];
				for (let j = 0; j < colspan; j++) {
					const xj = current + j;
					row[xj] = column;
				}

				const gaps = offsets.length > yi ? offsets[yi] : offsets[yi] = [0];
				const index = binarySearch(gaps, current);
				if (row[next]) {
					gaps.splice(index, 1);
				}
				else {
					const xi = gaps[index];
					gaps.splice(index, row[xi] ? 1 : 0, next);
				}
			}
		}
	}

	return mx;
}

function collapse(matrix) {
	const line = [];
	const height = matrix.length;
	if (height) {
		const set = new Set();
		const lastRow = matrix[height - 1];
		const width = lastRow.length;
		for (let i = 0; i < width; i++) {
			const column = lastRow[i];
			if (set.has(column)) {
				continue;
			}

			line.push(column);
			set.add(column);
		}
	}

	return line;
}

function flattenColumns(columns, result = []) {
	for (let i = 0, length = columns.length; i < length; i++) {
		const column = columns[i];
		result.push(column);

		const { children } = column;
		if (children && children.length) {
			flattenColumns(children, result);
		}
	}

	return result;
}

function findLine(columns, key) {
	for (let index = 0, length = columns.length; index < length; index++) {
		const column = columns[index];
		if (column.key === key) {
			return { columns, index };
		}

		const { children } = column;
		if (children.length) {
			const result = findLine(children, key);
			if (result) {
				return result;
			}
		}
	}

	return null;
}

function mapColumns(columns) {
	return columns.reduce((memo, column) => {
		memo[column.key] = column;
		return memo;
	}, {});
}

function getCellValue(column) {
	return isFunction(column.value)
		? row => column.value(row)
		: row => row[column.key];
}

function findColumn(columns, key) {
	const index = findIndex(columns, key);
	return index < 0 ? null : columns[index];
}

function findIndex(columns, key) {
	let { length } = columns;
	while (length--) {
		const column = columns[length];
		if (column.key == key) {
			return length;
		}
	}

	return -1;
}

function lineView(columnRows) {
	const height = columnRows.length;
	if (height === 1) {
		return Array.from(columnRows[0]);
	}

	if (height > 1) {
		const view = expand(columnRows);
		return collapse(view);
	}

	return [];
}

function widthFactory(table, form) {
	const columns = table.data.columns();
	const columnMap = mapColumns(columns);
	// 2 because pad column has left padding equals to 1px and width 100%
	// that can produce 1.## values
	const PAD_SKIP = 2;

	const occupied = columns
		.filter(c => form.has(c.key) || ('' + c.width).indexOf('%') < 0)
		.reduce((memo, c) => {
			const width = calcWidth(c);
			if (width !== null) {
				memo += width;
			}

			return memo;
		}, 0);


	let rectWidth = new Lazy(() =>
		table.view.width('head-mid')
		+ table.view.width('head-left')
		+ table.view.width('head-right')
	);

	function calcWidth(column) {
		let size = column;
		if (form.has(column.key)) {
			size = form.get(column.key);
		}

		let { width } = size;
		if (width || width === 0) {
			if (('' + width).indexOf('%') >= 0) {
				const percent = Number.parseFloat(width);
				const headWidth = rectWidth.instance;
				const skipWidth = column.widthMode === 'absolute' ? PAD_SKIP : occupied + PAD_SKIP;
				width = (headWidth - skipWidth) * percent / 100;
			}

			const MIN_WIDTH = 0;
			return Math.max(Number.parseInt(width, 10), Number.parseInt(column.minWidth, 10) || MIN_WIDTH);
		}

		// the right place it's here to avoid recalculation
		if (column.widthMode === 'fit-head') {
			// can we be here before table rendered? or we need to through error
			const { cells } = table.head.context.bag;
			const thCell = Array.from(cells).find(th => th.column === column);
			if (thCell) {
				return table.head.cell(thCell.rowIndex, thCell.columnIndex).width() + PAD_SKIP;
			}
		}

		return null;
	}

	return key => {
		let column = columnMap[key];
		if (!column) {
			throw new GridError('column.service', `Column ${key} is not found`);
		}

		return calcWidth(column);
	};
}

function groupBuilder(model) {
	const { rows } = model.data();
	const { pivot } = model.view();
	const nodes = model.scene().rows;
	const columns = model.columnList().line;

	const pivotRows = pivot.rows;
	const pivotRowLength = pivotRows[0].length;

	const groupBy = model.group().by;
	const groupByLength = groupBy.length;

	const columnMap = mapColumns(columns);

	return valueFactory => {
		const result = [];
		for (let i = 0, nodeLength = nodes.length; i < nodeLength; i++) {
			const node = nodes[i];
			const key = groupBy[Math.min(node.level, groupByLength - 1)];
			const column = columnMap[key];
			if (!column) {
				throw new GridError(
					'group.build',
					`Invalid key "${key}"`);
			}

			const aggregation = column.aggregation || 'count';
			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new GridError(
					'group.build',
					`Aggregation ${aggregation} is not registered`);
			}

			const getValue = valueFactory(column);
			const aggregate = Aggregation[aggregation];

			const aggRow = new Array(pivotRowLength);
			for (let j = 0, rowLength = node.rows.length; j < rowLength; j++) {
				const rowIndex = node.rows[j];
				const pivotRow = pivotRows[rowIndex];
				const row = rows[rowIndex];
				for (let k = 0; k < pivotRowLength; k++) {
					if (pivotRow[k]) {
						let value = aggRow[k];
						if (!value) {
							value = [];
							aggRow[k] = value;
						}
						value.push(row);
					}
				}
			}

			result.push(aggRow.map(rs => aggregate(rs, getValue, column.aggregationOptions)));
		}

		return result;
	};
}

class PivotRow {
	constructor(plugin, dataRow) {
		const { model, observeReply } = plugin;
		this.columns = dataRow.columns;
		this.rowspan = dataRow.rowspan;
		this.colspan = dataRow.colspan;

		this.getValue = dataRow.getValue;
		this.setValue = dataRow.setValue;

		this.getLabel = dataRow.getLabel;
		this.setLabel = dataRow.setLabel;

		this.columnList = dataRow.columnList;

		let pivotRows = [];

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column') || e.hasChanges('rows')) {
					const { rows } = model.view().pivot;
					if (rows.length) {
						if (model.group().by.length) {
							const build = groupBuilder(model);
							pivotRows = build(getValueFactory);
						} else {
							pivotRows = rows;
						}

						const pivotIndex = e.state.column.line.findIndex(c => c.model.type === 'pivot');

						this.getValue = (row, column, select, rowIndex, columnIndex) => {
							if (column.type === 'pivot') {
								const pivotRow = pivotRows[rowIndex];
								return pivotRow[columnIndex - pivotIndex];
							}

							return dataRow.getValue(row, column, select, rowIndex, columnIndex);
						};

						this.getLabel = (row, column, select, rowIndex, columnIndex) => {
							if (column.type === 'pivot') {
								const pivotRow = pivotRows[rowIndex];
								return pivotRow[columnIndex - pivotIndex];
							}

							return dataRow.getLabel(row, column, select, rowIndex, columnIndex);
						};
					}
					else {
						pivotRows = [];
						this.getValue = dataRow.getValue;
						this.getLabel = dataRow.getLabel;
					}
				}
			});
	}
}

class Renderer {
	constructor(plugin) {
		const { model, observe, observeReply } = plugin;

		const dataRow = new DataRow(plugin);
		const pivotRow = new CacheStrategy(plugin, new PivotRow(plugin, dataRow));
		const nodeRow = new NodeRow(model, pivotRow);
		const nestNodeRow = new CacheStrategy(plugin, nodeRow);
		const subheadNodeRow = new CacheStrategy(plugin, new SubheadNodeRow(nodeRow));
		const rowspanNodeRow = new CacheStrategy(plugin, new RowspanNodeRow(model, nodeRow));
		const rowDetails = new CacheStrategy(plugin, new DetailsRow(model, pivotRow));
		const defaultStrategy = pivotRow;

		const strategies = new Map();
		strategies.set(RowDetails, rowDetails);

		const selectNodeRowStrategy = () => {
			const { mode } = model.group();
			switch (mode) {
				case 'subhead':
					strategies.set(Node, subheadNodeRow);
					break;
				case 'rowspan':
					strategies.set(Node, rowspanNodeRow);
					break;
				default:
					strategies.set(Node, nestNodeRow);
					break;
			}
		};

		selectNodeRowStrategy();
		observe(model.groupChanged)
			.subscribe(selectNodeRowStrategy);

		// Public interface
		this.defaultStrategy = defaultStrategy;

		this.colspan = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.colspan(row, column, rowIndex, columnIndex);
		};

		this.rowspan = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.rowspan(row, column, rowIndex, columnIndex);
		};

		this.columns = (row, pin, rowIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.columns(row, pin, rowIndex);
		};

		this.getValue = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.getValue(row, column, getValue$1, rowIndex, columnIndex);
		};

		this.setValue = (row, column, value, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.setValue(row, column, value, rowIndex, columnIndex);
		};

		this.getLabel = (row, column, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.getLabel(row, column, getLabel, rowIndex, columnIndex);
		};

		this.setLabel = (row, column, value, rowIndex, columnIndex) => {
			const strategy = strategies.get(row.constructor) || defaultStrategy;
			return strategy.setLabel(row, column, value, rowIndex, columnIndex);
		};

		this.rows = {
			left: [],
			right: [],
			mid: []
		};

		const invalidateRows = () => {
			const { rows } = model.scene();
			const { pinTop, pinBottom } = model.row();

			this.rows = {
				top: pinTop,
				body: rows,
				bottom: pinBottom
			};
		};

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					invalidateRows();
				}
			});

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('pinTop') || e.hasChanges('pinBottom')) {
					invalidateRows();
				}
			});
	}
}

class TextSelection {
  static set(element) {    
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      Log.error('text.selection', 'Could not select text in element: Unsupported browser.');
    }
  }
  
  static clear() {
    if (window.getSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();	
    }
  }
}

class BodyLet {
	constructor(plugin) {
		const { model, observe, disposable } = plugin;
		const render = new Renderer(plugin);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);

		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.tryShowBlankLayer();
				}
			});

		observe(model.mouseChanged)
			.subscribe(({ state }) => {
				const { code, status, target } = state;
				
        if (target && code === 'right' && status === 'up') {
					this.targetElement = target.element;
					this.targetElement.classList.add('q-grid-can-select-text');
					TextSelection.set(this.targetElement);
				}

				if (this.targetElement && status === 'down') {
					TextSelection.clear();
					if (this.targetElement.classList) {
						this.targetElement.classList.remove('q-grid-can-select-text');
					}
          
					this.targetElement = null;
				}

			});

		this.tryShowBlankLayer();
	}

	tryShowBlankLayer() {
		Log.info('view.let', 'invalidate');

		const { model, table } = this.plugin;
		const { rows } = model.scene();

		if (!(rows.length || model.data().rows.length)) {
			if (!table.view.hasLayer('blank')) {
				table.view.addLayer('blank');
			}
		} else {
			if (table.view.hasLayer('blank')) {
				table.view.removeLayer('blank');
			}
		}
	}
}

class Cache {
	constructor() {
		this.items = {};
	}

	set(key, value) {
		this.items[key] = value;
	}

	get(key) {
		const entry = this.find(key);
		if (!entry) {
			throw new GridError(
				'cache.get',
				`Entry with key was not found "${key}"`);
		}

		return entry;
	}

	has(key) {
		const items = this.items;
		return items.hasOwnProperty(key);
	}

	find(key) {
		const items = this.items;
		if (items.hasOwnProperty(key)) {
			return items[key];
		}

		return null;
	}

	remove(key) {
		if (!this.items.hasOwnProperty(key)) {
			throw new GridError(
				'cache.remove',
				`Entry with key was not found "${key}"`);
		}

		delete this.items[key];
	}

	clear() {
		this.items = {};
	}
}

class BodyState {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}

class BoxHost {
	constructor(host, plugin) {
		const { model, observeReply } = plugin;

		host.classList.add(GRID_PREFIX);

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if (model.drag().isActive) {
						host.classList.add(`${GRID_PREFIX}-drag`);
					}
					else {
						host.classList.remove(`${GRID_PREFIX}-drag`);
					}
				}
			});
	}
}

function build$1(style) {
	return buildLines(style).join('\n');
}

function buildLines(style) {
	return Object
		.keys(style)
		.reduce((memo, key) => {
			const entry = style[key];
			const body = Object
				.keys(entry)
				.reduce((memo, key) => {
					memo.push(`\t${key}:${entry[key]} !important;`);
					return memo;
				}, []);

			memo.push(`${key}{\n${body.join('\n')}\n}`);
			return memo;
		}, []);
}

function sheet(id, source) {
	const sheetId = `${id}-${source}`;
	let sheet = document.getElementById(sheetId);
	const getSheet = () => {
		if (!sheet) {
			sheet = document.createElement('style');
			sheet.type = 'text/css';
			sheet.id = escapeAttr(sheetId);
			document.getElementsByTagName('head')[0].appendChild(sheet);
		}

		return sheet;
	};

	return {
		set: css => {
			const sheet = getSheet();
			const lines = buildLines(css);
			const styleId = `#${escape$2(id)}`;
			sheet.innerHTML = lines.map(line => `${styleId} ${line}`).join('\n');
		},
		remove: () => {
			if (sheet) {
				sheet.parentNode.removeChild(sheet);
			}
		}
	};
}

function escapeAttr(name) {
	return ('' + name).replace(/\s|\t|\n|"|'/g, '_');
}

function escape$2(name) {
	return cssEscape(escapeAttr(name));
}

function bodyCellClassifier(column) {
    const classList = [
        `${GRID_PREFIX}-the-${escapeAttr(column.key)}`,
        `${GRID_PREFIX}-${escapeAttr(column.type)}`,
    ];

    if (column.editor) {
        classList.push(`${GRID_PREFIX}-${escapeAttr(column.editor)}`);
    }

    if (column.viewWidth) {
        classList.push(`${GRID_PREFIX}-has-view-width`);
    }

    if (column.class) {
        classList.push(escapeAttr(column.class));
    }

    const className = ' ' + classList.join(' ');
    return element => element.className += className;
}

function headCellClassifier(column) {
    const classList = [];
    if (column.canEdit) {
        classList.push(`${GRID_PREFIX}-can-edit`);
    }

    if (column.canResize) {
        classList.push(`${GRID_PREFIX}-can-resize`);
    }

    if (column.canSort) {
        classList.push(`${GRID_PREFIX}-can-sort`);
    }

    if (column.canMove) {
        classList.push(`${GRID_PREFIX}-can-move`);
    }

    if (column.canFilter) {
        classList.push(`${GRID_PREFIX}-can-filter`);
    }

    if (column.canHighlight) {
        classList.push(`${GRID_PREFIX}-can-highlight`);
    }

    if (column.widthMode) {
        classList.push(`${GRID_PREFIX}-${column.widthMode}`);
    }

    const className = ' ' + classList.join(' ');
    return element => element.className += className;
}

class CellSelector {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	map(items) {
		const selectionState = this.model.selection();
		switch (selectionState.unit) {
			case 'row':
				return this.mapFromRows(items);
			case 'column':
				return this.mapFromColumns(items);
			case 'cell':
				return this.mapFromCells(items);
			case 'mix':
				return this.mapFromMix(items);
			default:
				throw new GridError('cell.selector', `Invalid unit ${selectionState.unit}`);
		}
	}

	mapFromRows(items) {
		const { table } = this;
		const result = [];
		const rows = table.data.rows();

		for (let item of items) {
			const index = rows.indexOf(item);
			for (let cell of table.body.row(index).cells()) {
				result.push(cell);
			}
		}

		return result;
	}

	mapFromColumns(items) {
		const { table } = this;
		const result = [];
		const columns = table.data.columns();

		for (let item of items) {
			const index = columns.findIndex(c => c === item);
			result.push(...table.body.column(index).cells());
		}

		return result;
	}

	mapFromCells(items) {
		const { table } = this;
		const result = [];
		const rows = table.data.rows();
		const columns = table.data.columns();

		for (let item of items) {
			const rowIndex = rows.indexOf(item.row);
			const columnIndex = columns.findIndex((c) => c === item.column);
			result.push(table.body.cell(rowIndex, columnIndex));
		}

		return result;
	}

	mapFromMix(items) {
		const entries = Array.from(items);
		const rows = entries.filter(item => item.unit === 'row').map(item => item.item);
		const cells = entries.filter(item => item.unit === 'cell').map(item => item.item);

		return [
			...this.mapFromRows(rows),
			...this.mapFromCells(cells)
		];
	}
}

function copyToClipboard(text) {
	const textArea = document.createElement("textarea");

	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a
	// flash, so some of these are just precautions. However in
	// Internet Explorer the element is visible whilst the popup
	// box asking the user for permission for the web page to
	// copy to the clipboard.
	//

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = '2em';
	textArea.style.height = '2em';

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0;

	// Clean up any borders.
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = 'transparent';

	textArea.value = text;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand('copy');
	} catch (ex) {
		throw new GridError('clipboard', ex.message)
	}

	document.body.removeChild(textArea);
}

class Disposable {
	constructor() {
		this.disposes = [];
	}

	add(resource) {
		Guard.notNull(resource, 'resource');

		const test = resource;
		if (isFunction(test.finalize)) {
			this.disposes.push(() => test.finalize());
			return;
		}

		if (isFunction(test.unsubscribe)) {
			this.disposes.push(() => test.unsubscribe());
			return;
		}

		if (isFunction(test)) {
			this.disposes.push(test);
			return;
		}

		throw new GridError(
			'disposable',
			`Resource is not a disposable`
		);
	}

	remove(resource) {
		const index = this.disposes.indexOf(resource);
		if (index >= 0) {
			this.disposes.splice(index, 1);
			return true;
		}

		return false;
	}

	finalize() {
		const disposes = this.disposes;
		this.disposes = [];

		for (const dispose of disposes) {
			dispose();
		}
	}
}

class UnsubscribableLike {
  constructor(off) {
    this.off = off;
    this.closed = false;
  }

  unsubscribe() {
    if (!this.closed) {
      this.off();
      
      this.off = null;
      this.closed = true;
    }
  }
}

class ObservableEvent {
  constructor(nextSignal, disposable) {
    this.errorSignal = new Event();
    this.nextSignal = nextSignal;
    this.disposable = disposable;
  }

  subscribe(...args) {
    let observer = args[0];
    if (isFunction(observer)) {
      observer = {
        next: args[0],
        error: args[1],
        complete: args[2]
      };
    }

    if (observer.error) {
      const errorOff = this.errorSignal.on(ex => observer.error(ex));
      this.disposable.add(errorOff);
    }

    if (observer.next) {
      const eventOff = this.subscribeEvent(e => observer.next(e));

      let disposed = false;
      const unsubscribe = () => {
        if (!disposed) {
          disposed = true;

          eventOff();
          this.disposable.remove(unsubscribe);

          if (observer.complete) {
            observer.complete();
          }
        }
      };

      this.disposable.add(unsubscribe);
      return new UnsubscribableLike(unsubscribe);
    }

    return new UnsubscribableLike(noop);
  }

  subscribeEvent(next) {
    return this
      .nextSignal
      .on(e => {
        try {
          next(e);
        } catch (ex) {
          this.catchError(ex);
          throw ex;
        }
      });
  }

  catchError(ex) {
    this.errorSignal.emit(ex);
    throw ex;
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
    let source = this;
    for (let op of operators) {
      source = op(source);
    }

    return source;
  }
}

class ObservableReplyEvent extends ObservableEvent {
  subscribeEvent(next) {
    return this
      .nextSignal
      .watch(e => {
        try {
          next(e);
        } catch (ex) {
          this.catchError(ex);
        }
      });
  }
}

class SubjectLike extends ObservableEvent {
  constructor() {
    super(
      new Event(),
      new Disposable()
    );

    this.isCompleted = false;
  }

  next(value) {
    if (this.isCompleted) {
      return;
    }

    this.nextSignal.emit(value);
  }

  error(ex) {
    if (this.isCompleted) {
      return;
    }

    this.catchError(ex);
  }

  complete() {
    if (!this.isCompleted) {
      this.isCompleted = true;
    }
  }
}

class Operator extends SubjectLike {
  constructor(subscriber) {
    super();

    this.subscriber = subscriber;
  }

  subscribe(...args) {
    super.subscribe(...args);
    this.subscriber(this);
  }
}

class Command {
	constructor(context = {}) {
		this.execute = yes;
		this.canExecute = yes;
		this.canExecuteCheck = new SubjectLike();

		this.shortcut = '';
		this.priority = 0;
		this.source = '';
		this.sink = null;

		Object.assign(this, context);
	}

	clone(context = {}) {
		const cmd = new Command(this);
		Object.assign(cmd, context);
		return cmd;
	}
}

class ClipboardLet {
    constructor(plugin, shortcut) {
        const { model, table } = plugin;

        this.copy = new Command({
            priority: 1,
            source: 'clipboard.let',
            shortcut: 'ctrl+c',
            canExecute: () => {
                const { status } = model.edit();
                const { copy } = model.clipboard();
                return status === 'view' && copy.canExecute();
            },
            execute: () => {
                const { cell } = model.navigation();
                if (cell) {
                    const { copy } = model.clipboard();
                    if (copy.execute() !== false) {
                        const getLabel = getLabelFactory(cell.column);
                        copyToClipboard(getLabel(cell.row));
                        table.view.focus();
                    }
                }

                return true;
            }
        });

        shortcut.register([this.copy]);
    }
}

class ClipboardState {
    constructor() {
        this.copy = new Command();
    }
}

function merge$1(settings) {
	const context = assignWith({
		equals: (l, r) => l === r,
		update: (l, r /*left, i*/) => {
			assignWith(l, r);
			return l;
		},
		remove: (l, left, i) => {
			left.splice(i, 1);
			return l;
		},
		insert: (r, left) => {
			left.push(r);
			return r;
		}
	}, settings);

	return (left, right, result) => {
		const ls = left.slice();
		const rs = right.slice();
		let updated = 0;
		let removed = 0;

		result = result || left;
		for (let i = 0, lsLength = ls.length; i < lsLength; i++) {
			const l = ls[i];
			let matched = false;
			for (let j = 0, rsLength = rs.length; j < rsLength; j++) {
				const r = rs[j];
				if (context.equals(l, r, i, j)) {
					context.update(l, r, result, result.indexOf(l));
					updated++;
					matched = true;
					rs.splice(j, 1);
					break;
				}
			}

			if (!matched) {
				context.remove(l, result, result.indexOf(l));
				removed++;
			}
		}

		const inserted = rs.length;
		for (let i = 0; i < inserted; i++) {
			context.insert(rs[i], result);
		}

		if (context.sort) {
			left.sort(context.sort(left, right));
		}

		return {updated, removed, inserted};
	};
}

function merge(left, right, force = false) {
	let canAssign;
	if (force) {
		canAssign = (source, target) => !isUndefined(target) && target !== null ? target : source;
	}
	else {
		canAssign = (source, target) => !isUndefined(target) && target !== null && source === null ? target : source;
	}

	const doMerge = merge$1({
		equals: (l, r) => l.key === r.key,
		update: (l, r) => assignWith(l, r, canAssign),
		insert: (r, left) => left.push(r),
		remove: noop
	});

	return doMerge(left, right);
}

function hasChanges(statistics) {
	return statistics.some(st => st.inserted || st.update);
}

function generateFactory(model) {
	const { data } = model;
	const createColumn = columnFactory(model);
	return () => {
		const { rows } = data();
		const htmlColumns = model.columnList().columns;

		const spawnColumns = [];
		const { generation, typeDetection } = model.columnList();
		if (generation) {
			let settings = {
				rows,
				columnFactory: createColumn,
				deep: false,
				cohort: false,
				typeDetection
			};

			switch (generation) {
				case 'shallow': {
					break;
				}
				case 'deep': {
					settings.deep = true;
					break;
				}
				case 'cohort': {
					settings.deep = true;
					settings.cohort = true;
					break;
				}
				default:
					throw new GridError(
						'column.list.generate',
						`Invalid generation mode "${generation}"`
					);
			}

			spawnColumns.push(...generate(settings));
		}

		const columns = Array.from(data().columns);

		let statistics = [];
		if (spawnColumns.length) {
			statistics.push(
				merge(columns, spawnColumns, false)
			);
		}

		if (htmlColumns.length) {
			statistics.push(
				merge(columns, htmlColumns, true)
			);
		}

		return {
			columns,
			statistics,
			hasChanges: hasChanges(statistics)
		};
	};
}

function generate(settings) {
	const context = assignWith({
		deep: true,
		cohort: false,
		rows: [],
		columnFactory: () => new TextColumnModel(),
		title: startCase,
		testNumber: 10,
		typeDetection: 'inference'
	}, settings);

	if (context.rows.length) {
		return build(
			context.rows[0],
			[],
			{
				columnFactory: context.columnFactory,
				deep: context.deep,
				cohort: context.cohort,
				title: context.title,
				typeDetection: context.typeDetection,
				testRows: context.rows.slice(0, context.testNumber),
			}
		);
	}

	return [];
}

function build(graph, pathParts, settings) {
	const { columnFactory, deep, cohort, title, testRows, typeDetection } = settings;

	const props = Object.getOwnPropertyNames(graph);
	return props.reduce((memo, prop) => {
		const propParts = [...pathParts, prop];
		const propValue = compile$1(propParts);
		const propPath = propParts.join('.');

		const subject = graph[prop];
		const type = typeDetection === 'raw'
			? resolveType(testRows.map(propValue))
			: inferType(testRows.map(propValue));

		switch (type) {
			case 'array': {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = title(propPath, graph, column.length);
				column.value = propValue;
				column.source = 'generation';
				if (subject.length) {
					column.itemType = getType$1(subject[0]);
					switch (column.itemType) {
						case 'date': {
							column.itemFormat = columnFactory('date').model.format;
							break;
						}
						case 'datetime': {
							column.itemFormat = columnFactory('datetime').model.format;
							break;
						}
					}
				}

				memo.push(column);
				break;
			}
			case 'collection': {
				break;
			}
			case 'object': {
				if (deep) {
					const columns = build(
						subject,
						propParts,
						settings
					);

					if (cohort) {
						const column = columnFactory('cohort').model;
						column.key = propPath;
						column.title = title(propPath, graph, column.length);
						column.value = propValue;
						column.source = 'generation';
						column.children.push(...columns);
						memo.push(column);
					} else {
						memo.push(...columns);
					}

				}
				break;
			}
			default: {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = title(propPath, graph, column.length);
				column.value = propValue;
				column.source = 'generation';
				memo.push(column);
				break;
			}
		}

		return memo;
	}, []);
}

class ColumnListHost {
	constructor(model, canCopy, parseFactory) {
		this.model = model;
		this.canCopy = canCopy;
		this.parseFactory = parseFactory;
	}

	generateKey(source) {
		if (!isUndefined(source.editor)) {
			return `$default.${source.editor}`;
		}

		if (!isUndefined(source.type)) {
			return `$default.${source.type}`;
		}

		return '$default';
	}

	copy(target, source) {
		const canCopy = this.canCopy;
		const parseFactory = this.parseFactory;

		Object.keys(source)
			.filter(key => canCopy(key, source, target))
			.forEach(key => {
				const sourceValue = source[key];
				const accessor = compile$1([key]);
				const targetValue = accessor(target);
				const targetType = getType$1(targetValue);
				let value = sourceValue;
				if (targetValue !== null && !isUndefined(targetValue)) {
					const parse = parseFactory(targetType);
					const typedValue = parse(sourceValue, targetValue);
					if (typedValue !== null) {
						value = typedValue;
					}
				}

				accessor(target, value);
			});
	}

	add(column) {
		const { columnList, scene, data } = this.model;

		const columns = columnList().columns.concat([column]);
		columnList({ columns }, {
			source: 'column.list.host',
			behavior: 'core'
		});

		if (scene().status !== 'idle') {
			data({
				columns: Array.from(data().columns)
			}, {
				source: 'column.list.host'
			});
		}
	}

	register(column) {
		const { columnList } = this.model;
		const reference = clone(columnList().reference);

		reference[column.type || '$default'] = column;
		columnList({ reference }, {
			source: 'column.list.host',
			behavior: 'core'
		});
	}

	extract(key, type) {
		const { model } = this;

		const buildColumn = columnFactory(model);

		let tplColumn = findColumn(model.columnList().line, key);
		if (tplColumn) {
			return buildColumn(type, tplColumn);
		}

		tplColumn = buildColumn(type || 'text').model;
		tplColumn.key = key;
		tplColumn.source = 'template';

		const dataColumn = findColumn(model.data().columns, key);
		if (dataColumn) {
			this.copy(tplColumn, dataColumn);
		}

		return tplColumn;
	}

	delete(key) {
		const { columnList, data } = this.model;

		const htmlColumns = columnList().columns;
		const index = findIndex(htmlColumns, key);
		if (index >= 0) {
			const columns = Array.from(htmlColumns);
			columns.splice(index, 1);
			columnList({ columns }, { source: 'column.list.host', behavior: 'core' });
		}

		const dataColumns = Array.from(data().columns);
		const line = findLine(dataColumns, key);
		if (line) {
			line.columns.splice(line.index, 1);

			// trigger columns pipe unit
			data({ columns: dataColumns }, { source: 'column.list.host' });
		}
	}
}

function preOrderDFS(nodes, visit, memo = null, parent = null) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		const nodeMemo = visit(node, memo, parent, i);
		preOrderDFS(node.children, visit, nodeMemo, node);
	}

	return memo;
}

function filterNode(node, test, parent = null) {
	const { children } = node;
	node = copy(node);

	let result = false;
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		result = filterNode(child, test, node) || result;
	}

	if (parent) {
		if (result || test(node)) {
			parent.children.push(node);
			return true;
		}

		return false;
	}

	return node;
}

function findLeaves(node, result = []) {
	const { children } = node;
	if (!children.length) {
		result.push(node);
		return result;
	}

	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		findLeaves(child, result);
	}

	return result;
}

function findNode(node, test, parent = null, index = -1, path = []) {
	if (test(node)) {
		return { node, parent, index, path };
	}

	path = path.slice();
	path.push(node);

	const { children } = node;
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		const result = find(child, test, node, i, path);
		if (result) {
			return result;
		}
	}

	return null;
}

function calk(node) {
	const result = new Node(node.key, node.level, node.type);
	result.rows = Array.from(node.rows);
	result.children = Array.from(node.children);
	result.state = cloneDeep(node.state);
	result.source = node.source;
	result.value = node.value;
	return result;
}

function copy(node) {
	const result = new Node(node.key, node.level, node.type);
	result.value = node.value;
	result.source = node.source;
	result.state.expand = node.state.expand;
	return result;
}

function bend(line) {
	if (line.length === 0) {
		throw new GridError('node.service', 'Line have no nodes');
	}

	const root = copy(line[0]);
	const parentStack = [root];
	for (let i = 1, length = line.length; i < length; i++) {
		const current = line[i];

		let parent = parentStack[parentStack.length - 1];
		while (current.level <= parent.level) {
			parentStack.pop();
			parent = parentStack[parentStack.length - 1];
		}

		const child = copy(current);
		child.level = parent.level + 1;

		parent.children.push(child);
		parentStack.push(child);
	}

	return root;
}

function sortIndexFactory(model) {
	const templateIndex = model.columnList().columns.map(c => c.key);

	return (columns, scores) => {
		const { length } = columns;
		scores = Object.assign({
			list: column => (column.category === 'data' || column.category === 'cohort') ? 0.1 : 0.3,
			index: () => 0.2,
			view: column => length + ((column.category !== 'data' && column.category !== 'cohort') ? 0.1 : 0.3),
			template: () => length + 0.4
		}, scores);

		const viewIndex = columns.map(c => c.key);

		const sort = sortFactory$1(scores)(templateIndex, viewIndex);
		const left = sort(columns.filter(c => c.pin === 'left'));
		const middle = sort(columns.filter(c => c.pin === 'mid'));
		const right = sort(columns.filter(c => c.pin === 'right'));

		return left.concat(middle).concat(right);
	};
}

function sortFactory$1(scores) {
	return (templateIndex, viewIndex) => {
		const compare = compareFactory(scores, templateIndex, viewIndex);
		return columns => {
			const columnIndex = Array.from(columns);
			columnIndex.sort(compare);

			return columnIndex.map(c => c.key);
		};
	};
}

function compareFactory(scoreFor, templateIndex, viewIndex) {
	const viewFind = findFactory(viewIndex);
	const templateFind = findFactory(templateIndex);

	const weightCache = {};
	const getWeight = column => {
		const key = column.key;
		if (weightCache.hasOwnProperty(key)) {
			return weightCache[key];
		}

		const candidates = [
			column.index + scoreFor.index(column),
			viewFind(key) + scoreFor.view(column),
			templateFind(key) + scoreFor.template(column)
		];

		const weights = candidates.filter(w => w >= 0);
		const weight = weights.length ? weights[0] : -1;
		weightCache[key] = weight;

		return weight;
	};

	return (x, y) => {
		const xi = getWeight(x);
		const yi = getWeight(y);

		return yi === -1 ? -1 : xi === -1 ? 1 : xi - yi;
	};
}

function findFactory(index) {
	const map = index.reduce((memo, key, i) => {
		memo.set(key, i);
		return memo;
	}, new Map());

	return key => (map.has(key) ? map.get(key) : -1);
}

function mergeTree(newTree, oldTree, buildIndex) {
	const current = running(newTree, buildIndex);
	const screen = former(oldTree, current);
	const insertNear = insertFactory(current, screen);
	const insertCohort = insertCohortFactory(current, screen);

	const root = current.line[0];
	if (!screen.set.has(root.key.model.key)) {
		screen.line.unshift(copy(root));
		screen.line.forEach(n => n.level++);
	}

	for (let i = 1, length = current.line.length; i < length; i++) {
		const node = current.line[i];
		const { model } = node.key;
		if (screen.set.has(model.key)) {
			continue;
		}

		const prevNode = current.line[i - 1];
		if (model.type === 'cohort') {
			insertCohort(prevNode, node);
		} else {
			insertNear(prevNode, node, i);
		}
	}

	return bend(screen.line);
}

function running(tree, buildIndex) {
	const result = {
		line: [],
		map: new Map()
	};

	preOrderDFS([tree], node => {
		result.line.push(node);
		result.map.set(node.key.model.key, node.key);

		// As we use pre order direction we can manipulate with children without affecting on algorithm.
		// Below we sort columns in appropriate order.
		const columns = node.children.map(child => child.key.model);
		const index = buildIndex(columns);

		let cursor = 0;
		const indexMap = index.reduce((memo, key) => {
			memo[key] = cursor++;
			return memo;
		}, {});

		node.children.sort((x, y) => indexMap[x.key.model.key] - indexMap[y.key.model.key]);
	});

	return result;
}

function former(tree, current) {
	const result = {
		line: [],
		set: new Set()
	};

	preOrderDFS([tree], node => {
		// Filter out nodes if they were deleted from newTree.
		const { key } = node.key.model;
		const view = current.map.get(key);
		if (view) {
			const newNode = copy(node);
			newNode.key = view;
			result.line.push(newNode);
			result.set.add(key);
		}
	});

	return result;
}

function insertFactory(current, screen) {
	const { line } = screen;
	return (prevNode, node, i) => {
		let pos = line.findIndex(n => n.key.model.key === prevNode.key.model.key);

		const target = copy(node);
		target.level = node.level;

		if (everyNextIsNew(current, screen, i)) {
			line.push(target);
		} else {
			line.splice(pos + 1, 0, target);
		}
	};
}

function insertCohortFactory(current, screen) {
	const insertNear = insertFactory(current, screen);
	const { line } = screen;
	return (prevNode, node) => {
		const set = new Set(node.children.map(n => n.key.model.key));
		const index = line.findIndex(n => set.has(n.key.model.key));

		if (index < 0) {
			insertNear(prevNode, node);
			return;
		}

		const target = copy(node);
		const { level } = line[index];
		target.level = level;
		line.splice(index, 0, target);

		for (let i = index + 1, end = line.length; i < end; i++) {
			const child = line[i];
			if (child.level !== level) {
				break;
			}

			if (set.has(child.key.model.key)) {
				child.level = level + 1;
			}
		}
	};
}

function everyNextIsNew(current, screen, index) {
	const { line } = current;

	let n;
	while ((n = line[++index])) {
		if (screen.set.has(n.key.model.key)) {
			return false;
		}
	}

	return true;
}

class ColumnListState {
	constructor() {
		this.generation = null; // deep | shallow | cohort | null
		this.typeDetection = 'inference'; // inference | raw

		const root = new CohortColumnModel();
		root.key = '$root';

		this.index = new Node(new CohortColumn(root), 0);
		
		this.columns = [];
		this.reference = {};
		this.line = [];
	}
}

TemplatePath.register('filter-row-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class FilterRowColumnModel extends ColumnModel {
	constructor(model) {
		super();

		Object.assign(this, model);

		this.key = `$filter.row.${model.key}`;
		this.type = 'filter-row';
		this.category = 'control';

		this.canResize = false;
		this.canSort = false;
		this.canMove = false;

		this.model = model;
	}
}

class FilterRowColumn extends ColumnView {
	constructor(model) {
		super(new FilterRowColumnModel(model));
	}
}

class CommandKey {
  constructor(name) {
    this.name = name;
  }
}

function commandKey(name) {
  return CommandKey(name);
}

function generateCommandKey() {
  return CommandKey("some name");
}

class CompositeCommandManager {
	constructor(manager) {
		this.manager = manager;
	}

	filter(commands) {
		return this.manager.filter(commands);
	}

	invoke(commands, context, source) {
		return this.manager.invoke(commands, context, source);
	}
}

class TableCommandManager extends CommandManager {
	constructor(apply, table) {
		super(apply);

		this.table = table;
	}

	filter(commands, source) {
		if (source === 'editor' || this.isViewActive()) {
			return super.filter(commands, source);
		}

		return [];
	}

	isViewActive() {
		return this.table.view.isFocused();
	}
}

function dataPipe(rows, context, next) {
	const { model } = context;

	addDataRows(model, rows);
	addDataColumns(model);

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { data: rows })
	}, {
		source: 'data.pipe',
		behavior: 'core'
	});
	
	next(rows);
}

function addDataRows(model, rows) {
	const tag = {
		source: 'data.pipe',
		behavior: 'core'
	};

	model.data({ rows }, tag);
}

function addDataColumns(model) {
	const getColumns = generateFactory(model);
	const createColumn = columnFactory(model);
	const { hasChanges, columns } = getColumns();

	const allColumns = columns
		.map(columnBody => createColumn(columnBody.type, columnBody).model);

	if (hasChanges) {
		const tag = {
			source: 'data.pipe',
			behavior: 'core'
		};

		model.data({ columns: allColumns }, tag);
	}
}

function filterPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	let result = rows;
	if (rows.length) {
		const { match, custom } = model.filter();
		const matchPredicate = match(context);

		let test;
		if (matchPredicate !== yes && custom !== yes) {
			test = (row) => matchPredicate(row) && custom(row);
		} else if (matchPredicate !== yes) {
			test = (row) => matchPredicate(row);
		} else if (custom !== yes) {
			test = (row) => custom(row);
		}

		if (test) {
			result = [];
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				if (test(row)) {
					result.push(row);
				}
			}
		}
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { filter: result })
	}, {
		source: 'filter.pipe',
		behavior: 'core'
	});

	next(result);
}

function paginationPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;

	if (memo.hasOwnProperty('nodes') && memo.nodes.length) {
		const { flattenFactory } = model.group();

		const page = paginate(model, memo.nodes);
		const flatten = flattenFactory(model);

		memo.rows = flatten(page);
		next(memo);
		return;
	}

	if (memo.hasOwnProperty('rows')) {
		const page = paginate(model, memo.rows);
		memo.rows = page;
		next(memo);
		return;
	}

	const rows = paginate(model, memo);
	next(rows);
}

function paginate(model, rows) {
	const { pinTop, pinBottom } = model.row();
	const { mode } = model.scroll();
	let { size, current } = model.pagination();

	const pinned = new Set([...pinTop, ...pinBottom]);
	if (pinned.size) {
		rows = rows.filter(row => !pinned.has(row));
	}

	const count = rows.length;
	const last = Math.max(0, Math.floor((count - 1) / size));
	current = Math.min(last, current);
	const start = current * size;

	model.pagination({ count, current }, { source: 'pagination.pipe', behavior: 'core' });
	return mode === 'virtual' ? rows : rows.slice(start, start + size);
}

function orderFactory(model) {
	const { sort } = model;
	return by => {
		const { trigger } = sort();
		if (trigger.indexOf('reorder') >= 0) {
			let index = 0;
			const indexMap = {};
			preOrderDFS(model.columnList().index.children, node => {
				const { key } = node.key.model;
				indexMap[key] = index++;
			});

			by.sort((x, y) => indexMap[getKey(x)] - indexMap[getKey(y)]);
		}

		return by;
	};
}

function getKey(pair) {
	let key;
	if (isString(pair)) {
		const signedKey = pair.split(/[+-]/);
		key = signedKey[1] || signedKey[0];
	} else {
		key = Object.keys(pair)[0];
	}

	if (!key) {
		throw new GridError(
			'sort.service',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

function getDirection(pair) {
	if (isString(pair)) {
		const directions = { '-': 'desc', '+': 'asc' };
		return directions[pair[0]] || 'asc';
	}

	const pairKey = getKey(pair);
	return pair[pairKey];
}

function getMap(pairs) {
	return pairs.reduce((memo, pair) => {
		const key = getKey(pair);
		memo[key] = getDirection(pair);
		return memo;
	}, {});
}

function getIndex(pairs, key) {
	return pairs.map(getKey).findIndex(pairKey => pairKey === key);
}

function sortPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	let result = rows;
	if (rows.length) {
		const { by } = model.sort();
		if (by.length) {
			const columns = model.columnList().line;
			const mappings = [];
			const comparers = [];

			for (let i = 0, length = by.length; i < length; i++) {
				const sortEntry = by[i];
				const sortKey = getKey(sortEntry);
				const sortDir = getDirection(sortEntry);
				const sortColumn = findColumn(columns, sortKey);
				if (!sortColumn) {
					throw new GridError('sort.pipe', `Column "${sortKey}" is not found`);
				}

				const getValue = context.getValueFactory(sortColumn);
				const parseValue = parseFactory(sortColumn.type, sortColumn.editor);
				const compare = sortColumn.compare;

				mappings.push(row => {
					const value = getValue(row);
					const result = parseValue(value);
					return result === null ? value : result;
				});

				comparers.push(sortDir === 'asc' ? compare : (x, y) => -compare(x, y));
			}

			result = orderBy(rows, mappings, comparers);
		}
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { sort: result })
	}, {
		source: 'sort.pipe',
		behavior: 'core'
	});

	next(result);
}

function memoPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { memo: rows })
	}, {
			source: 'memo.pipe',
			behavior: 'core'
		});

	next({
		rows,
		pivot: { head: new Node('$root', 0), rows: [] },
		nodes: []
	});
}

function nodeBuilder(columnMap, groupBy, valueFactory, level = 0) {
	if (groupBy.length === 0) {
		return () => [];
	}

	const groupKey = groupBy[0];
	if (!columnMap.hasOwnProperty(groupKey)) {
		throw new GridError('node.build', `can't find column "${groupKey}"`);
	}

	const column = columnMap[groupKey];
	const getValue = getValueFactory(column);
	return (rows, getRowIndex = (i) => i) => {
		const keys = [];
		const nodes = [];
		const groups = {};
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			const index = getRowIndex(i);
			const key = getValue(row);
			if (!groups.hasOwnProperty(key)) {
				const node = new Node(key, level);
				node.source = groupKey;
				node.rows.push(index);
				keys.push(key);
				nodes.push(node);
				groups[key] = {
					node,
					rows: [row]
				};
			}
			else {
				const group = groups[key];
				group.node.rows.push(index);
				group.rows.push(row);
				keys.push(key);
			}
		}

		const nextGroupBy = groupBy.slice(1);
		if (nextGroupBy.length) {
			const build = nodeBuilder(columnMap, nextGroupBy, valueFactory, level + 1);
			for (let i = 0, length = keys.length; i < length; i++) {
				const key = keys[i];
				const group = groups[key];
				const node = group.node;
				const rows = node.rows;
				node.children = build(group.rows, i => rows[i]);
			}
		}

		return nodes;
	};
}

function groupPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	const { rows: memoRows, nodes: memoNodes } = memo;
	if (memoRows.length) {
		const { rows } = model.data();
		const { by } = model.group();
		const columns = model.columnList().line;
		const columnMap = mapColumns(columns);
		const build = nodeBuilder(columnMap, by, context.valueFactory);

		memo.nodes = build(memoRows, i => {
			const row = memoRows[i];
			const index = rows.indexOf(row);
			return index < 0 ? i : index;
		});
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { group: memoNodes })
	}, {
		source: 'group.pipe',
		behavior: 'core'
	});

	next(memo);
}

class Plan {
	constructor(schema) {
		this.isRoot = !arguments.length;
		this.current = this.schema = schema || {};
	}

	branch() {
		return new Plan(this.current);
	}

	cursor(name) {
		const schema = this.schema;
		this.current =
			schema.hasOwnProperty(name)
				? schema[name]
				: schema[name] = {};
	}

	compile(data) {
		if (this.isRoot) {
			return {
				schema: this.schema,
				data: data
			};
		}
		else {
			return data;
		}
	}
}

function factory$1(plan) {
	return name => {
		plan.cursor(name);
		return settings => {
			return pivot(settings, plan.branch());
		};
	};
}

function pivot(settings, plan) {
	plan = plan || new Plan();

	const pivot = factory$1(plan);
	const aggregate = row => {
		return settings
			.selector(row)
			.reduce((memo, selection) => {
				const name = settings.name(selection);
				memo[name] = settings.value(selection, row, pivot(name));
				return memo;
			}, settings.factory(row));
	};

	return rows =>
		plan.compile(
			plan.isRoot
				? rows.map(aggregate)
				: aggregate(rows));
}

function injectData(schema, source, target) {
	return Object
		.keys(source)
		.filter(key => !schema.hasOwnProperty(key))
		.reduce((memo, key) => {
			memo[key] = source[key];
			return memo;
		}, target);
}

function expandData(schema, source) {
	const baseline =
		Object.keys(schema)
			.map(key => {
				const node = schema[key];
				return source && source.hasOwnProperty(key)
					? expandData(node, source[key])
					: expandData(node);
			});

	return baseline.length
		? flatten(baseline, true)
		: [source];
}

function sortSchema(schema, comparator) {
	return Object
		.keys(schema)
		.sort(comparator)
		.reduce((memo, key) => {
			memo[key] = sortSchema(schema[key], comparator);
			return memo;
		}, {});
}


function reduceSchema(schema) {

	function lift(schema, node) {
		if (schema) {
			Object
				.keys(schema)
				.forEach(key => {
					const child = new Node(key, node.level + 1);
					node.children.push(child);
					lift(schema[key], child);
					return child;
				});
		}

		return node;
	}

	return lift(schema, new Node('$root', 0));
}

function pivotForm(source, comparator) {
	if (source.schema && source.data) {
		const schema = sortSchema(source.schema, comparator);
		const rows = source.data.map(row => injectData(schema, row, expandData(schema, row)));
		const head = reduceSchema(schema);
		return { head, rows };
	}

	return { head: new Node('$root', 0), rows: [] };
}

function buildFactory(columnMap, valueFactory) {
	return function run(pivot, pivotBy, level = 0) {
		const key = pivotBy[0];
		const column = columnMap[key];
		if(!column) {
			throw new GridError(
				'pivot.build',
				`Invalid key "${key}"`);
		}
		
		const getValue = valueFactory(column);

		return pivot({
			factory: () => ({}),
			selector: row => [getValue(row)],
			name: identity,
			value: (parent, row, pivot) => {
				const nextPivotBy = pivotBy.slice(1);
				if (nextPivotBy.length) {
					return run(
						pivot,
						nextPivotBy,
						level + 1)(row);
				}

				return true;
			}
		});
	};
}

function buildPivot(columnMap, pivotBy, valueFactory) {
	let doPivot = null;
	if (pivotBy.length) {
		const doBuild = buildFactory(columnMap, valueFactory);
		doPivot = doBuild(pivot, pivotBy);
	}

	return rows => {
		if (doPivot) {
			const data = doPivot(rows);
			return pivotForm(data);
		}

		return { head: new Node('$root', 0), rows: [] };
	};
}

function pivotPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	if (memo.rows.length) {
		const { getValueFactory } = context;
		const { line } = model.columnList();
		const { by } = model.pivot();

		const build = buildPivot(mapColumns(line), by, getValueFactory);
		memo.pivot = build(memo.rows, by);
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { pivot: memo.pivot })
	}, {
		source: 'pivot.pipe',
		behavior: 'core'
	});

	next(memo);
}

function columnIndexPipe(root, context, next) {
	Guard.notNull(root, 'root');

	const { model } = context;
	const filteredIndex = filter$2(model, root);
	const columnRows = flattenRows(filteredIndex);

	next({ columns: columnRows, index: root });
}

function filter$2(model, root) {
	const groupBy = new Set(model.group().by);
	const pivotBy = new Set(model.pivot().by);

	function doFilter(node, newNode) {
		const { children } = node;
		for (let i = 0, length = children.length; i < length; i++) {
			const child = children[i];
			const view = child.key;
			const { isVisible, key } = view.model;
			if (isVisible && !groupBy.has(key) && !pivotBy.has(key)) {
				const newChild = new Node(child.key, child.level);
				newNode.children.push(newChild);
				doFilter(child, newChild);
			}
		}

		return newNode;
	}

	return doFilter(root, new Node(root.key, root.level));
}

function columnPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	const { pivot, nodes } = memo;
	const { head } = pivot;

	const createColumn = columnFactory(model);
	const root = new Node(createColumn('cohort', { key: '$root' }), 0);

	const addDataColumns = dataColumnsFactory(model);
	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addRowExpandColumn = rowExpandColumnFactory(model);
	const addRowIndicatorColumn = rowIndicatorColumnFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);

	/*
	 * We need to invoke addDataColumns earlier that others because it setups data.columns model property
	 *
	 */
	addDataColumns(root);

	/**
	 * Control columns should be filled in reverse order because they use unshift inside.
	 */

	/*
	 * Add row expand column
	 */
	addRowExpandColumn(root);

	/*
	 * Add group column with nodes
	 *
	 */
	addGroupColumn(root);

	/*
	 * Add column with select boxes
	 * if selection unit is row
	 *
	 */
	addSelectColumn(root);

	/*
	 * Add row indicator column
	 * if rows can be dragged or resized
	 *
	 */
	addRowIndicatorColumn(root);

	/*
	 * Add column rows for pivoted data
	 * if pivot is turned on
	 *
	 */
	addPivotColumns(root, head);

	const { columnList } = model;
	const buildIndex = sortIndexFactory(model);
	const tree = mergeTree(root, columnList().index, buildIndex);

	/*
	 * Add special column type
	 * that fills remaining place (width = 100%)
	 *
	 */
	addPadColumn(tree);

	columnIndexPipe(tree, context, ({ columns, index }) => {
		memo.columns = columns;

		columnList({
			index
		}, {
			behavior: 'core',
			source: 'column.pipe'
		});

		next(memo);
	});
}

function selectColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const selection = model.selection();

	const selectColumn = dataColumns.find(item => item.type === 'select');
	const indicatorColumn = dataColumns.find(item => item.type === 'row-indicator');

	if (!indicatorColumn && selection.unit === 'mix') {
		const createColumn = columnFactory(model);
		return node => {
			const indicatorColumn = createColumn('row-indicator');
			indicatorColumn.model.source = 'generation';
			if (indicatorColumn.model.isVisible) {
				node.children.unshift(new Node(indicatorColumn, node.level + 1));
				return indicatorColumn;
			}
		};
	}

	if (!selectColumn && selection.unit === 'row') {
		const createColumn = columnFactory(model);
		return node => {
			const selectColumn = createColumn('select');
			selectColumn.model.key = `$select-${model.selection().mode}`;
			selectColumn.model.source = 'generation';
			if (selectColumn.model.isVisible) {
				node.children.unshift(new Node(selectColumn, node.level + 1));
				return selectColumn;
			}
		};
	}

	return noop;
}

function groupColumnFactory(model, nodes) {
	const dataColumns = model.columnList().line;
	const groupColumn = dataColumns.find(item => item.type === 'group');
	const { by, mode } = model.group();
	const createColumn = columnFactory(model);

	if (!groupColumn && (nodes.length || by.length)) {
		switch (mode) {
			case 'nest': {
				return node => {
					const groupColumn = createColumn('group');
					groupColumn.model.source = 'generation';
					if (groupColumn.model.isVisible) {
						node.children.unshift(new Node(groupColumn, node.level + 1));
						return groupColumn;
					}
				};
			}
			case 'rowspan':
			case 'flat': {
				return node => {
					const nodes = by
						.map(key => {
							const groupColumn = createColumn('group');
							groupColumn.model.source = 'generation';
							groupColumn.model.key = `$group-${key}`;
							groupColumn.model.title = key;
							groupColumn.model.by = key;
							return new Node(groupColumn, node.level + 1);
						})
						.filter(n => n.key.model.isVisible);

					node.children.splice(0, 0, ...nodes);
				}
			}
		}
	}

	return noop;
}

function rowExpandColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const expandColumn = dataColumns.find(item => item.type === 'row-expand');
	if (model.row().unit === 'details' && !expandColumn) {
		const createColumn = columnFactory(model);
		return node => {
			const expandColumn = createColumn('row-expand');
			expandColumn.model.source = 'generation';
			if (expandColumn.model.isVisible) {
				node.children.unshift(new Node(expandColumn, node.level + 1));
				return expandColumn;
			}
		};
	}

	return noop;
}

function rowIndicatorColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const rowIndicatorColumn = dataColumns.find(item => item.type === 'row-indicator');
	const { canMove, canResize } = model.row();
	if ((canMove || canResize) && !rowIndicatorColumn) {
		const createColumn = columnFactory(model);
		return node => {
			const expandColumn = createColumn('row-indicator');
			expandColumn.model.source = 'generation';
			if (expandColumn.model.isVisible) {
				node.children.unshift(new Node(expandColumn, node.level + 1));
				return expandColumn;
			}
		};
	}

	return noop;
}

function dataColumnsFactory(model) {
	const getColumns = generateFactory(model);
	const createColumn = columnFactory(model);
	const { hasChanges, columns } = getColumns();
	if (hasChanges) {
		model.data({ columns }, { source: 'column.pipe', behavior: 'core' });
	}

	function fill(node, columns) {
		for (let column of columns) {
			const view = createColumn(column.type, column);
			const child = new Node(view, node.level + 1);
			node.children.push(child);
			fill(child, view.model.children);
		}
	}

	return node => fill(node, columns);
}

function padColumnFactory(model) {
	const createColumn = columnFactory(model);
	return node => {
		const padColumn = createColumn('pad');
		padColumn.model.key = '$pad';

		const index = node.children.findIndex(n => n.key.model.pin === 'right');
		const padNode = new Node(padColumn, node.level + 1);
		if (index >= 0) {
			node.children.splice(index, 0, padNode);
		} else {
			node.children.push(padNode);
		}

		return padColumn;
	};
}

function pivotColumnsFactory(model) {
	const createColumn = columnFactory(model);
	return function fill(node, head) {
		const { children } = head;
		for (let i = 0, length = children.length; i < length; i++) {
			const child = children[i];
			const pivotColumn = createColumn('pivot');
			const pivotColumnModel = pivotColumn.model;
			pivotColumnModel.title = child.key;
			pivotColumnModel.key = `$pivot-${child.key}`;
			const pivotNode = new Node(pivotColumn, node.level + 1);
			node.children.push(pivotNode);
			fill(pivotNode, child);
		}
	};
}

function animationPipe(memo, context, next) {
	const { model } = context;
	const { apply } = model.animation();
	let { length } = apply;
	if (length) {
		const doNext = () => {
			length--;
			if (length === 0) {
				next(memo);
			}
		};

		apply.forEach(animation => {
			animation(memo, context, doNext);
		});
	} else {
		next(memo);
	}
}

class Scene {
	constructor(model) {
		this.model = model;
	}

	rows(memo) {
		const { nodes, rows } = memo;
		if (nodes.length) {
			if (!(rows.length && rows[0] instanceof Node)) {
				const { flattenFactory } = this.model.group();
				const flatten = flattenFactory(this.model);
				return flatten(nodes);
			}
		}

		return rows;
	}

	columnRows(items) {
		return items;
	}

	columnLine(items) {
		return lineView(items);
	}

	columnArea(items) {
		const line = lineView(items);
		const result = {
			left: [],
			right: [],
			mid: []
		};

		for (let i = 0, length = line.length; i < length; i++) {
			const column = line[i];
			const { pin } = column.model;
			let area = result[pin];
			if (!area) {
				throw new GridError('scene', `Unsupported pin ${pin}`);
			}

			area.push(column);
		}

		return result;
	}
}

function sortFactory(model) {
    const { index } = model.rowList();
    if (!index.size) {
        return identity;
    }

    const { rowId } = model.data();
    return rows => {
        let cursor = 0;
        const positions = new Map();
        const result =
            rows
                .filter((row, i) => {
                    const key = rowId(i, row);
                    const position = index.get(key);
                    if (position || position === 0) {
                        positions.set(position, row);
                        return false;
                    }

                    return true;
                })
                .reduce((memo, row) => {
                    let indexRow;
                    while (indexRow = positions.get(cursor)) {
                        positions.delete(cursor);
                        memo.push(indexRow);
                        cursor++;
                    }

                    memo.push(row);
                    cursor++;

                    return memo;
                }, []);

        if (positions.size) {
            const remain = Array.from(positions.entries());
            remain.sort((x, y) => x[0] - y[0]);

            return result.concat(remain.map(pos => pos[1]));
        }

        return result;
    };
}

function viewPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const tag = {
		source: context.source || 'view.pipe',
		behavior: 'core'
	};

	const { model } = context;

	const scene = new Scene(model);
	let rows = scene.rows(memo);

	const { columns, nodes, pivot } = memo;
	const columnLine = scene.columnLine(columns);

	if (!model.sort().by.length) {
		const order = sortFactory(model);
		rows = order(rows);
	}

	model.view({
		rows,
		columns: columnLine.map(c => c.model),
		nodes,
		pivot
	}, tag);

	next(memo);
}

function scenePipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const tag = {
		source: context.source || 'scene.pipe',
		behavior: 'core'
	};

	const { model } = context;

	const scene = new Scene(model);
	let rows = scene.rows(memo);

	const { columns } = memo;
	const columnLine = scene.columnLine(columns);

	if (!model.sort().by.length) {
		const order = sortFactory(model);
		rows = order(rows);
	}

	model.scene({
		rows,
		column: {
			rows: scene.columnRows(memo.columns),
			area: scene.columnArea(memo.columns),
			line: columnLine
		}
	}, tag);

	next(memo);
}

class Pipe {
	static get data() {
		return dataPipe;
	}

	static get filter() {
		return filterPipe;
	}

	static get pagination() {
		return paginationPipe;
	}

	static get sort() {
		return sortPipe;
	}

	static get memo() {
		return memoPipe;
	}

	static get group() {
		return groupPipe;
	}

	static get pivot() {
		return pivotPipe;
	}

	static get column() {
		return columnPipe;
	}

	static get columnIndex() {
		return columnIndexPipe;
	}

	static get animation() {
		return animationPipe;
	}

	static get view() {
		return viewPipe;
	}

	static get scene() {
		return scenePipe;
	}
}

const columnPipeUnit = [
	(_, context, next) => {
		const { view } = context.model;
		const { rows, pivot, nodes } = view();
		next({ rows, pivot, nodes });
	},
	Pipe.column,
	(memo, context, next) => {
		const { model } = context;
		const scene = new Scene(model);
		const columnLine = scene.columnLine(memo.columns);
		const tag = {
			source: context.source || 'column.pipe.unit',
			behavior: 'core'
		};

		model.view({
			columns: columnLine.map(c => c.model)
		}, tag);

		context.model.scene({
			column: {
				rows: scene.columnRows(memo.columns),
				area: scene.columnArea(memo.columns),
				line: columnLine
			}
		}, tag);

		next(memo);
	}
];

columnPipeUnit.why = 'redraw';

const columnIndexPipeUnit = [
	(_, context, next) => {
		const { index } = context.model.columnList();
		next(index);
	},
	Pipe.columnIndex,
	Pipe.animation,
	(memo, context, next) => {
		const { model } = context;
		const scene = new Scene(model);
		const columnLine = scene.columnLine(memo.columns);
		const tag = {
			source: context.source || 'column.pipe.unit',
			behavior: 'core'
		};

		model.view({
			columns: columnLine.map(c => c.model)
		}, tag);

		model.scene({
			column: {
				rows: scene.columnRows(memo.columns),
				area: scene.columnArea(memo.columns),
				line: columnLine
			}
		}, tag);

		next(memo);
	}
];

columnIndexPipeUnit.why = 'redraw';

const defaultPipeUnit = [
	Pipe.data,
	Pipe.filter,
	Pipe.sort,
	Pipe.memo,
	Pipe.group,
	Pipe.pivot,
	Pipe.column,
	Pipe.view,
	Pipe.pagination,
	Pipe.animation,
	Pipe.scene
];

defaultPipeUnit.why = 'refresh';

const groupPipeUnit = [
	(_, context, next) => {
		const { model } = context;
		const { nodes, rows } = model.view();
		next({ nodes, rows });
	},
	Pipe.pagination,
	(memo, context, next) => {
		const { model } = context;
		const tag = {
			source: context.source || 'group.pipe.unit',
			behavior: 'core'
		};

		const { rows } = memo;		
		model.scene({ rows }, tag);

		next(memo);
	}
];

groupPipeUnit.why = 'redraw';

class RowDetailsStatus {
	constructor(expand) {
		this.expand = expand;
	}
}

function flatView(model, mode) {
	const { rows } = model.scene();
	const { status } = model.row();
	const { line } = model.scene().column;

	const showAll = mode === 'all';
	const expandColumn = line.find(c => c.model.type === 'row-expand');
	const columnIndex = expandColumn ? expandColumn.columnIndex : 0;

	const result = [];
	const createColumn = columnFactory(model);
	for (let cursor = 0, length = rows.length; cursor < length; cursor++) {
		const dataRow = rows[cursor];
		result.push(dataRow);

		const nextRow = rows[cursor + 1];
		const detailsRow = nextRow instanceof RowDetails ? nextRow : null;
		const state = status.get(dataRow) || (showAll && new RowDetailsStatus(true));
		if (state instanceof RowDetailsStatus && state.expand) {
			if (detailsRow) {
				result.push(detailsRow);
				cursor++;
			} else {
				const column = createColumn('row-details');
				column.columnIndex = columnIndex;
				result.push(new RowDetails(dataRow, column));
			}

			continue;
		}

		if (detailsRow) {
			cursor++;
		}
	}

	return result;
}

function invalidateStatus(rows, status, mode) {
	switch (mode) {
		case 'all': {
			status = new Map(status.entries());
			rows.forEach(row => {
				if (!status.has(row)) {
					status.set(row, new RowDetailsStatus(true));
				}
			});
			break;
		}
		case 'single': {
			status = new Map(Array
				.from(status.entries())
				.filter(entry => {
					const [row, status] = entry;
					return rows.indexOf(row) >= 0 || !(status instanceof RowDetailsStatus);
				}));
			break;
		}
		case 'multiple': {
			status = new Map(status.entries());
			break;
		}
		default: {
			throw new GridError(
				'row.details.service',
				`Invalid mode ${mode}`
			);
		}
	}

	return status;
}

function toggleStatus(rows, status, mode = 'single') {
	status = invalidateStatus(rows, status, mode);
	if (mode !== 'all') {
		rows.forEach(row => {
			const state = status.get(row);
			if (!state) {
				status.set(row, new RowDetailsStatus(true));
			} else {
				state.expand = !state.expand;
			}
		});
	}

	return status;
}

const rowDetailsPipeUnit = [
	(_, context, next) => {
		const tag = {
			source: context.source || 'row.details.pipe.unit',
			behavior: 'core'
		};

		const { model } = context;
		const { mode } = model.row();
		const rows = flatView(model, mode);
		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(rows);
	}
];

rowDetailsPipeUnit.why = 'redraw';

const viewPipeUnit = [
	Pipe.data,
	Pipe.memo,
	Pipe.column,
	Pipe.view,
	Pipe.scene
];

viewPipeUnit.why = 'refresh';

const scenePipeUnit = [
	Pipe.data,
	Pipe.memo,
	Pipe.column,
	Pipe.view,
	Pipe.pagination,
	Pipe.animation,
	Pipe.scene
];

scenePipeUnit.why = 'redraw';

const rowPipeUnit = [
	(_, context, next) => {
		const { model } = context;
		const { rows, pivot, nodes } = model.view();
		const order = sortFactory(model);
		const memo = {
			rows: order(rows),
			pivot,
			nodes,
		};

		next(memo);
	},
	Pipe.animation,
	(memo, context, next) => {
		const { model } = context;
		const { rows } = memo;

		const tag = {
			source: context.source || 'row.pipe.unit',
			behavior: 'core'
		};

		model.view({ rows }, tag);
		model.scene({ rows }, tag);

		next(rows);
	}
];

rowPipeUnit.why = 'redraw';

class PipeUnit {
	static get default() {
		return defaultPipeUnit;
	}

	static get view() {
		return viewPipeUnit;
	}

	static get scene() {
		return scenePipeUnit;
	}

	static get column() {
		return columnPipeUnit;
	}

	static get columnIndex() {
		return columnIndexPipeUnit;
	}

	static get rowDetails() {
		return rowDetailsPipeUnit;
	}

	static get group() {
		return groupPipeUnit;
	}

	static get row() {
		return rowPipeUnit;
	}
}

class DataState {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;

		this.rowId = (index, row) => row;
		this.columnId = (index, column) => column.key;
	}
}

class Container {
	constructor(elements) {
		this.elements = elements;
	}

	getBoundingClientRect() {
		const rects = this.elements.map(element => element.getBoundingClientRect());
		const top = min(rects.map(r => r.top));
		const left = min(rects.map(r => r.left));
		const bottom = max(rects.map(r => r.bottom));
		const right = max(rects.map(r => r.right));
		return {
			height: bottom - top,
			width: right - left,
			top: top,
			left: left,
			right: right,
			bottom: bottom
		};
	}

	addClass(name) {
		this.elements.forEach(element => element.classList.add(escapeAttr(name)));
	}

	removeClass(name) {
		this.elements.forEach(element => element.classList.remove(escapeAttr(name)));
	}

	hasClass(name) {
		return this.elements.some(element => element.classList.contains(escapeAttr(name)));
	}

	get clientWidth() {
		return max(this.elements.map(element => element.clientWidth));
	}

	get clientHeight() {
		return max(this.elements.map(element => element.clientHeight));
	}

	get offsetWidth() {
		return max(this.elements.map(element => element.offsetWidth));
	}

	get offsetHeight() {
		return max(this.elements.map(element => element.offsetHeight));
	}

	get classList() {
		return {
			add: name => this.addClass(name),
			remove: name => this.removeClass(name),
			contains: name => this.hasClass(name)
		};
	}
}

class TrContainer {
	constructor(elements) {
		this.elements = elements;
	}

	get index() {
		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr.index;
	}

	get model() {
		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr && tr.model;
	}

	get element() {
		const { elements } = this;
		if (elements.length > 1) {
			return new Container(elements.map(tr => tr.element));
		}

		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr.element;
	}
}

class Bag {
	constructor() {
		this.rows = new Set();
		this.cells = new Set();
		this.elements = new Map();
		this.rowContainer = new Map();
	}

	findModel(element) {
		return this.elements.get(element);
	}

	hasModel(element) {
		return this.elements.has(element);
	}

	getRowElements() {
		return this.rowContainer.values();
	}

	getCellElements() {
		return this.cells;
	}

	addRow(tr) {
		const { rowContainer } = this;
		const { model, element } = tr;

		this.rows.add(tr);
		this.elements.set(element, tr);

		const container = rowContainer.get(model);
		if (container) {
			container.elements.push(tr);
		} else {
			rowContainer.set(model, new TrContainer([tr]));
		}
	}

	addCell(td) {
		this.cells.add(td);
		this.elements.set(td.element, td);
	}

	deleteRow(tr) {
		const { rowContainer } = this;
		const { model, element } = tr;

		this.rows.delete(tr);
		this.elements.delete(element);

		const container = rowContainer.get(model);
		if (container) {
			const { elements } = container;
			const index = elements.indexOf(element);
			if (index >= 0) {
				elements.splice(index, 1);
				if (!element.length) {
					rowContainer.delete(model);
				}
			}
		}
	}

	deleteCell(td) {
		this.cells.delete(td);
		this.elements.delete(td.element);
	}
}

class FakeClassList {
	constructor() {
	}

	add() {
	}

	remove() {
	}
}

const emptyRect = Object.freeze({
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	width: 0,
	height: 0
});

class FakeElement {
	constructor() {
		this.classList = new FakeClassList();
	}

	getBoundingClientRect() {
		return emptyRect;
	}

	get clientWidth() {
		return 0;
	}

	get clientHeight() {
		return 0;
	}

	get offsetWidth() {
		return 0;
	}

	get offsetHeight() {
		return 0;
	}
}

const fakeElement = new FakeElement();
class Unit {
	constructor() {
	}

	rect() {
		return this.getElement().getBoundingClientRect();
	}

	addClass(name) {
		this.addClassCore(name);
	}

	removeClass(name) {
		this.removeClassCore(name);
	}

	hasClass(name) {
		return this.hasClassCore(name);
	}

	width() {
		return this.getElement().clientWidth;
	}

	height() {
		return this.getElement().clientHeight;
	}

	getElement() {
		return this.getElementCore() || fakeElement;
	}

	addClassCore(name) {
		this.getElement().classList.add(escapeAttr(name));
	}

	removeClassCore(name) {
		this.getElement().classList.remove(escapeAttr(name));
	}

	hasClassCore(name) {
		return this.getElement().classList.contains(escapeAttr(name));
	}

	getElementCore() {
		return null;
	}
}

class Element extends Unit {
	constructor(element) {
		super();

		this.element = element;
	}

	getElementCore() {
		return this.element;
	}
}

class Tr {
	constructor(tr) {
		this.tr = tr;

		// We need to cache it due to possible virtual mode;
		this.index = tr.index;
	}

	get model() {
		if (!Tr.equals(this, this.tr)) {
			throw new GridError('tr', 'Internal model doesn\'t match container');
		}

		return this.tr.model;
	}

	get element() {
		if (!Tr.equals(this, this.tr)) {
			throw new GridError('tr', 'Internal model doesn\'t match container');
		}

		return this.tr.element;
	}

	static equals(x, y) {
		if (x === y) {
			return true;
		}

		if (!x || !y) {
			return false;
		}

		return x.index === y.index;
	}
}

class Row extends Element {
	constructor(box, index, element = null) {
		super(element);

		this.box = box;
		this.index = index;
	}

	model() {
		const tr = this.box.context.bag.findModel(this.getKeyElementCore());
		if (tr) {
			return new Tr(tr);
		}

		return null;
	}

	cells() {
		return this.box.rowCellsCore(this.index);
	}

	cell(columnIndex) {
		return this.box.cellCore(this.index, columnIndex);
	}

	getKeyElementCore() {
		const element = super.getElement();
		if (element.elements) {
			return element.elements[0];
		}

		return element;
	}
}

class Column {
	constructor(box, index) {
		this.box = box;
		this.index = index;
	}

	model() {
		const { columns } = this.box.model.view();
		const column = columns[this.index];
		return column || null;
	}

	cells() {
		return this.box.columnCellsCore(this.index);
	}

	cell(rowIndex) {
		return this.box.cell(rowIndex, this.index);
	}

	addClass(name) {
		const cells = this.cells();
		const length = cells.length;
		let i = 0;
		while (i < length) {
			const cell = cells[i++];
			cell.addClass(name);
		}
	}

	removeClass(name) {
		const cells = this.cells();
		const length = cells.length;
		let i = 0;
		while (i < length) {
			const cell = cells[i++];
			cell.removeClass(name);
		}
	}
}

class Td {
	constructor(td) {
		this.td = td;

		// We need to cache it due to possible virtual mode;
		this.rowIndex = td.rowIndex;
		this.columnIndex = td.columnIndex;
	}

	get row() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.row;
	}

	get column() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.column;
	}

	get value() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.value;
	}

	set value(value) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.value = value;
	}

	get label() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.label;
	}

	get element() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.element;
	}

	set label(label) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.label = label;
	}

	mode(value) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.mode(value);
	}

	static equals(x, y) {
		if (x === y) {
			return true;
		}

		if (!x || !y) {
			return false;
		}

		return x.rowIndex === y.rowIndex && x.columnIndex === y.columnIndex;
	}
}

class Cell extends Element {
	constructor(context, rowIndex, columnIndex, element = null) {
		super(element);

		this.context = context;
		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
	}

	model() {
		return this.modelCore();
	}

	modelCore() {
		const td = this.context.bag.findModel(this.getElement());
		return td ? new Td(td) : null;
	}
}

class Matrix {
    constructor(isDataRow) {
        this.isDataRow = isDataRow;
    }

    build(table) {
        const rows = table.rows;
        const isDataRow = this.isDataRow;

        const mx = [];
        const offsets = [];

        let y = 0;
        for (let cursor = 0, height = rows.length; cursor < height; cursor++) {
            const tr = rows[cursor];
            if (!isDataRow(tr)) {
                continue;
            }

            const offset = offsets.length > y ? offsets[y] : offsets[y] = [0];
            const cells = tr.cells;
            for (let x = 0, width = cells.length; x < width; x++) {
                const td = cells[x];
                const { rowSpan, colSpan } = td;
                const current = offset[0];
                const next = current + colSpan;
                for (let i = 0; i < rowSpan; i++) {
                    const yi = y + i;
                    const row = mx.length > yi ? mx[yi] : mx[yi] = [];
                    for (let j = 0; j < colSpan; j++) {
                        const xj = current + j;
                        row[xj] = td;
                    }

                    const gaps = offsets.length > yi ? offsets[yi] : offsets[yi] = [0];
                    const index = binarySearch(gaps, current);
                    if (row[next]) {
                        gaps.splice(index, 1);
                    }
                    else {
                        const xi = gaps[index];
                        gaps.splice(index, row[xi] ? 1 : 0, next);
                    }
                }
            }
            y++;
        }

        return mx;
    }

    assertFlatness(matrix) {
        if (matrix.length) {
            const height = matrix.length;
            const width = matrix[0].length;
            for (let i = 1; i < height; i++) {
                if (matrix[i].length !== width) {
                    throw new GridError(
                        'matrix',
                        `Matrix is not flat, expect width ${width}, actual ${matrix[i].length}`);
                }
            }
        }
    }
}

class Selector {
	constructor(matrix, bag, factory) {
		this.matrix = matrix;
		this.bag = bag;
		this.factory = factory;
	}

	columnCount(rowIndex) {
		const row = this.matrix[rowIndex];
		return row ? new Set(row).size : 0;
	}

	columnCells(columnIndex) {
		const { factory, matrix } = this;

		const result = [];
		const set = new Set();
		for (let i = 0, length = matrix.length; i < length; i++) {
			const row = matrix[i];
			if (row.length > columnIndex) {
				const td = row[columnIndex];
				if (!set.has(td)) {
					set.add(td);
					result.push(factory.cell(td, i, columnIndex));
				}
			}
		}

		return result;
	}

	rowCount(columnIndex) {
		const { matrix } = this;
		const set = new Set();
		for (let i = 0, length = matrix.length; i < length; i++) {
			const row = matrix[i];
			if (row.length > columnIndex) {
				const td = row[columnIndex];
				set.add(td);
			}
		}

		return set.size;
	}

	rows(columnIndex) {
		const { matrix, factory, bag } = this;
		const set = new Set();
		const result = [];
		if (isUndefined(columnIndex)) {
			const rows = bag.getRowElements();
			for (let tr of rows) {
				result.push(factory.row(tr.element, tr.index));
			}

			result.sort((x, y) => x.index - y.index);
		} else {
			for (let i = 0, length = matrix.length; i < length; i++) {
				const row = matrix[i];
				if (row.length > columnIndex) {
					const tr = row[columnIndex].parentElement;
					if (!set.has(tr)) {
						set.add(tr);
						result.push(factory.row(tr, i));
					}
				}
			}
		}

		return result;
	}

	rowCells(rowIndex) {
		const { matrix } = this;

		const row = matrix[rowIndex];
		const result = [];
		if (row) {
			const set = new Set();
			const factory = this.factory;
			for (let i = 0, length = row.length; i < length; i++) {
				const td = row[i];
				if (!set.has(td)) {
					set.add(td);
					result.push(factory.cell(td, rowIndex, i));
				}
			}
		}

		return result;
	}

	row(rowIndex, columnIndex) {
		const { factory } = this;
		if (!isUndefined(columnIndex)) {
			const td = this.td(rowIndex, columnIndex);
			return factory.row(td ? td.parentElement : new FakeElement(), rowIndex);
		}

		const row = this.matrix[rowIndex];
		if (row) {
			const set = new Set();
			for (let td of row) {
				set.add(td.parentElement);
			}

			const trs = Array.from(set);
			return factory.row(trs.length > 1 ? new Container(trs) : trs[0], rowIndex);
		}

		return factory.row(new FakeElement(), rowIndex);
	}

	cell(rowIndex, columnIndex) {
		const td = this.td(rowIndex, columnIndex);
		return this.factory.cell(td || new FakeElement(), rowIndex, columnIndex);
	}

	td(rowIndex, columnIndex) {
		const row = this.matrix[rowIndex];
		if (row) {
			const td = row[columnIndex];
			if (td) {
				return td;
			}
		}

		return null;
	}
}

class SelectorMediator {
	constructor(selectorFactory, factory) {
		this.buildSelectors = selectorFactory;
		this.factory = factory;
	}

	columnCount(rowIndex) {
		const selectors = this.buildSelectors({ row: rowIndex });
		if (!selectors.length) {
			return 0;
		}

		return sumBy(selectors, s => s.invoke((s, rowIndex) => s.columnCount(rowIndex)));
	}

	columnCells(columnIndex) {
		const selectors = this.buildSelectors({ column: columnIndex });
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cells = selector.invoke((s, columnIndex) => s.columnCells(columnIndex));
			result.push(...cells);
		}

		return result;
	}

	rowCount(columnIndex) {
		const selectors = this.buildSelectors({ column: columnIndex });
		if (!selectors.length) {
			return 0;
		}

		return max(selectors.map(s => s.invoke((s, columnIndex) => s.rowCount(columnIndex))));
	}

	rows(columnIndex) {
		const context = isUndefined(columnIndex) ? {} : { column: columnIndex };
		const selectors = this.buildSelectors(context);
		const factory = this.factory;
		const areas = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const rows = selector.invoke((s, columnIndex) => s.rows(columnIndex));
			if (rows.length) {
				areas.push(rows);
			}
		}

		const lines = zip(...areas);
		const result = [];
		for (let i = 0, length = lines.length; i < length; i++) {
			const line = lines[i];
			const elements = line.map(row => row.element);
			const rowElement = elements.length > 1 ? new Container(elements) : elements[0];
			const rowIndex = line[0].index;
			const row = factory.row(rowElement, rowIndex);
			result.push(row);
		}

		return result;
	}

	rowCells(rowIndex) {
		const selectors = this.buildSelectors({ row: rowIndex });
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cells = selector.invoke((s, rowIndex) => s.rowCells(rowIndex));
			result.push(...cells);
		}

		return result;
	}

	row(rowIndex, columnIndex) {
		const context = { row: rowIndex };
		if (!isUndefined(columnIndex)) {
			context.column = columnIndex;
		}

		const selectors = this.buildSelectors(context);
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const row = selector.invoke((s, rowIndex, columnIndex) => s.row(rowIndex, columnIndex));
			result.push(row.element);
		}

		return this.factory.row(new Container(result), rowIndex);
	}

	cell(rowIndex, columnIndex) {
		const context = { row: rowIndex, column: columnIndex };
		const selectors = this.buildSelectors(context);
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cell = selector.invoke((s, rowIndex, columnIndex) => s.cell(rowIndex, columnIndex));
			if (!(cell.element instanceof FakeElement)) {
				return cell;
			}
		}

		return this.factory.cell(new FakeElement(), rowIndex, columnIndex);
	}
}

class UnitFactory {
	constructor(rowRange, columnRange) {
		this.rowRange = rowRange;
		this.columnRange = columnRange;
	}

	cell(element, rowIndex, columnIndex) {
		return {
			element,
			rowIndex: rowIndex + this.rowRange.start,
			columnIndex: columnIndex + this.columnRange.start
		};
	}

	row(element, rowIndex) {
		return {
			element,
			index: rowIndex + this.rowRange.start
		};
	}
}

class Range {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
}

class SelectorFactory {
	constructor(bag, selectorMark) {
		this.bag = bag;
		this.selectorMark = selectorMark;
	}

	create() {
		const { bag, selectorMark } = this;

		const matrix = new Matrix(tr => bag.elements.has(tr));
		const entries =
			selectorMark
				.select()
				.map(({ element, rowRange, columnRange }) => ({
					matrix: matrix.build(element),
					rowRange,
					columnRange
				}));

		const selectorFactory = context => {
			return entries.map(entry => ({
				invoke: f => {
					const unitFactory = new UnitFactory(entry.rowRange, entry.columnRange);
					const selector = new Selector(entry.matrix, bag, unitFactory);

					const args = [];
					args.push(selector);

					if (context.hasOwnProperty('row')) {
						args.push(context.row - entry.rowRange.start);
					}

					if (context.hasOwnProperty('column')) {
						args.push(context.column - entry.columnRange.start);
					}

					return f(...args);
				}
			}));
		};

		const unitFactory = new UnitFactory(new Range(0, 0), new Range(0, 0));
		return new SelectorMediator(selectorFactory, unitFactory);
	}
}

class Box {
	constructor(context, model, selectorMark) {
		this.context = context;
		this.model = model;

		this.selectFactory = new SelectorFactory(context.bag, selectorMark);

		this.selector = this.selectFactory.create();
	}

	columnCount(rowIndex) {
		return this.selector.columnCount(rowIndex);
	}

	column(columnIndex) {
		return this.createColumnCore(columnIndex);
	}

	columns(rowIndex) {
		return this.selector
			.rowCells(rowIndex)
			.map(cell => this.createColumnCore(cell.columnIndex));
	}

	row(rowIndex, columnIndex) {
		return this.rowCore(rowIndex, columnIndex);
	}

	rows(columnIndex) {
		return this.selector.rows(columnIndex).map(row => this.createRowCore(row.index, row.element));
	}

	rowCount(columnIndex) {
		return this.selector.rowCount(columnIndex);
	}

	cell(rowIndex, columnIndex) {
		return this.cellCore(rowIndex, columnIndex);
	}

	getElements() {
		return [];
	}

	rowCore(rowIndex, columnIndex) {
		return this.createRowCore(rowIndex, this.selector.row(rowIndex, columnIndex).element);
	}

	cellCore(rowIndex, columnIndex) {
		const cell = this.selector.cell(rowIndex, columnIndex);
		return this.createCellCore(cell.rowIndex, cell.columnIndex, cell.element);
	}

	rowCellsCore(rowIndex) {
		return this.selector
			.rowCells(rowIndex)
			.map(cell => this.createCellCore(cell.rowIndex, cell.columnIndex, cell.element));
	}

	columnCellsCore(columnIndex) {
		return this.selector
			.columnCells(columnIndex)
			.map(cell => this.createCellCore(cell.rowIndex, cell.columnIndex, cell.element));
	}

	createRowCore(index, element) {
		return new Row(this, index, element);
	}

	createColumnCore(index) {
		return new Column(this, index);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new Cell(this.context, rowIndex, columnIndex, element);
	}
}

class StyleBox {
	constructor(context) {
		this.context = context;
		this.entries = new Map();
	}

	addClass(item, name) {
		const key = this.key(item);
		if (key !== null) {
			let entry = this.entries.get(key);
			if (!entry) {
				entry = new Set();
				this.entries.set(key, entry);
			}

			entry.add(name);
		}
	}

	removeClass(item, name) {
		const key = this.key(item);
		if (key !== null) {
			let entry = this.entries.get(key);
			if (entry) {
				entry.delete(name);
				if (!entry.size) {
					this.entries.delete(key);
				}

				return true;
			}
		}

		return false;
	}

	key(item) {
		return item;
	}
}

class CellBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(cell) {
		return `${cell.dataRowIndex}x${cell.dataColumnIndex}`;
	}
}

class ColumnBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(column) {
		return column.dataIndex;
	}
}

class RowBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(row) {
		return row.dataIndex;
	}
}

class VirtualTd {
	constructor(selector) {
		this.selector = selector;
	}

	get model() {
		const td = this.selector();
		if (!td) {
			throw new GridError('cell', 'Model is not found');
		}

		return td;
	}

	mode(value) {
		return this.model.mode(value);
	}

	get value() {
		return this.model.value;
	}

	set value(value) {
		this.model.value = value;
	}

	get label() {
		return this.model.label;
	}

	set label(value) {
		this.model.label = value;
	}

	get element() {
		return this.model.element || new FakeElement();
	}
}

class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;

		const { mapper } = box.context;
		this.dataRowIndex = mapper.viewToRow(rowIndex);
		this.dataColumnIndex = mapper.viewToColumn(columnIndex);
	}

	model() {
		const rowIndex = this.dataRowIndex;
		const columnIndex = this.dataColumnIndex;

		if (rowIndex >= 0 && columnIndex >= 0) {
			const gridModel = this.box.model;
			const { rows } = gridModel.data();
			const { columns } = gridModel.view();

			if (rows.length > rowIndex && columns.length > columnIndex) {
				const selector = () => this.box.cell(rowIndex, columnIndex).modelCore();
				const vtd = new VirtualTd(selector);
				vtd.rowIndex = rowIndex;
				vtd.columnIndex = columnIndex;
				vtd.row = rows[rowIndex];
				vtd.column = columns[columnIndex];

				return new Td(vtd);
			}
		}

		return null;
	}

	addClass(name, force = false) {
		this.box.addCellClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeCellClass(this, name, force);
	}
}

class VirtualColumn extends Column {
	constructor(box, index) {
		super(box, index);

		this.box = box;

		const { mapper } = box.context;
		this.dataIndex = mapper.viewToColumn(index);
	}

	cells() {
		return this.box.columnCellsCore(this.dataIndex);
	}

	cell(rowIndex) {
		return this.box.cell(rowIndex, this.dataIndex);
	}

	addClass(name, force = false) {
		this.box.addColumnClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeColumnClass(this, name, force);

	}
}

class VirtualElement {
	constructor(getRect) {
		this.classList = new FakeClassList();
		this.getRect = getRect;
	}

	getBoundingClientRect() {
		return this.getRect();
	}

	get clientWidth() {
		return this.getRect().width;
	}

	get clientHeight() {
		return this.getRect().height;
	}

	get offsetWidth() {
		return this.getRect().width;
	}

	get offsetHeight() {
		return this.getRect().height;
	}
}

class VirtualRow extends Row {
	constructor(box, index, element = null) {
		super(box, index, element);

		const { mapper } = box.context;
		this.dataIndex = mapper.viewToRow(index);
	}

	model() {
		const model = super.model();
		if (model) {
			return model;
		}

		const index = this.dataIndex;
		if (index >= 0) {
			const gridModel = this.box.model;
			const { rows } = gridModel.data();
			if (rows.length > index) {
				return rows[index];
			}
		}

		return null;
	}

	cells() {
		return this.box.rowCellsCore(this.dataIndex);
	}

	cell(columnIndex) {
		return this.box.cellCore(this.dataIndex, columnIndex);
	}

	addClass(name, force = false) {
		this.box.addRowClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeRowClass(this, name, force);
	}
}

class VirtualBox extends Box {
	constructor(context, model, selectorMark) {
		super(context, model, selectorMark);

		this.cellBox = new CellBox(context);
		this.rowBox = new RowBox(context);
		this.columnBox = new ColumnBox(context);
		this.requestInvalidate = new Event();
	}

	addCellClass(cell, name, force = false) {
		if (force) {
			cell.addClassCore(name);
		}
		else {
			this.cellBox.addClass(cell, name);
			this.requestInvalidate.emit({ source: 'addCellClass' });
		}
	}

	removeCellClass(cell, name, force = false) {
		if (force) {
			cell.removeClassCore(name);
		}
		else {
			this.cellBox.removeClass(cell, name);
			this.requestInvalidate.emit({ source: 'removeCellClass' });
		}
	}

	addRowClass(row, name, force = false) {
		if (force) {
			row.addClassCore(name);
		}
		else {
			this.rowBox.addClass(row, name);
			this.requestInvalidate.emit({ source: 'addRowClass' });
		}
	}

	removeRowClass(row, name, force = false) {
		if (force) {
			row.removeClassCore(name);
		}
		else {
			this.rowBox.removeClass(row, name);
			this.requestInvalidate.emit({ source: 'removeRowClass' });
		}
	}

	addColumnClass(column, name, force = false) {
		if (force) {
			column.addClassCore(name);
		}
		else {
			this.columnBox.addClass(column, name);
			this.requestInvalidate.emit({ source: 'addColumnClass' });
		}
	}

	removeColumnClass(column, name, force = false) {
		if (force) {
			column.removeClassCore(name);
		}
		else {
			this.columnBox.removeClass(column, name);
			this.requestInvalidate.emit({ source: 'removeColumnClass' });
		}
	}

	columns() {
		const columns = this.context.view.columns();
		return columns.map((_, i) => this.createColumnCore(i));
	}

	rows(columnIndex) {
		const { mapper } = this.context;
		return this.selector
			.rows(columnIndex)
			.map(row => this.createRowCore(mapper.rowToView(row.index), row.element));
	}

	rowCount() {
		return this.model.pagination().count;
	}

	rowCore(index) {
		const viewIndex = this.context.mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCore(viewIndex);
		}

		const createRect = this.rowRectFactory();
		return this.createRowCore(viewIndex, new VirtualElement(createRect(viewIndex)));
	}

	cellCore(rowIndex, columnIndex) {
		const { mapper } = this.context;
		const viewRowIndex = mapper.rowToView(rowIndex);
		const viewColumnIndex = mapper.columnToView(columnIndex);
		if (viewRowIndex >= 0 && viewRowIndex < super.rowCount(viewColumnIndex)) {
			return super.cellCore(viewRowIndex, viewColumnIndex);
		}

		const createRect = this.cellRectFactory();
		return this.createCellCore(viewRowIndex, viewColumnIndex, new VirtualElement(createRect(viewRowIndex, viewColumnIndex)));
	}

	rowCellsCore(index) {
		const { mapper } = this.context;
		const viewIndex = mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCellsCore(viewIndex);
		}

		const createRect = this.cellRectFactory();
		return super
			.rowCellsCore(0)
			.map((cell, columnIndex) =>
				this.createCellCore(
					viewIndex,
					columnIndex,
					new VirtualElement(createRect(viewIndex, mapper.columnToView(columnIndex)))
				)
			);
	}

	createRowCore(index, element) {
		return new VirtualRow(this, index, element);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new VirtualCell(this, rowIndex, columnIndex, element);
	}

	createColumnCore(index) {
		return new VirtualColumn(this, index);
	}

	rowRectFactory() {
		const { height } = this.model.row();
		const getHeight = isFunction(height) ? height : () => height;

		let rect = null;
		// as view.rect() can call getBoundingClientRect that impacts performance
		// and as virtual element rect function is used mostly for end/home navigation we make rect lazy
		return index => () => {
			if (!rect) {
				rect = this.context.view.rect('body-mid');
			}

			// TODO: add correct left, right, width
			const rowHeight = getHeight(null, index);
			return {
				left: 0,
				right: 0,
				top: rect.top + rowHeight * index,
				bottom: rect.top + rowHeight * (index + 1),
				width: 0,
				height: rowHeight
			};
		};
	}

	cellRectFactory() {
		const { model } = this;
		const { height: rowHeight } = model.row();
		const { count: pageCount } = model.pagination();
		const { columns } = model.view();
		const columnWidths = this.model.layout().columns;

		const getHeight = isFunction(rowHeight) ? rowHeight : () => rowHeight;

		let rect = null;

		// as view.rect() can call getBoundingClientRect that impacts performance
		// and as virtual element rect function is used mostly for end/home navigation we make rect lazy
		return (rowIndex, columnIndex) => () => {
			if (!rect) {
				rect = this.context.view.rect('body-mid');
			}

			const column = columns[columnIndex];

			// TODO: add correct left, right, width
			const height = getHeight(null, rowIndex);
			const top = rect.top + height * rowIndex - (rowIndex > 0 ? 0 : (pageCount + rowIndex) * height);
			const width = columnWidths.has(column.key) ? columnWidths.get(column.key).width : 0;
			const left = 0;
			return {
				left,
				right: left + width,
				top,
				bottom: top + height,
				width,
				height
			};
		};
	}
}

class SelectorMark {
	constructor(model, markup, name) {
		this.model = model;
		this.name = name;
		this.markup = markup;
	}

	select() {
		const result = [];
		const addNext = this.addFactory(result);

		addNext('left');
		addNext('mid');
		addNext('right');

		return result;
	}

	addFactory(result) {
		const { model } = this;
		const { rows } = model.scene();
		const columnArea = model.scene().column.area;

		return pin => {
			const name = pin ? `${this.name}-${pin}` : this.name;
			const element = this.markup[name];
			if (element) {
				const prev = result[result.length - 1];
				const columnStart = prev ? prev.columnRange.end : 0;
				const columnCount = columnArea[pin].length;
				const rowStart = 0;
				const rowCount = rows.length;

				result.push({
					element,
					columnRange: new Range(columnStart, columnStart + columnCount),
					rowRange: new Range(rowStart, rowStart + rowCount)
				});
			}

			return result;
		};
	}
}

class Body extends Box {
	constructor(context, model) {
		super(context, model, new SelectorMark(model, context.markup, 'body'));
	}
}

class VirtualBody extends VirtualBox {
	constructor(context, model) {
		super(context, model, new SelectorMark(model, context.markup, 'body'));
	}
}

class Data {
	constructor(model) {
		this.model = model;
	}

	columns() {
		return this.model.view().columns;
	}

	columnMap() {
		return mapColumns(this.columns());
	}

	rows() {
		return this.model.scene().rows;
	}
}

class FakeLayer {
	constructor() {
	}

	resource() {
	}

	destroy() {
	}
}

class FakeTable {
	constructor() {
		this.rows = [];
	}
}

class Foot extends Box {
	constructor(context, model) {
		super(context, model, new SelectorMark(model, context.markup, 'foot'));
	}
}

class Head extends Box {
	constructor(context, model, markup) {
		super(context, model, new SelectorMark(model, context.markup, 'head'));
	}
}

class SelectorCache {
	constructor(selector) {
		this.selector = selector;

		this.clear();
	}

	clear() {
		this.columnCountCache = {};
		this.columnCellsCache = {};
		this.rowCountCache = {};
		this.rowsCache = {};
		this.rowCellsCache = {};
		this.rowCache = {};
		this.cellCache = {};
	}

	columnCount(rowIndex) {
		if (this.columnCountCache.hasOwnProperty(rowIndex)) {
			return this.columnCountCache.get(rowIndex);
		}

		return this.columnCountCache[rowIndex] = this.selector.columnCount(rowIndex);
	}

	columnCells(columnIndex) {
		if (this.columnCells.hasOwnProperty(columnIndex)) {
			return this.columnCells.get(columnIndex);
		}

		return this.columnCells[columnIndex] = this.selector.columnCells(columnIndex);
	}

	rowCount(columnIndex) {
		if (this.rowCountCache.hasOwnProperty(columnIndex)) {
			return this.rowCountCache.get(columnIndex);
		}

		return this.rowCountCache[columnIndex] = this.selector.rowCount(columnIndex);
	}

	rows(columnIndex) {
		if (this.rowsCache.hasOwnProperty(columnIndex)) {
			return this.rowsCache.get(columnIndex);
		}

		return this.rowsCache[columnIndex] = this.selector.rows(columnIndex);
	}

	rowCells(rowIndex) {
		if (this.rowCellsCache.hasOwnProperty(rowIndex)) {
			return this.rowCellsCache.get(rowIndex);
		}

		return this.rowCellsCache[rowIndex] = this.selector.rowCells(rowIndex);
	}

	row(rowIndex, columnIndex) {
		const key = `${rowIndex}x${columnIndex}`;
		if (this.rowCache.hasOwnProperty(key)) {
			return this.rowCache.get(key);
		}

		return this.rowCache[key] = this.selector.row(rowIndex, columnIndex);
	}

	cell(rowIndex, columnIndex) {
		const key = `${rowIndex}x${columnIndex}`;
		if (this.cellCache.hasOwnProperty(key)) {
			return this.cellCache.get(key);
		}

		return this.cellCache[key] = this.selector.cell(rowIndex, columnIndex);
	}
}

function isParentOf(parent, element) {
	while (element) {
		if (element === parent) {
			return true;
		}

		element = element.parentNode;
	}

	return false;
}

class View extends Unit {
	constructor(context, model) {
		super();

		this.context = context;
		this.model = model;
		this.layers = new Map();
	}

	columns() {
		const { column } = this.model.scene();
		return column.line;
	}

	focus() {
		const elements = this.getElementsCore('body');
		if (elements.length) {
			elements[0].focus();
			return true;
		}

		return false;
	}

	blur() {
		this.getElementsCore('body')
			.forEach(element => element.blur());
	}

	isFocused() {
		return this.getElementsCore('body')
			.some(element => this.isFocusedCore(element));
	}

	addLayer(name) {
		const layers = this.layers;
		if (layers.has(name)) {
			return layers.get(name);
		}

		const layer = this.context.layer(name);
		layers.set(name, layer);
		return layer;
	}

	removeLayer(name) {
		const layers = this.layers;
		if (layers.has(name)) {
			const layer = layers.get(name);
			layer.destroy();
			layers.delete(name);
			return true;
		}

		return false;
	}

	hasLayer(name) {
		return this.layers.has(name);
	}

	addClass(name) {
		const { markup } = this.context;
		if (markup.view) {
			markup.view.classList.add(escapeAttr(name));
		}
	}

	removeClass(name) {
		const { markup } = this.context;
		if (markup.view) {
			markup.view.classList.remove(escapeAttr(name));
		}
	}

	scrollLeft(value) {
		const { markup } = this.context;
		if (arguments.length) {
			const headMid = markup['head-mid'];
			if (headMid) {
				headMid.scrollLeft = value;
			}

			const footMid = markup['foot-mid'];
			if (footMid) {
				footMid.scrollLeft = value;
			}

			const bodyMid = markup['body-mid'];
			if (bodyMid) {
				bodyMid.scrollLeft = value;
			}

			const bodyTop = markup['body-top'];
			if (bodyTop) {
				bodyTop.scrollLeft = value;
			}

			const bodyBottom = markup['body-bottom'];
			if (bodyBottom) {
				bodyBottom.scrollLeft = value;
			}

			return;
		}

		return this.getElement().scrollLeft;
	}

	scrollTop(value) {
		if (arguments.length) {
			this.getElementsCore('body')
				.forEach(element => element.scrollTop = value);

			return;
		}

		return this.getElement().scrollTop;
	}

	scrollHeight() {
		return this.getElement().scrollHeight;
	}

	scrollWidth() {
		return this.getElement().scrollWidth;
	}

	canScrollTo(target, direction) {
		if (target && !(target.element instanceof FakeElement)) {
			switch (direction) {
				case 'left': {
					target = target.element;
					if (target) {
						const { markup } = this.context;
						const tableMid = markup['table-mid'];
						if (tableMid) {
							return isParentOf(tableMid, target);
						}
					}
					break;
				}
				case 'top': {
					return true;
				}
			}
		}

		return false;
	}

	rect(area = 'body-mid') {
		const { markup } = this.context;
		const element = markup[area];
		if (element) {
			// TODO: get rid of that
			const rect = element.getBoundingClientRect();

			// Get rect without scrolls
			const width = element.clientWidth;
			const height = element.clientHeight;
			const left = rect.left;
			const top = rect.top;
			const right = left + width;
			const bottom = top + height;
			return { left, top, right, bottom, width, height };
		}

		return super.rect();
	}

	height(area = 'body-mid') {
		const { markup } = this.context;
		const element = markup[area];
		if (element) {
			return element.clientHeight;
		}

		return 0;
	}

	width(area = 'body-mid') {
		const { markup } = this.context;
		const element = markup[area];
		if (element) {
			return element.clientWidth;
		}

		return 0;
	}

	getElementCore() {
		const { markup } = this.context;
		return markup['body-mid'];
	}

	isFocusedCore(target) {
		const { markup } = this.context;
		const { activeElement } = markup['document'];

		return isParentOf(target, activeElement);
	}

	getElementsCore(key) {
		const { markup } = this.context;
		return [`${key}-left`, `${key}-mid`, `${key}-right`]
			.filter(key => markup.hasOwnProperty(key))
			.map(key => markup[key]);
	}
}

class Table {
	constructor(model, box) {
		this.model = model;

		const { scroll } = model;
		const defaults = {
			mapper: {
				rowToView: index => scroll().map.rowToView(index),
				viewToRow: index => scroll().map.viewToRow(index),
				columnToView: identity,
				viewToColumn: identity
			},
			layer: () => new FakeLayer(),
			bag: {
				head: new Bag(),
				body: new Bag(),
				foot: new Bag()
			},
			markup: {}
		};

		this.box = assignWith(defaults, box);

		this._data = new Lazy(() => new Data(model));
		this._view = new Lazy(() => new View(box, model));
		this._head = new Lazy(() => new Head(this.boxContext('head'), model));
		this._foot = new Lazy(() => new Foot(this.boxContext('foot'), model));
		this._body = new Lazy(() => {
			const context = this.boxContext('body');
			return scroll().mode === 'virtual'
				? new VirtualBody(context, model)
				: new Body(context, model)
		});
	}

	invalidate() {
		this.head.selector = this.head.selectFactory.create();
		this.body.selector = this.body.selectFactory.create();
		this.foot.selector = this.foot.selectFactory.create();
	}

	get view() {
		return this._view.instance;
	}

	get data() {
		return this._data.instance;
	}

	get head() {
		return this._head.instance;
	}

	get body() {
		return this._body.instance;
	}

	get foot() {
		return this._foot.instance;
	}

	boxContext(source) {
		const { view, data } = this;
		const { mapper, layer, bag, markup } = this.box;

		switch (source) {
			case 'body': {
				return {
					mapper,
					layer,
					bag: bag[source],
					view,
					data,
					markup
				};
			}
			default: {
				return {
					mapper: {
						rowToView: identity,
						viewToRow: identity,
						columnToView: identity,
						viewToColumn: identity
					},
					layer,
					bag: bag[source],
					view,
					data,
					markup
				};
			}
		}
	}
}

function tableFactory(model, layer) {
	const box = {
		markup: {
			document
		},
		bag: {
			head: new Bag(),
			body: new Bag(),
			foot: new Bag()
		},
		layer,
	};

	return new Table(model, box);
}

class DragService {
	constructor() {
	}

	static get mimeType() {
		return `application/x-${GRID_PREFIX}+json`;
	}

	static decode(source) {
		return JSON.parse(source);
	}

	static encode(source) {
		return JSON.stringify(source);
	}
}

DragService.element = null;
DragService.data = null;
DragService.area = null;
DragService.startPosition = null;

class DragState {
	constructor() {
		this.isActive = false;
	}
}

class Fetch {
	constructor(select) {
		this.select = select;
		this.busy = null;
		this.result = null;
	}

	run(item) {
		const select = this.select;

		this.result = null;
		let alive = true;
		this.busy = new Promise((resolveBusy, rejectBusy) => {
			const resolve = data => {
				if (alive) {
					this.result = data;
					resolveBusy(data);
				}
			};

			if (isFunction(select)) {
				const deferred = {
					resolve: resolve,
					reject: rejectBusy
				};

				const args = Array.from(arguments).slice(1) || [];
				const result = select(item, deferred, ...args);
				if (!isUndefined(result)) {
					this.invoke(result, resolve, rejectBusy);
				}
				// when user should invoke d.resolve or d.reject
			}
			else {
				this.invoke(select, resolve, rejectBusy);
			}
		});

		return () => {
			this.busy = null;
			alive = false;
		};
	}

	invoke(instance, resolve, reject) {
		if (instance && isFunction(instance.then)) {
			// when options.fetch returns promise
			instance.then(resolve);
			if (isFunction(instance.catch)) {
				instance.catch(reject);
			}
		} else if (instance && isFunction(instance.subscribe)) {
			// when options.fetch returns observable
			let isProcessed = false;
			let subscription;
			subscription = instance.subscribe(
				(...args) => {
					resolve(...args);
					isProcessed = true;
					if (subscription && isFunction(subscription.unsubscribe)) {
						// when async
						subscription.unsubscribe(); 
						subscription = null;
					}
				},
				reject
			);

			if (isProcessed) {
				if (subscription && isFunction(subscription.unsubscribe)) {
					// when sync
					subscription.unsubscribe();
					subscription = null;
				}
			}
		} else {
			// when options.fetch return result
			resolve(instance);
		}
	}
}

class CellEditorCore {
	constructor(td) {
		this.td = td;

		this.value = null;
		this.label = null;

		this.fetch = noop;
		this.resetFetch = noop;
	}

	commit() {
	}

	reset() {
	}

	clear() {

	}
}

const empty$1 = new CellEditorCore(null);

class CellEditor extends CellEditorCore {
	constructor(td) {
		super(td);

		this.fetch = this.fetchFactory();
		this.resetFetch = this.fetch.run(td.row);

		if (isUndefined(td.value)) {
			this.value = null;
		}
		else {
			const parse = parseFactory(td.column.type, td.column.editor);
			const typedValue = parse(clone(td.value));
			this.value = typedValue === null ? td.value : typedValue;
		}

		this.label = isUndefined(td.label) ? null : clone(td.label);
	}

	commit() {
		this.td.value = this.value;
		this.td.label = this.label;

		this.resetFetch();
		this.resetFetch = noop;
	}

	reset() {
		this.label = this.td.label;
		this.value = this.td.value;

		this.resetFetch();
		this.resetFetch = noop;
	}

	clear() {
		this.label = null;
		this.value = null;

		this.resetFetch();
		this.resetFetch = noop;
	}

	fetchFactory() {
		const { editorOptions } = this.td.column;
		if (editorOptions && editorOptions.fetch) {
			return new Fetch(editorOptions.fetch);
		}

		return new Fetch(this.td.value);
	}

	get cell() {
		return this.td;
	}

	static get empty() {
		return empty$1;
	}
}

function toLIVR(rules, key) {
	const validationRules = [];
	rules.forEach(rule => {
		if (rule.key === key) {
			for (let name of Object.keys(rule)) {
				if (name !== 'key' && name !== 'for') {
					validationRules.push({
						[name]: rule[name]
					});
				}
			}
		}
	});
	return {
		hasRules: validationRules.length > 0,
		rules: { [key]: validationRules }
	};
}

function hasRules(rules, key) {
	return toLIVR(rules, key).hasRules;
}

function createValidator(rules, key) {
	if (arguments.length === 2) {
		const settings = toLIVR(rules, key);
		return new LIVR.Validator(settings.rules);
	}

	return new LIVR.Validator(rules);
}

class EditCellLet {
	constructor(plugin, shortcut) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.shortcut = shortcut;

		this.editor = CellEditor.empty;
		this.requestClose = null;

		const commands = this.getCommands();
		shortcut.register(commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.push = commands.get('push');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
		this.exit = commands.get('exit');
		this.clear = commands.get('clear');

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.tag.source !== 'edit.cell.view') {
					if (e.changes.status.newValue === 'edit') {
						// this is a trick to go back to the view mode and trigger enter
						// TODO: make it better
						model.edit({
							status: 'view'
						}, {
							source: 'edit.cell.view'
						});

						if (this.enter.canExecute()) {
							this.enter.execute();
						}
					} else if (e.changes.status.newValue === 'view') {
						// this is a trick to go back to the edit mode and trigger cancel
						// TODO: make it better
						model.edit({
							status: 'edit'
						}, {
							source: 'edit.cell.view'
						});

						if (this.requestClose) {
							if (this.requestClose()) {
								return;
							}
						}

						if (this.cancel.canExecute()) {
							this.cancel.execute();
						}
					}
				}
			});

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					if (this.requestClose) {
						if (this.requestClose()) {
							return;
						}
					}

					const editCell = this.editor.td;
					if (editCell) {
						if (editCell.column.category === 'data') {
							if (this.commit.canExecute(editCell)) {
								this.commit.execute(editCell);
							}
						} else {
							if (this.cancel.canExecute(editCell)) {
								this.cancel.execute(editCell);
							}
						}
					}

					const { cell } = e.state;
					if (cell && (cell.column.editorOptions.trigger === 'focus')) {
						if (this.enter.canExecute(cell)) {
							this.enter.execute(cell);
						}
					}
				}
			});
	}

	mode(cell, status) {
		const { model } = this.plugin;
		model.edit({ status }, { source: 'edit.cell.view' });
		cell.mode(status);
	}

	getCommands() {
		const { model, table } = this.plugin;

		const commands = {
			enter: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('enter'),
				canExecute: cell => {
					// TODO: source should be set up from outside
					const source = cell ? 'mouse' : 'keyboard';
					if (source === 'keyboard' && Shortcut.isControl(this.shortcut.keyCode())) {
						return false;
					}

					cell = cell || model.navigation().cell;

          //cell is an array when using custom template
          if(Array.isArray(cell)) {
            if(cell.length > 0) {
              if (cell[0].constructor.name == 'TdCoreDirective') {
                cell = cell[0];
              }
            }
          }
          
					return cell
						&& cell.column.canEdit
						&& (cell.column.category === 'control' || model.edit().mode === 'cell')
						&& model.edit().status === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(cell, cell.value, cell.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					// TODO: source should be set up from outside
					const source = cell ? 'mouse' : 'keyboard';
					cell = cell || model.navigation().cell;
					if (cell && model.edit().enter.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
						const td = table.body.cell(cell.rowIndex, cell.columnIndex).model();
						this.editor = new CellEditor(td);

						const keyCode = this.shortcut.keyCode();
						if (source === 'keyboard' && Shortcut.isPrintable(keyCode)) {
							const parse = parseFactory(cell.column.type, cell.column.editor);
							const value = Shortcut.stringify(keyCode);
							const typedValue = parse(value);
							if (typedValue !== null) {
								this.value = typedValue;
							}
						}

						this.mode(this.editor.td, 'edit');
						return true;
					}

					return false;
				}
			}),
			commit: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('commit'),
				canExecute: cell => {
					cell = cell || this.editor.td;
					const canEdit = cell
						&& Td.equals(cell, this.editor.td)
						&& cell.column.canEdit
						&& (cell.column.category === 'control' || model.edit().mode === 'cell')
						&& model.edit().status === 'edit';
					if (canEdit) {
						const context = this.contextFactory(cell, this.value, this.label, this.tag);
						const key = context.column.key;
						const validator = createValidator(model.validation().rules, key);
						return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value }) !== false;
					}
					return false;
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;
						this.requestClose = null;

						this.mode(cell, 'view');
						table.view.focus();

						return true;
					}

					return false;
				}
			}),
			push: new Command({
				priority: 1,
				source: 'edit.cell.view',
				canExecute: cell => {
					cell = cell || this.editor.td;
					const canEdit = cell && cell.column.canEdit;
					if (canEdit) {
						const context = this.contextFactory(cell, this.value, this.label, this.tag);
						const key = context.column.key;
						const validator = createValidator(model.validation().rules, key);
						return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value }) !== false;
					}

					return false;
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'batch commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;
						this.requestClose = null;

						return true;
					}

					return false;
				}
			}),
			cancel: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('cancel'),
				canExecute: cell => {
					cell = cell || this.editor.td;
					return cell
						&& cell.column.canEdit
						&& (cell.column.category === 'control' || model.edit().mode === 'cell')
						&& model.edit().status === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell && model.edit().cancel.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.reset();
						this.editor = CellEditor.empty;
						this.requestClose = null;

						this.mode(cell, 'view');
						table.view.focus();

						return true;
					}

					return false;
				}
			}),
			reset: new Command({
				priority: 1,
				source: 'edit.cell.view',
				canExecute: cell => {
					cell = cell || this.editor.td;
					return cell
						&& cell.column.canEdit
						&& (cell.column.category === 'control' || model.edit().mode === 'cell')
						&& model.edit().status === 'edit'
						&& model.edit().reset.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell && model.edit().reset.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.reset();
						return true;
					}

					return false;
				}
			}),
			exit: new Command({
				priority: 1,
				source: 'edit.cell.view',
				execute: (cell, e) => {
					Log.info('cell.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell) {
						if (this.commit.canExecute(cell, e)) {
							const originValue = cell.value;
							const editValue = this.value;
							if (originValue !== editValue) {
								this.commit.execute(cell, e);
								return true;
							}
						}

						if (this.cancel.canExecute(cell, e)) {
							this.cancel.execute(cell, e);
							return true;
						}
					}

					return false;
				}
			}),
			clear: new Command({
				priority: 1,
				source: 'edit.cell.view',
				canExecute: cell => {
					cell = cell || this.editor.td;
					return cell
						&& cell.column.canEdit
						&& (cell.column.category === 'control' || model.edit().mode === 'cell')
						&& model.edit().status === 'edit'
						&& model.edit().clear.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'clear');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.td;
					if (cell && model.edit().clear.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.clear();
						return true;
					}

					return false;
				}
			}),
		};

		return new Map(
			Object.entries(commands)
		);
	}

	contextFactory(cell, newValue, newLabel, tag) {
		const { column, row, columnIndex, rowIndex, value: oldValue, label: oldLabel } = cell;
		return {
			column,
			row,
			columnIndex,
			rowIndex,
			oldValue,
			newValue,
			oldLabel,
			newLabel,
			unit: 'cell',
			tag,
			getValueFactory,
			getLabelFactory
		};
	}

	get fetch() {
		return this.editor.fetch;
	}

	get value() {
		return this.editor.value;
	}

	set value(value) {
		this.editor.value = value;
	}

	get label() {
		return this.editor.label;
	}

	set label(label) {
		this.editor.label = label;
	}

	get row() {
		return this.cell.row;
	}

	get column() {
		return this.cell.column;
	}

	get cell() {
		return this.editor.td;
	}

	get options() {
		return this.column.options;
	}

	canEdit(cell) {
		const { model } = this.plugin;

		if (cell) {
			return cell.column.canEdit && model.edit().mode === 'cell';
		}

		return false;
	}

	shortcutFactory(type) {
		const { model } = this.plugin;
		const { edit } = model;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			const { td } = this.editor;
			if (td) {
				const type = td.column && td.column.editor ? td.column.editor : td.column.type;
				if (shortcuts && shortcuts.hasOwnProperty(type)) {
					return shortcuts[type];
				}
			}

			return shortcuts['$default'];
		};
	}
}

class RowEditorCore {
	constructor() {
		this.editors = [];
	}

	commit() {
	}

	reset() {
	}
}


class TdView {
	constructor(row, column) {
		this.row = row;
		this.column = column;
	}

	get value() {
		return getValue$1(this.row, this.column);
	}

	set value(value) {
		return setValue(this.row, this.column, value);
	}

	get label() {
		return getLabel(this.row, this.column);
	}

	set label(value) {
		return setLabel(this.row, this.column, value);
	}
}

const empty = new RowEditorCore();
class RowEditor extends RowEditorCore {
	constructor(row, columns) {
		super();

		this.value = cloneDeep(row);
		this.row = row;

		this.editors =
			columns
				.filter(column => column.canEdit)
				.map(column => new CellEditor(new TdView(this.value, column)));
	}

	commit() {
		this.editors.forEach(editor => editor.commit());
		Object.assign(this.row, this.value);
	}

	reset() {
		this.editors.forEach(editor => editor.reset());
		this.value = cloneDeep(this.row);
	}

	static get empty() {
		return empty;
	}
}

function selectRow(state) {
	const { cell } = state;
	if (cell) {
		return cell.row;
	}

	return null;
}

function selectColumn(state) {
	const { cell } = state;
	if (cell) {
		return cell.column;
	}

	return null;
}

function selectColumnIndex(state) {
	const { cell } = state;
	if (cell) {
		return cell.columnIndex;
	}

	return -1;
}

function selectRowIndex(state) {
	const { cell } = state;
	if (cell) {
		return cell.rowIndex;
	}

	return -1;
}

class EditRowLet {
	constructor(plugin, shortcut) {
		this.plugin = plugin;
		this.editor = RowEditor.empty;

		const commands = this.getCommands();
		shortcut.register(commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
	}

	getCommands() {
		const { model } = this.plugin;
		const commands = {
			enter: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('enter'),
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('row.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					const columns = this.model.columnList().line;

					this.editor = new RowEditor(row, columns);
					model.edit({ status: 'edit' }, { source: 'edit.row.view' });
				}
			}),
			commit: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('commit'),
				// TODO: add validation support
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().commit.canExecute(this.contextFactory(row));
				},
				execute: (cell, e) => {
					Log.info('row.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.commit();
					this.editor = RowEditor.empty;
					model.edit({ status: 'view' }, { source: 'edit.row.view' });
				}
			}),
			cancel: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('cancel'),
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.reset();
					this.editor = RowEditor.empty;
					model.edit({ status: 'view' }, { source: 'edit.row.view' });
				}
			}),
			reset: new Command({
				source: 'edit.row.view',
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().reset.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('row.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					if (row && model.edit().reset.execute(this.contextFactory(row)) !== false) {
						this.editor.reset();
						return false;
					}
				}
			})
		};
		return new Map(
			Object.entries(commands)
		);
	}

	contextFactory(row) {
		return {
			row: row,
			unit: 'row'
		};
	}

	shortcutFactory(type) {
		const { model } = this.plugin;
		const { edit } = model;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			return (shortcuts && shortcuts['row']) || shortcuts['$default'];
		};
	}
}

class EditLet {
	constructor(plugin, shortcut) {
		this.cell = new EditCellLet(plugin, shortcut);
		this.row = new EditRowLet(plugin, shortcut);
	}
}

class EditService {
	constructor(plugin) {
		this.plugin = plugin;
	}

	startBatch(startCell) {
		const { model } = this.plugin;

		const editStatus = model.edit().status;
		const selectionMode = model.selection().mode;

		model.selection({ mode: 'range' });
		model.edit({ status: 'startBatch' });

		return () => {
			model.edit({ status: editStatus });
			this.doBatch(startCell);
			model.selection({ mode: selectionMode });
		}
	}

	doBatch(startCell) {
		const { table, model } = this.plugin;

		const { rows } = model.scene();
		const { columns } = model.view();
		const { items } = model.selection();

		const shortcut = { register: () => ({}), keyCode: () => '' };
		const editView = new EditCellLet(this.plugin, shortcut);

		const startTd = table.body.cell(startCell.rowIndex, startCell.columnIndex).model();
		const { value, label } = startTd;

		const startColumnType = startTd.column.type;
		for (let i = 0, length = items.length; i < length; i++) {
			const { row, column } = items[i];
			const rowIndex = rows.indexOf(row);
			const columnIndex = columns.indexOf(column);

			const td = table.body.cell(rowIndex, columnIndex).model();
			const type = td.column.type;
			if (startColumnType === type) {
				const editor = new CellEditor(td);
				editor.label = label;
				editor.value = value;

				editView.editor = editor;
				if (editView.push.canExecute()) {
					editView.push.execute();
				}
			}
		}
	}
}

class EditState {
	constructor() {
		this.resource = new Resource();

		this.mode = null; // cell | row
		this.status = 'view'; // view | edit | startBatch | endBatch
		this.method = null; // batch

		this.enter = new Command({ source: 'edit.model' });
		this.commit = new Command({ source: 'edit.model' });
		this.cancel = new Command({ source: 'edit.model' });
		this.reset = new Command({ source: 'edit.model' });
		this.clear = new Command({ source: 'edit.model' });

		this.cancelShortcuts = {
			'$default': 'escape'
		};

		this.enterShortcuts = {
			'$default': '*',
			'row': 'F2|Enter',
			'form': 'F2|Enter'
		};

		this.commitShortcuts = {
			'$default': 'tab|shift+tab|enter|ctrl+s',
			'reference': 'ctrl+s',
			'row': 'ctrl+s',
			'form': 'ctrl+s',
			'bool': 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown',
			'text-area': 'ctrl+s|ctrl+enter'
		};
	}
}

class EventListener {
	constructor(element, manager) {
		this.element = element;
		this.manager = manager;
		this.handlers = {};
	}

	on(name, f, settings = false) {
		const manager = this.manager;
		const handler = manager.bind(f);
		const handlerSet = this.handlers[name] || (this.handlers[name] = []);
		handlerSet.push(handler);

		this.element.addEventListener(name, handler, settings);
		return () => {
			this.element.removeEventListener(name, handler);
			const index = handlerSet.indexOf(handler);
			if (index >= 0) {
				handlerSet.splice(index, 1);
			}
		};
	}

	off() {
		const handlers = this.handlers;
		const element = this.element;
		for (let key of Object.keys(handlers)) {
			for (let handler of Array.from(handlers[key])) {
				element.removeEventListener(key, handler);
			}
		}
	}
}

class EventManager {
	constructor(context, apply = f => f()) {
		this.context = context;
		this.apply = apply;
	}

	bind(f) {
		const handler = f.bind(this.context);
		const apply = this.apply;
		return (...args) => apply(() => handler(...args));
	}
}

const DELIMITER = ',';

function escape$1(value) {
	let result = '' + value;
	result = result.replace(/"/g, '""');
	result = /[\n",]/.test(result) ? `"${result}"` : result;
	return result;
}

class CsvExport {
	write(rows, columns) {
		const result = [];
		const values = [];
		let head = [];
		for (let column of columns) {
			if (column.category === 'data') {
				values.push(getValueFactory(column));
				head.push(escape$1(column.title));
			}
		}
		result.push(head.join(DELIMITER));

		for (let row of rows) {
			const line = [];
			for (let getValue of values) {
				line.push(escape$1(getValue(row)));
			}
			result.push(line.join(DELIMITER));
		}

		return result.join('\n');
	}
}

function graphFlatView(graph, separator = ', ') {
	const result = {};

	for (let [prop, value] of Object.entries(graph)) {
		if (isArray(value)) {
			const items = [];
			for (let item of value) {
				items.push(item);
			}
			result[prop] = items.join(separator);
		} else if (isObject(value)) {
			const flatObject = graphFlatView(value, separator);
			for (let [flatProp, flatValue] of Object.entries(flatObject)) {
				result[prop + '.' + flatProp] = flatValue;
			}
		} else {
			result[prop] = value;
		}
	}
	return result;
}

class ExportState {
	constructor() {
		this.resource = new Resource();
	}
}

class JsonExport {
	write(rows, columns) {
		const result = [];

		for (let row of rows) {
			const flatRow = graphFlatView(row);
			const obj = {};
			for (let column of columns) {
				obj[column.title] = flatRow[column.key];
			}
			result.push(obj);
		}

		return JSON.stringify(result, '', 2);
	}
}

const begin = '<?xml version="1.0" encoding="UTF-8"?><root>';

function escape(value) {
	let result = '' + value;
	const characters = [/</g, />/g, /&/g, /'/g, /"/g, /\s\s+/g, /\n/g];
	const replacements = ['&lt;', '&gt;', '&amp;', '&apos;', '&quot;', ' ', '&#xA;'];
	for (let i = 0; i < characters.length; i++) {
		result = result.replace(characters[i], replacements[i]);
	}
	return result;
}

function objToXml(obj) {
	let result = '';

	for (let [prop, value] of Object.entries(obj)) {
		if (obj.hasOwnProperty(prop)) {
			if (isObject(value) && !isArray(value) && !isString(value)) {
				result += `<${prop}>${objToXml(value)}</${prop}>`;
			} else if (isArray(value)) {
				for (let item of value) {
					if (isString(item)) {
						result += `<${prop}>${escape(item)}</${prop}>`;
					} else {
						result += `<${prop}>${objToXml(item)}</${prop}>`;
					}
				}
			} else if (isString(value)) {
				result += `<${prop}>${escape(value)}</${prop}>`;
			}
		}
	}
	return result;
}

class XmlExport {
	write(rows) {
		const result = [begin];
		for (let row of rows) {
			result.push(objToXml({ row }));
		}
		result.push('</root>');
		return result.join('');
	}
}

// export function getType(type) {
// 	return {}.toString.call(type).slice('[object]'.length, -1); // returns type of built-in objects
// }

function castFactory(r) {
	const rt = getType(r);
	const asString = '' + r;
	const asNumber = +r;
	const asBool = !!r;
	const asDate = new Date(r);

	return l => {
		const lt = getType(l);
		if (rt === lt) {
			return r;
		}

		switch (lt) {
			case 'Number':
				return asNumber;
			case 'String':
				return asString;
			case 'Date':
				return asDate;
			case 'Boolean':
				return asBool;
			default:
				throw GridError(
					'cast.factory',
					`Unsupported format ${lt}`
				);
		}
	};
}

function buildExpression(filterBy, op = 'and') {
	const result = [];
	for (let [key, filter] of Object.entries(filterBy)) {
		if (key === '$expression') {
			result.push(filter);
			continue;
		}

		if (filter.expression) {
			result.push(filter.expression);
		}

		const expressions = [];
		if (filter.items && filter.items.length) {
			expressions.push(toInExpression(key, filter.items));
		}

		if (filter.blanks) {
			expressions.push(toIsEmptyExpression(key));
		}

		if (expressions.length) {
			if (expressions.length === 1) {
				result.push(expressions[0]);
			}
			else {
				result.push(compile(expressions, 'or'));
			}
		}
	}

	return compile(result, op);
}

function toIsEmptyExpression(key) {
	return {
		kind: 'group',
		op: 'and',
		left: {
			kind: 'condition',
			left: key,
			op: 'isEmpty',
			right: null
		},
		right: null
	};
}

function toInExpression(key, items) {
	return {
		kind: 'group',
		op: 'and',
		left: {
			kind: 'condition',
			left: key,
			op: 'in',
			right: Array.from(items)

		},
		right: null
	};
}

function compile(expressions, op) {
	const root = {
		kind: 'group',
		op,
		left: null,
		right: null
	};

	let current = root;

	expressions.forEach(expr => {
		if (!current.left) {
			current.left = expr;
		}
		else {
			const next = {
				kind: 'group',
				op,
				left: expr,
				right: null
			};

			current.right = next;
			current = next;
		}
	});


	return root.left ? root : null;
}

class Visitor {
	constructor() {
	}

	visit(item, depth = 0) {
		switch (item.kind) {
			case 'group':
				return this.visitGroup(item, depth + 1);
			case 'condition':
				return this.visitCondition(item, depth);
			case 'function':
				return this.visitFunction(item, depth);
			default:
				throw GridError(
					'expression.visitor',
					`Invalid kind ${item.kind}`
				);
		}
	}

	visitGroup(group, depth) {
		if (group.right) {
			this.visit(group.left, depth);
			this.visit(group.right, depth);
		}

		return this.visit(group.left, depth);
	}

	visitCondition(condition, depth) {
		switch (condition.op) {
			case 'isNotNull':
			case 'isNull':
			case 'isNotEmpty':
			case 'isEmpty':
			case 'isNumeric':
			case 'isNotNumeric':
				return this.visitUnary(condition, depth);
			case 'equals':
			case 'notEquals':
			case 'greaterThanOrEquals':
			case 'greaterThan':
			case 'lessThanOrEquals':
			case 'lessThan':
			case 'like':
			case 'notLike':
			case 'startsWith':
			case 'endsWith':
			case 'match':
				return this.visitBinary(condition, depth);
			case 'between':
				return this.visitBetween(condition, depth);
			case 'in':
				return this.visitIn(condition, depth);
			default:
				throw new GridError(
					'expression.visitor',
					`Invalid operation ${condition.op}`
				);
		}
	}

	visitUnary(condition) {
		this.visitLeft(condition.left);
	}

	visitBinary(condition/*, depth*/) {
		this.visitLeft(condition.left);
		this.visitRight(condition.right);
	}

	visitLeft(left) {
		if (left.kind) {
			switch (left.kind) {
				case 'function':
					this.visitArguments(left.arguments);
			}
		}
	}

	visitBetween(/*condition, depth*/) {
	}

	visitIn(/*condition, depth*/) {
	}

	visitFunction(/*fn*/) {
	}

	visitArguments(args) {
		return args.map(arg => {
			switch (arg.kind) {
				case 'condition':
				case 'group':
					this.visit(arg);
			}
		});
	}
}

function stringify$1(value, type, isValid) {
    if (!isValid) {
        return '<span class="q-grid-markup-condition-value-invalid"></span>';
    }

    switch (type) {
        case 'text':
            return stringifyText(value);
        case 'number':
            return stringifyNumber(value);
        case 'date':
            return stringifyDate(value);
        default:
            return '' + value;
    }
}

function stringifyText(value) {
    return `<span class="q-grid-markup-condition-quote">'</span>
                <span class="q-grid-markup-condition-value q-grid-markup-condition-value-text">${value}</span>
            <span class="q-grid-markup-condition-quote">'</span>`;
}

function stringifyDate(value) {
    const date = new Date(value);
    if (date !== 'Invalid Date' && !isNaN(date)) {
        return `<span class="q-grid-markup-condition-quote">'</span>
                    <span class="q-grid-markup-condition-value q-grid-markup-condition-value-date">${value}</span>
                <span class="q-grid-markup-condition-quote">'</span>`;
    }

    return `<span class="q-grid-markup-condition-quote">'</span>
                <span class="q-grid-markup-condition-value q-grid-markup-condition-value-date q-grid-markup-condition-error">${value}</span>
            <span class="q-grid-markup-condition-quote">'</span>`;
}

function stringifyNumber(value) {
    const number = Number.parseFloat(value);
    if (!isNaN(number) && isFinite(number)) {
        return `<span class="q-grid-markup-condition-value q-grid-markup-condition-number">${value}</span>`;
    }

    return `<span class="q-grid-markup-condition-value q-grid-markup-condition-number q-grid-markup-condition-error">${value}</span>`;
}

class MarkupVisitor extends Visitor {
    constructor(label, type, isValid) {
        super();

        this.label = label;
        this.type = type;
        this.isValid = isValid;
    }

    visitGroup(group, depth) {
        if (group.right) {
            const l = this.visit(group.left, depth);
            const r = this.visit(group.right, depth);

            const expr = `<div class="q-grid-markup-node-left">${l}</div><span class="q-grid-markup-group-op">${group.op}</span><div class="q-grid-markup-node-right">${r}</div>`;
            return `<div class="q-grid-markup-node">${(depth > 1 ? `<span class="q-grid-markup-group-open">(</span>${expr}<span class="q-grid-markup-group-close">)</span>` : expr)}</div>`;
        }

        return `<div class="q-grid-markup-node">${this.visit(group.left, depth)}<div class="q-grid-markup-node">`;
    }

    visitUnary(condition) {
        switch (condition.op) {
            case 'isNotNull':
                return `<span class="q-grid-markup-condition-left">${this.label(condition.left)}</span><span class="q-grid-markup-condition-right q-grid-markup-condition-unary">is not empty</span>`;
            case 'isNull':
                return `<span class="q-grid-markup-condition-left">${this.label(condition.left)}</span><span class="q-grid-markup-condition-right q-grid-markup-condition-unary">is empty</span>`;
            default:
                throw new GridError('markup.visitor', `Invalid operation ${condition.op}`)
        }
    }

    visitBinary(condition) {
        let op;

        switch (condition.op) {
            case 'equals':
                op = '=';
                break;
            case 'notEquals':
                op = '&lt;&gt;';
                break;
            case 'greaterThanOrEquals':
                op = '&gt;=';
                break;
            case 'greaterThan':
                op = '&gt;';
                break;
            case 'lessThanOrEquals':
                op = '&lt;=';
                break;
            case 'lessThan':
                op = '&lt;';
                break;
            case 'like':
                op = 'like';
                break
            case 'notLike':
                op = 'not like';
                break;
            case 'startsWith':
                op = 'starts with';
                break;
            case 'endsWith':
                op = 'ends with';
                break;
            default:
                throw new GridError('markup.visitor', `Invalid operation ${condition.op}`);
        }

        const isValid = this.isValid(condition.left, condition.right);
        return `<span class="q-grid-markup-condition-left">${this.label(condition.left)}</span>
                <span class="q-grid-markup-condition-op">${op}</span>
                <span class="q-grid-markup-condition-right">${stringify$1(condition.right, this.type(condition.left), isValid)}</span>`;
    }

    visitBetween(condition) {
        const isValid = this.isValid(condition.left, condition.right);
        return `<span class="q-grid-markup-condition-left">${this.label(condition.left)}</span>
                <span class="q-grid-markup-condition-op">between</span>
                <span class="q-grid-markup-condition-right">${stringify$1(condition.right[0], this.type(condition.left), isValid)}</span>
                <span class="q-grid-markup-condition-op">and</span>
                <span class="q-grid-markup-condition-right">${stringify$1(condition.right[1], this.type(condition.left), isValid)}</span>`;
    }

    visitIn(condition) {
        const isValid = this.isValid(condition.left, condition.right);
        return `<span class="q-grid-markup-condition-left">${this.label(condition.left)}</span>
                <span class="q-grid-markup-condition-op">in</span>
                <span class="q-grid-markup-condition-open">(</span>
                <span class="q-grid-markup-condition-right">${condition.right.map(item => stringify$1(item, this.type(condition.left), isValid)).join(', ')}</span>
                <span class="q-grid-markup-condition-close">)</span>`;
    }
}

class PredicateVisitor extends Visitor {
	constructor(valueFactory, assertFactory, getType) {
		super();

		this.valueFactory = valueFactory;
		this.assertFactory = assertFactory;
		this.getType = getType;
	}

	visitGroup(group) {
		if (group.right) {
			const lp = this.visit(group.left);
			const rp = this.visit(group.right);

			switch (group.op) {
				case 'and':
					return value => {
						return lp(value) && rp(value);
					};
				case 'or':
					return value => {
						return lp(value) || rp(value);
					};

				default:
					throw GridError(
						'predicate.visitor',
						`Invalid operation ${group.op}`
					);
			}
		}

		return this.visit(group.left);
	}

	visitCondition(condition) {
		const r = condition.right;
		const name = condition.left;
		const getValue = this.valueFactory(name);
		const assert = this.assertFactory(name);
		const map = new Set();

		const rt = this.getType(name, isArray(r) ? r[0] : r);
		let parse = compareParseFactory(rt);

		if (isArray(r)) {
			if (r.length) {
				r.forEach(x => map.add('' + x));
			} else {
				parse = identity;
			}
		}

		const { equals, isNull, lessThan } = assert;

		const lessThanOrEquals = (x, y) => {
			return equals(x, y) || lessThan(x, y);
		};

		const greaterThan = (x, y) => {
			return !equals(x, y) && !lessThan(x, y)
		};

		const greaterThanOrEquals = (x, y) => {
			return equals(x, y) || !lessThan(x, y);
		};

		let predicate;
		switch (condition.op) {
			case 'isNotNull':
			case 'isNotEmpty':
				predicate = actual => !isNull(actual);
				break;
			case 'isNull':
			case 'isEmpty':
				predicate = actual => isNull(actual);
				break;
			case 'equals': {
				const etalon = parse(r);
				predicate = actual => equals(parse(actual), etalon);
				break;
			}
			case 'notEquals': {
				const etalon = parse(r);
				predicate = actual => !equals(parse(actual), etalon);
				break;
			}
			case 'greaterThanOrEquals': {
				const etalon = parse(r);
				predicate = actual => greaterThanOrEquals(parse(actual), etalon);
				break;
			}
			case 'greaterThan': {
				const etalon = parse(r);
				predicate = actual => greaterThan(parse(actual), etalon);
				break;
			}
			case 'lessThanOrEquals': {
				const etalon = parse(r);
				predicate = actual => lessThanOrEquals(parse(actual), etalon);
				break;
			}
			case 'lessThan': {
				const etalon = parse(r);
				predicate = actual => lessThan(parse(actual), etalon);
				break;
			}
			case 'between': {
				const [start, end] = r;
				const noStart = isUndefined(start);
				const noEnd = isUndefined(end);
				if (noStart && noEnd) {
					predicate = yes;
					break;
				}

				if (noEnd) {
					const etalon = parse(start);
					predicate = actual => greaterThanOrEquals(parse(actual), etalon);
					break
				}

				if (noStart) {
					const etalon = parse(end);
					predicate = actual => lessThanOrEquals(parse(actual), etalon);
					break
				}

				const etalonStart = parse(start);
				const etalonEnd = parse(end);
				predicate = actual => {
					const actualValue = parse(actual);
					return greaterThanOrEquals(actualValue, etalonStart)
						&& lessThanOrEquals(actualValue, etalonEnd);
				};

				break;
			}
			case 'in': {
				predicate = (actual) => {
					if (isArray(actual)) {
						for (const value of map) {
							if (actual.some((item) => '' + item === value)) {
								return true;
							}
						}
						return false;
					}

					const v = !actual && actual !== 0 ? 'null' : '' + actual;
					return map.has(v);
				};
				break;
			}
			case 'like': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && ('' + actual).toLowerCase().includes(etalon);
				break;
			}
			case 'notLike': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && !('' + actual).toLowerCase().includes(etalon);
				break;
			}
			case 'startsWith': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && (('' + actual).toLowerCase().indexOf(etalon) === 0);
				break;
			}
			case 'endsWith': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => {
					const substr = ('' + actual).slice(-etalon.length).toLowerCase();
					return etalon === substr;
				};
				break;
			}
			default:
				throw new GridError(
					'predicate.visitor',
					`Invalid operation ${condition.op}`
				);
		}

		return row => {
			const actual = getValue(row);
			return predicate(actual);
		};
	}
}

class FetchState {
	constructor() {
		this.skip = 0;
	}
}

class FilterLet {
	constructor(plugin) {
		const { model } = plugin;

		this.plugin = plugin;

		this.column = new Command({
			source: 'filter.view',
			execute: (column, search) => {
				const { key } = column;

				let { by, operatorFactory } = model.filter();
				by = clone(by);

				const filter = by[key] || (by[key] = {});
				if (!isUndefined(search) && search !== null && search !== '') {
					const opList = operatorFactory(column);
					const op = filter.expression ? filter.expression.op : opList[0];
					switch (op) {
						case 'contains': {
							filter.items = [search];
							break;
						}
						case 'between': {
							filter.expression = {
								kind: 'condition',
								left: key,
								op,
								right: [null, search]
							};
							break;
						}
						default: {
							filter.expression = {
								kind: 'condition',
								left: key,
								op,
								right: search
							};
							break;
						}
					}
				}
				else {
					delete by[key];
				}

				model.filter({ by }, { source: 'filter.view' });
			}
		});
	}

	has(column) {
		const { model } = this.plugin;
		const { by } = model.filter();
		return by.hasOwnProperty(column.key);
	}

	value(column) {
		const { model } = this.plugin;
		const { key } = column;
		const { by } = model.filter();
		if (by[key]) {
			const { expression, items } = by[key];
			return expression
				? isArray(expression.right)
					? expression.right[expression.right.length - 1]
					: expression.right
				: items && items.length
					? items[0]
					: null;
		}

		return null;
	}
}

function match(context) {
	const { model } = context;

	const expression = buildExpression(model.filter().by);
	if (expression !== null) {
		const { labelFactory } = context;
		const { assertFactory } = model.filter();

		const columnMap = mapColumns(model.columnList().line);

		const valueColumnFactory = (key) => {
			const column = columnMap[key];
			if (column.type === 'array') {
				return (row) => getValue$1(row, column);
			} else {
				return labelFactory(columnMap[key]);
			}
		};

		const assertColumnFactory = key => assertFactory(columnMap[key]);
		const getType = key => {
			const column = columnMap[key];
			return (column && column.type) || 'text';
		};

		const visitor =
			new PredicateVisitor(
				valueColumnFactory,
				assertColumnFactory,
				getType
			);

		return visitor.visit(expression);
	}

	return yes;
}

class FilterState {
	constructor() {
		this.resource = new Resource();

		this.by = {};
		this.match = match;
		this.custom = yes;
		this.fetch = noop;
		this.unit = 'default';	// default|row

		this.assertFactory = () => ({
			equals: (x, y) => x === y,
			lessThan: (x, y) => x < y,
			isNull: x => x === '' || x === null || x === undefined
		});

		this.operatorFactory = (column) => {
			switch (column.type) {
				case 'text':
				case 'url':
				case 'email':
				case 'file': {
					return [
						'contains',
						'like',
						'notLike',
						'startsWith',
						'endsWith',
						'isEmpty',
						'isNotEmpty',
					];
				}
				case 'date':
				case 'datetime': {
					return [
						'between',
						'contains',
						'lessThan',
						'lessThanOrEquals',
						'greaterThan',
						'greaterThanOrEquals',
						'isEmpty',
						'isNotEmpty',
					];
				}
				case 'id':
				case 'currency':
				case 'number': {
					return [
						'between',
						'contains',
						'like',
						'lessThan',
						'lessThanOrEquals',
						'greaterThan',
						'greaterThanOrEquals',
						'isEmpty',
						'isNotEmpty',
					];
				}
				default: {
					return ['contains'];
				}
			}
		};
	}
}

function takeOnce() {
    return source =>
        new Operator(subscriber =>
            source.subscribe({
                next: x => {
                    subscriber.next(x);
                    subscriber.complete();
                }
            })
        );
}

function filter$1(test) {
    return source =>
        new Operator(subscriber =>
            source.subscribe({
                next: x => {
                    if (test(x)) {
                        subscriber.next(x);
                    }
                }
            })
        );
}

class FocusService {
    constructor(model) {
        this.model = model;
    }

    activate(rowIndex, columnIndex) {
        const { focus, scene, sceneChanged } = this.model;

        if (isUndefined(rowIndex)) {
            rowIndex = focus().rowIndex;
        }

        if (rowIndex < 0) {
            rowIndex = 0;
        }

        if (isUndefined(columnIndex)) {
            columnIndex = focus().columnIndex;
        }

        if (columnIndex < 0) {
            columnIndex = scene().column.line.findIndex(c => c.model.canFocus);
        }

        if (scene().status === 'stop') {
            this.focus(rowIndex, columnIndex);
        } else {
            sceneChanged.on((e, off) => {
                if (e.hasChanges('status')) {
                    if (e.state.status === 'stop') {
                        off();

                        this.focus(rowIndex, columnIndex);
                    }
                }
            });
        }
    }

    focus(rowIndex, columnIndex) {
        const { pagination, focus } = this.model;
        const { count, current, size } = pagination();

        const last = this.getPage(count);
        const target = Math.max(0, Math.min(this.getPage(rowIndex), last));

        if (current !== target) {
            pagination({
                current: target
            }, {
                source: 'focus.service'
            });

            this.activate(rowIndex, columnIndex);
            return;
        }

        rowIndex = rowIndex - size * current;

        focus({
            isActive: true,
            rowIndex,
            columnIndex
        }, {
            source: 'focus.service'
        });
    }

    getPage(index) {
        const { model } = this;
        const { size } = model.pagination();

        return Math.max(0, Math.floor(index / size));
    }
}

class FocusAfterRenderService {
    constructor(plugin) {
        const { table, model, observe } = plugin;

        observe(model.sceneChanged)
            .pipe(
                filter$1(e => e.hasChanges('status') && e.state.status === 'stop'),
                takeOnce()
            )
            .subscribe(e => {
                table.view.focus();
            });
    }
}

class FocusState {
	constructor() {
		this.isActive = false;

		this.rowIndex = -1;
		this.columnIndex = -1;
	}
}

class FootLet {
	constructor(plugin) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.valueFactory = getValueFactory;
		this.rows = [];

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidate();
				}
			});
	}

	invalidate() {
		Log.info('view.foot', 'invalidate');

		this.rows = new Array(this.count);
	}

	columns(row, pin) {
		const { model } = this.plugin;
		return model.scene().column.area[pin] || [];
	}

	get count() {
		const { model } = this.plugin;
		const { columns } = model.view();
		const resourceCount = model.foot().resource.count;

		for (let i = 0, length = columns.length; i < length; i++) {
			if (columns[i].aggregation) {
				return Math.max(resourceCount, 1);
			}
		}

		return resourceCount;
	}

	value(column) {
		if (column.aggregation) {
			const aggregation = column.aggregation;
			const aggregationOptions = column.aggregationOptions;

			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new GridError(
					'foot',
					`Aggregation ${aggregation} is not registered`);
			}

			const { model } = this.plugin;
			const { rows } = model.data();
			
			const getValue = this.valueFactory(column);
			return Aggregation[aggregation](rows, getValue, aggregationOptions);
		}

		return null;
	}
}

class EnumerableResource extends Resource {
	constructor(data = {}, scope = {}, count = 0) {
		super(data, scope);

		this.count = count;
	}
}

class FootState {
	constructor() {
		this.resource = new EnumerableResource();
		this.cache = new Cache();
	}
}

class GridHost {
	constructor(host, plugin) {
		const { model, disposable, observe } = plugin;
		const { grid } = model;

		this.plugin = plugin;

		if (grid().status === 'bound') {
			throw new GridError('grid.host', `Model is already used by grid "${grid().id}"`);
		}

		if (!host.id) {
			host.id = model.grid().id;
		}

		grid({ status: 'bound' }, { source: 'grid.host' });

		this.invalidateVisibility();
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidateVisibility();
				}
			});

		disposable.add(() => model.grid({ status: 'unbound' }, { source: 'grid.host' }));
	}

	keyUp(e) {
		const { model } = this.plugin;
		const { codes } = model.keyboard();
		const code = Keyboard.translate(e.keyCode);
		const index = codes.indexOf(code);
		if (index >= 0) {
			const newCodes = Array.from(codes);
			newCodes.splice(index, 1);
			model.keyboard({
				code,
				codes: newCodes,
				status: 'up'
			}, {
				source: 'key.up'
			});
		}

		model.keyboard({
			code: null,
			status: 'release'
		}, {
			source: 'key.up'
		});
	}

	keyDown(e, source = 'grid') {
		const { model } = this.plugin;
		const { shortcut } = model.action();

		const code = Keyboard.translate(e.keyCode);
		const result = shortcut.keyDown(e, source);
		if (result.length > 0) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			if (e.target.tagName === 'TBODY') {
				const { prevent } = model.navigation();
				if (prevent.has(code)) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		}

		model.keyboard({
			code,
			codes: uniq(model.keyboard().codes.concat(code)),
			status: 'down'
		}, {
			source: 'key.down'
		});

		return result;
	}

	invalidateVisibility() {
		const { model } = this.plugin;
		const { left, right } = model.scene().column.area;
		const { pinTop, pinBottom } = model.row();

		const { pin: oldPin } = model.visibility();
		const newPin = {
			left: left.length > 0,
			right: right.length > 0,
			top: pinTop.length > 0,
			bottom: pinBottom.length > 0
		};

		if (!same(oldPin, newPin)) {
			model.visibility({
				pin: newPin
			}, {
				source: 'grid.host'
			});
		}
	}

	invalidateActive() {
		const { model, table, service } = this.plugin;
		if (table.view.isFocused()) {
			const needFocusCell =
				!model.mouse().target
				&& (model.focus().rowIndex < 0 || model.focus().columnIndex < 0);
			if (needFocusCell) {
				service.focus(
					model.pagination().size * model.pagination().current
				);
			} else {
				model.focus({
					isActive: true
				}, {
					source: 'grid.host'
				});
			}
		}
		else {
			model.focus({ isActive: false }, { source: 'grid.host' });
		}
	}
}

class Middleware {
	constructor(pipes) {
		this.pipes = pipes;
	}

	run(context, memo = []) {
		const tasks = this.pipes
			.map(pipe => memo =>
				new Promise((resolve, reject) =>
					pipe(memo, context, resolve, reject)));

		return start(tasks, memo);
	}
}

function start(tasks, memo) {
	tasks = Array.from(tasks);
	return new Promise((resolve, reject) => {
		invoke(memo);

		function invoke(memo) {
			if (tasks.length) {
				const task = tasks.shift();
				const promise = task(memo);
				promise
					.then(invoke)
					.catch(ex => {
						reject(ex);
						throw ex;
					});
			}
			else {
				resolve(memo);
			}
		}
	});
}

function buildFromModel(model) {
	return function run(source, changes, pipe) {
		const middleware = new Middleware(pipe);
		const context = {
			model,
			source,
			changes,
			getValueFactory,
			getLabelFactory
		};

		const { rows } = model.data();
		return middleware.run(context, rows);
	};
}

function guid() {
	function p8(s) {
		const p = (Math.random().toString(16) + '000000000').substr(2, 8);
		return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
	}

	return p8() + p8(true) + p8(true) + p8();
}

class Scheduler {
	constructor() {
		this.tasks = [];
	}

	next() {
		this.tasks.shift();
		const task = this.tasks[0];
		if (task) {
			task();
			return true;
		}

		return false;
	}

	add(task) {
		this.tasks.push(task);
		if (this.tasks.length === 1) {
			task();
		}

		return this.tasks.length;
	}
}

function buildSettings(...args) {
	if (args.length) {
		if (isString(args[0])) {
			return {
				source: args[0],
				changes: args[1] || {},
				pipe: args[2],
				why: 'refresh'
			};
		}

		return Object.assign({
			source: 'invalidate',
			changes: {},
			pipe: null,
			why: 'refresh'
		}, args[0])
	}

	return {
		source: 'invalidate',
		changes: {},
		pipe: null,
		why: 'refresh'
	};
}

class GridService {
	constructor(model) {
		this.model = model;
		this.scheduler = new Scheduler();
	}

	invalidate(...args /*source = 'invalidate', changes = {}, pipe = null*/) {
		const { source, changes, pipe, why } = buildSettings(...args);
		const { scheduler, model } = this;
		const { scene } = model;

		const runPipe = buildFromModel(model);
		const cancelBusy = why === 'refresh' ? this.busy() : noop;

		const nextTask = () => {
			cancelBusy();

			if (!scheduler.next()) {
				scene({ status: 'pull' }, {
					source,
					behavior: 'core'
				});
			}
		};

		const defer = new Defer();
		const task = () => {
			Log.info('grid', `start task ${source}`);
			scene({ status: 'start' }, {
				source,
				behavior: 'core'
			});

			model.head().cache.clear();
			model.body().cache.clear();
			model.foot().cache.clear();

			return Fastdom.invoke(() => runPipe(source, changes, pipe || model.data().pipe))
				.then(() => {
					Log.info('grid', `finish task ${source}`);

					nextTask();
					defer.resolve();
				})
				.catch(ex => {
					Log.error('grid', ex);

					nextTask();
					defer.reject();
				});
		};

		Log.info('grid', `add task ${source}`);
		scheduler.add(task);

		return defer.promise;
	}

	busy() {
		const id = guid();
		const { progress } = this.model;
		const queue = progress().queue.concat([id]);
		progress({ queue });

		return () => {
			const queue = Array.from(progress().queue);
			const index = queue.indexOf(id);
			if (index >= 0) {
				queue.splice(index, 1);
				progress({ queue });
			}
		};
	}

	focus(rowIndex, columnIndex) {
		const focus = new FocusService(this.model);
		focus.activate(rowIndex, columnIndex);
	}
}

class GridState {
	constructor() {
		this.id = `${GRID_PREFIX}-${guid()}`;
		this.status = 'unbound'; //unbound | bound
		this.caption = '';
		this.interactionMode = 'full' | 'readonly' | 'detached';

		// @deprecated
		this.title = '';
	}
}

function rowspanGetNode(node, column) {
	if (node.source === column.by) {
		return node;
	}
	if (node.children.length) {
		return node.children[0];
	}
	return node;
}

function flatVisible(node, column) {
	return column.type !== 'group' || node.source === column.by;
}

function rowspanIsVisible(node, column, parent) {
	if (node.source === column.by) {
		return !parent || parent.state.expand;
	}

	if (node.children.length) {
		return rowspanIsVisible(node.children[0], column, node);
	}

	return false;
}

class GroupLet {
	constructor(plugin, shortcut) {
		const { model, observeReply, disposable, service } = plugin;

		this.plugin = plugin;
		this.valueFactory = getValueFactory;

		const toggleStatus = new Command({
			source: 'group.view',
			execute: args => {
				let row = selectRow(model.navigation());
				let column = selectColumn(model.navigation());

				if (args) {
					row = args[0] || row;
					column = args[1] || column;
				}

				const node = this.getNode(row, column);
				const { toggle } = model.group();
				if (toggle.execute(node) !== false) {
					node.state.expand = !node.state.expand;
					service.invalidate({
						source: 'group.view',
						pipe: PipeUnit.group,
						why: PipeUnit.group.why
					});
				}
			},
			canExecute: args => {
				let row = selectRow(model.navigation());
				let column = selectColumn(model.navigation());

				if (args) {
					row = args[0] || row;
					column = args[1] || column;
				}

				const node = this.getNode(row, column);
				const { toggle } = model.group();
				return node && node.type === 'group' && toggle.canExecute(node);
			},
			shortcut: model.group().shortcut.toggle
		});

		let shouldExpand = true;

		const toggleAllStatus = new Command({
			source: 'group.view',
			execute: () => {
				if (model.group().toggleAll.execute() !== false) {
					const { nodes } = model.view();
					const { toggle } = model.group();

					preOrderDFS(nodes, node => {
						if (toggleStatus.canExecute([node])) {
							if (toggle.execute(node) !== false) {
								node.state.expand = shouldExpand;
							}
						}
					});

					shouldExpand = !shouldExpand;
					service.invalidate({
						source: 'group.view',
						pipe: PipeUnit.group,
						why: PipeUnit.group.why
					});
				}
			},
			canExecute: () => model.group().toggleAll.canExecute()
		});

		this.toggleStatus = toggleStatus;
		this.toggleAllStatus = toggleAllStatus;

		shortcut.register([toggleStatus, toggleAllStatus]);

		const createColumn = columnFactory(model);
		this.reference = {
			group: createColumn('group')
		};

		this.getNode = identity;
		this.isVisible = yes;

		observeReply(model.groupChanged)
			.subscribe(e => {
				if (e.hasChanges('mode')) {
					switch (e.state.mode) {
						case 'rowspan': {
							this.getNode = rowspanGetNode;
							this.isVisible = rowspanIsVisible;
							break;
						}
						case 'flat':
							this.getNode = identity;
							this.isVisible = flatVisible;
							break;
						default: {
							this.getNode = identity;
							this.isVisible = yes;
							break;
						}
					}
				}
			});

		let canExecuteCheckSub;
		const unsubscribeCanExecuteCheck = () => {
			if (canExecuteCheckSub) {
				canExecuteCheckSub.unsubscribe();
				canExecuteCheckSub = null;
			}
		};

		disposable.add(
			unsubscribeCanExecuteCheck
		);

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('toggle')) {
					const { toggle } = e.state;
					unsubscribeCanExecuteCheck();
					canExecuteCheckSub = toggle.canExecuteCheck
						.subscribe(() => {
							this.toggleStatus.canExecuteCheck.next();
						});
				}
			});
	}

	count(node, column) {
		node = this.getNode(node, column);
		return node.children.length || node.rows.length;
	}

	status(node, column) {
		node = this.getNode(node, column);
		return node.state.expand ? 'expand' : 'collapse';
	}

	offset(node, column) {
		const { model } = this.plugin;

		node = this.getNode(node, column);
		const { mode } = model.group();
		switch (mode) {
			case 'nest':
			case 'subhead': {
				return column ? column.offset * node.level : 0;
			}
			default: {
				return 0;
			}
		}
	}

	value(node, column) {
		node = this.getNode(node, column);
		if (column) {
			const getLabel = getLabelFactory(column);
			return getLabel(node);
		}
		return null;
	}
}

class GroupState {
	constructor() {
		this.resource = new Resource();

		this.mode = 'nest'; // nest | flat | subhead | rowspan
		this.summary = null; // null | leaf
		this.by = [];

		this.toggle = new Command({ source: 'group.state' });
		this.toggleAll = new Command({ source: 'group.state' });

		this.flattenFactory = flattenFactory;

		this.shortcut = {
			toggle: 'space|enter'
		};
	}
}

class PathService {
	constructor(bag) {
		this.bag = bag;
	}

	cell(path) {
		for (let node of path) {
			if (node.nodeName === 'TD' || node.nodeName === 'TH') {
				const model = this.bag.findModel(node);
				if (!model) {
					break;
				}

				return model;
			}
		}

		return null;
	}

	row(path) {
		for (let node of path) {
			if (node.nodeName === 'TR') {
				const model = this.bag.findModel(node);
				if (!model) {
					break;
				}

				return model;
			}
		}

		return null;
	}
}

function css(element, property, value) {
	const normalizedProperty = normalize(property);
	if (isUndefined(value)) {
		return element.style[normalizedProperty];
	} else {
		element.style[normalizedProperty] = value;
		return normalizedProperty;
	}
}

function normalize(property) {
	return property.replace(/-([a-z])/g, upperFirst);
}

function upperFirst(match, letter) {
	return letter.toUpperCase();
}

function parents(element) {
	const path = [];
	while (element) {
		path.unshift(element);
		element = element.parentNode;
	}

	return path;
}

function eventPath(event) {
	const path = (event.composedPath && event.composedPath()) || event.path;
	const target = event.target;

	if (path) {
		// Safari doesn't include Window, but it should.
		return (path.indexOf(window) < 0) ? path.concat(window) : path;
	}

	if (target === window) {
		return [window];
	}

	return [target].concat(parents(target), window);
}

function elementFromPoint(x, y) {
	return document.elementFromPoint(x, y);
}

class HeadHost {
	constructor(plugin) {
		const { model, table, observeReply } = plugin;

		this.plugin = plugin;
		this.column = null;

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if(e.state.isActive) {
						this.column = null;
					}
				}
			});
	}

	mouseMove(e) {
		const { table } = this.plugin;

		const pathFinder = new PathService(table.box.bag.head);
		const cell = pathFinder.cell(eventPath(e));
		if (cell) {
			this.highlight(cell.column);
		}
	}

	mouseLeave() {
		this.highlight(null);
	}

	highlight(column) {
		const { view } = this.plugin;

		const { highlight } = view;
		if (!highlight.column.canExecute(column)) {
			return;
		}

		if (this.column !== column) {
			if (this.column) {
				highlight.column.execute(this.column, false);
			}

			if (column) {
				highlight.column.execute(column, true);
			}

			this.column = column;
		}
	}
}

class HeadLet {
	constructor(plugin, tagName) {
		const { model, table, observeReply } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;
		this.rows = [];

		const pathFinder = new PathService(table.box.bag.head);

		this.drop = new Command({
			source: 'head.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const cell = pathFinder.cell(eventPath(e));
				return cell && cell.column.canMove;
			},
			execute: e => {
				const sourceKey = e.dragData;
				switch (e.action) {
					case 'over': {
						const th = pathFinder.cell(eventPath(e));
						if (!e.inAreaX(th.element)) {
							return;
						}

						const targetKey = th.column.key;
						if (sourceKey !== targetKey) {
							const { columnList } = model;

							const tree = calk(columnList().index);
							const oldPos = findNode(tree, node => node.key.model.key === sourceKey);
							const newPos = findNode(tree, node => node.key.model.key === targetKey);
              
							if (oldPos && newPos && newPos.path.indexOf(oldPos.node) < 0) {
								const queue = oldPos.path.reverse();
								const hostIndex = queue.findIndex(node => node.children.length > 1);
								if (hostIndex >= 0) {
									const host = queue[hostIndex];
									const target = queue[hostIndex - 1] || oldPos.node;
									const index = host.children.indexOf(target);

									host.children.splice(index, 1);
									newPos.parent.children.splice(newPos.index, 0, target);

									target.level = newPos.parent.level + 1;
                  
									preOrderDFS(
										target.children,
										(node, root, parent) => {
											node.level = (root || parent).level + 1;
										},
										target
									);

									columnList({ index: tree }, { source: 'head.view' });
								}
							}
						}
						break;
					}
					case 'end':
					case 'drop': {
						const { index } = model.columnList();
						const oldPos = findNode(index, node => node.key.model.key === sourceKey);
						if (oldPos) {
							for (let leaf of findLeaves(oldPos.node)) {
								const oldColumn = table.body.column(leaf.key.columnIndex);
								oldColumn.removeClass(`${GRID_PREFIX}-drag`);
							}
						}
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'head.view',
			canExecute: e => {
				const sourceKey = e.data;
				const { index } = model.columnList();
				const pos = findNode(index, node => node.key.model.key === sourceKey);
				return pos && pos.node.key.model.canMove;
			},
			execute: e => {
				const sourceKey = e.data;
				const { index } = model.columnList();
				const pos = findNode(index, node => node.key.model.key === sourceKey);
				if (pos) {
					for (let leaf of findLeaves(pos.node)) {
						const column = table.body.column(leaf.key.columnIndex);
						column.addClass(`${GRID_PREFIX}-drag`);
						return () => table.head.cell;
					}
				}
			},
		});

		this.resize = new Command({
			source: 'head.view',
			canExecute: e => {
				const key = e.data;
				const map = table.data.columnMap();
				return map.hasOwnProperty(key) && map[key].canResize !== false;
			}
		});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const line = flattenColumns(e.state.columns);
					model.columnList({ line }, { source: 'head.view' });
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					this.invalidate();
				}
			});

		observeReply(model.filterChanged)
			.subscribe(e => {
				if (e.hasChanges('unit')) {
					this.invalidate();
				}
			});
	}

	columns(row, pin) {
		return row.filter(c => c.model.pin === pin);
	}

	invalidate() {
		Log.info('view.head', 'invalidate');

		const { model, table } = this.plugin;
		this.rows = Array.from(model.scene().column.rows);

		if (this.rows.length > 1) {
			table.view.addClass(`${GRID_PREFIX}-head-span`);
		} else {
			table.view.removeClass(`${GRID_PREFIX}-head-span`);
		}

		if (model.filter().unit === 'row') {
			const filterRow = table.data.columns().map(c => new FilterRowColumn(c));
			this.rows.push(filterRow);
		}
	}
}

class HeadState {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}

function hashColumnKeyFactory(model) {
  const { columnKey } = model.selection();
  if (columnKey === identity) {
    return column => column.key;
  }

  // TODO: investigate if is it necessary to use JSON.stringify here
  return identity;
}

function hashRowKeyFactory(model) {
  const { rowKey } = model.selection();
  if (rowKey === identity) {
    const columns = model.columnList().line;
    const index = columns.findIndex(column => column.type === 'id');
    if (index >= 0) {
      const idColumn = columns[index];
      const getId = getValueFactory(idColumn);
      return getId;
    }

    const { rows } = model.data();
    return row => rows.indexOf(row);
  }

  // TODO: investigate if is it necessary to use JSON.stringify here
  return identity;
}

function hashKeyFactory(model) {
  const selectionState = model.selection();
  switch (selectionState.unit) {
    case 'row':
      return hashRowKeyFactory(model);
    case 'column':
      return hashColumnKeyFactory(model);
    case 'cell': {
      const hashColumnKey = hashColumnKeyFactory(model);
      const hashRowKey = hashRowKeyFactory(model);
      return key => `${hashColumnKey(key.column)}[${hashRowKey(key.row)}]`;
    }
    case 'mix': {
      const hashColumnKey = hashColumnKeyFactory(model);
      const hashRowKey = hashRowKeyFactory(model);
      return (key, entry) => {
        if (!entry.unit) {
          return key;
        }

        switch (entry.unit) {
          case 'column':
            return hashColumnKey(key);
          case 'row':
            return hashRowKey(key);
          case 'cell':
            return `${hashColumnKey(key.column)}[${hashRowKey(key.row)}]`;
          default:
            throw new GridError('selection.service', `Invalid unit ${entry.unit}`);
        }
      };
    }
    default:
      throw new GridError('selection.service', `Invalid unit ${selectionState.unit}`);
  }
}

function cellMatchFactory() {
  return (x, y) => x.column === y.column && x.row === y.row;
}

function keySelector(unit, rowKey, columnKey) {
  switch (unit) {
    case 'row':
      return rowKey;
    case 'column':
      return columnKey;
    case 'cell':
      return entry => {
        if (entry.row && entry.column) {
          return {
            row: rowKey(entry.row),
            column: columnKey(entry.column)
          };
        }

        return entry;
      };
    default:
      throw new GridError('selection.state', `Invalid unit ${unit}`);
  }
}

function lookupColumnFactory(model, selectKey) {
  const columns = model.columnList().line;
  return items => {
    const result = [];
    
    columns.forEach(column => {
      const columnKey = selectKey(column);
      const found = items.indexOf(columnKey) >= 0;
      if (found) {
        result.push(column);
      }
    });

    return result;
  };
}

function lookupRowFactory(model, selectKey) {
  const { rows } = model.data();
  return items => {
    const result = [];
    
    rows.forEach(row => {
      const rowKey = selectKey(row);
      const found = items.indexOf(rowKey) >= 0;
      if (found) {
        result.push(row);
      }
    });

    return result;
  };
}

function lookupCellFactory(model, selectKey) {
  const { rows } = model.data();
  const columns = model.columnList().line;
  const match = cellMatchFactory();
  
  return items => {
    const result = [];

    columns.forEach(column => {
      rows.forEach(row => {
        const cell = {
          column: column,
          row: row
        };

        const index = items.findIndex(item => match(item, selectKey(cell)));
        if (index >= 0) {
          result.push(cell);
        }
      });
    });

    return result;
  };
}

class SelectionService {
  constructor(model) {
    this.model = model;
  }

  lookup(items, unit) {
    let entries = [];
    if (items.length === 0) {
      return entries;
    }

    const { model } = this;
    if (isUndefined(unit)) {
      unit = model.selection().unit;
    }

    switch (unit) {
      case 'column': {
        const selectKey = this.keyFactory('column');
        const lookup = lookupColumnFactory(model, selectKey);
        entries = lookup(items);
        break;
      }
      case 'row': {
        const selectKey = this.keyFactory('row');
        const lookup = lookupRowFactory(model, selectKey);
        entries = lookup(items);
        break;
      }
      case 'cell': {
        const selectKey = this.keyFactory('cell');
        const lookup = lookupCellFactory(model, selectKey);
        entries = lookup(items);
        break;
      }
      case 'mix': {
        const rowKeys = items.filter(key => key.unit === 'row').map(key => key.item);
        const columnKeys = items.filter(key => key.unit === 'column').map(key => key.item);
        const cellKeys = items.filter(key => key.unit === 'cell').map(key => key.item);

        entries.push(...this.lookup(rowKeys, 'row').map(entry => ({ item: entry, unit: 'row' })));
        entries.push(...this.lookup(columnKeys, 'column').map(entry => ({ item: entry, unit: 'column' })));
        entries.push(...this.lookup(cellKeys, 'cell').map(entry => ({ item: entry, unit: 'cell' })));
        break;
      }
      default:
        throw new GridError('selection.state', `Invalid unit ${unit}`);
    }

    return entries;
  }

  map(entries) {
    const selectionState = this.model.selection();
    const selectKey = this.keyFactory();
    switch (selectionState.unit) {
      case 'column':
      case 'row':
      case 'cell':
        return entries.map(selectKey);
      case 'mix':
        return entries.map(entry => ({
          unit: entry.unit,
          item: selectKey(entry)
        }));
      default:
        throw new GridError('selection.state', `Invalid unit ${selectionState.unit}`);
    }
  }

  keyFactory(selectionUnit) {
    const { rowKey, columnKey, unit } = this.model.selection();

    selectionUnit = selectionUnit || unit;
    switch (selectionUnit) {
      case 'column':
      case 'row':
      case 'cell':
        return keySelector(selectionUnit, rowKey, columnKey);
      case 'mix': {
        const selectCellKey = keySelector('cell', rowKey, columnKey);
        const selectRowKey = keySelector('row', rowKey, columnKey);
        const selectColumnKey = keySelector('column', rowKey, columnKey);

        return entry => {
          if (!entry.unit) {
            return identity;
          }

          switch (entry.unit) {
            case 'column':
              return selectColumnKey(entry.item);
            case 'row':
              return selectRowKey(entry.item);
            case 'cell':
              return selectCellKey(entry.item);
            default:
              throw new GridError('selection.service', `Invalid unit ${entry.unit}`);
          }
        };
      }
      default:
        throw new GridError('selection.service', `Invalid unit ${selectionUnit}`);
    }
  }

  hashFactory() {
    const selectKey = this.keyFactory();
    const selectHash = hashKeyFactory(this.model);
    return entry => {
      const key = selectKey(entry);
      const hashKey = selectHash(key, entry);
      return hashKey;
    };
  }
}

class HighlightLet {
	constructor(plugin) {
		const { model, table, observeReply, observe } = plugin;
		this.plugin = plugin;

		this.cellSelector = new CellSelector(model, table);
		this.selectionService = new SelectionService(model);

		let sortBlurs = [];
		let columnHoverBlurs = [];
		let rowHoverBlurs = [];
		let selectionBlurs = [];
		let cellHoverBlurs = [];

		this.column = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (column, state) => {
				const columns = Array.from(model.highlight().columns);
				const index = columns.indexOf(column.key);
				let hasChanges = false;
				if (state) {
					if (index < 0) {
						columns.push(column.key);
						hasChanges = true;
					}
				}
				else {
					if (index >= 0) {
						columns.splice(index, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({ columns }, {
						source: 'highlight.view',
					});
				}
			}
		});

		this.row = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (row, state) => {
				const rows = Array.from(model.highlight().rows);
				const index = rows.indexOf(row);
				let hasChanges = false;
				if (state) {
					if (index < 0) {
						rows.push(row);
						hasChanges = true;
					}
				}
				else {
					if (index >= 0) {
						rows.splice(index, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({ rows }, {
						source: 'highlight.view'
					});
				}
			}
		});

		this.cell = new Command({
			source: 'highlight.view',
			canExecute: () => !this.isRendering,
			execute: (newCell, state) => {
				let { cell } = model.highlight();
				let hasChanges = true;
				if (newCell === cell) {
					hasChanges = false;
				}
				else if (newCell && cell) {
					hasChanges =
						newCell.rowIndex !== cell.rowIndex
						|| newCell.columnIndex !== cell.columnIndex;
				}

				if (hasChanges) {
					model.highlight({ cell: newCell }, {
						source: 'highlight.view'
					});
				}
			}
		});

		this.clear = new Command({
			execute: () => {
				const { rows, cell } = model.highlight();

				rows.forEach(rowIndex => this.row.execute(rowIndex, false));

				if (cell) {
					this.cell.execute(null, false);
				}
			}
		});

		observeReply(model.selectionChanged)
			.subscribe(e => {
				if (e.hasChanges('items')) {
					selectionBlurs = this.invalidateSelection(selectionBlurs);
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					if (e.state.status === 'stop') {
						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
						sortBlurs = this.invalidateSortBy(sortBlurs);
						selectionBlurs = this.invalidateSelection(selectionBlurs);
					}
				}
			});

		observeReply(model.sortChanged)
			.subscribe(e => {
				if (!this.isRendering && e.hasChanges('by')) {
					sortBlurs = this.invalidateSortBy(sortBlurs);
				}
			});

		observeReply(model.highlightChanged)
			.subscribe(e => {
				if (!this.isRendering) {
					if (e.hasChanges('cell')) {
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
					}

					if (e.hasChanges('columns')) {
						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
					}

					if (e.hasChanges('rows')) {
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
					}
				}
			});

		observe(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if (e.state.isActive) {
						model.highlight({
							columns: [],
							rows: [],
							cell: null
						}, {
							source: 'highlight.view'
						});

						columnHoverBlurs = this.invalidateColumnHover(columnHoverBlurs);
						rowHoverBlurs = this.invalidateRowHover(rowHoverBlurs);
						cellHoverBlurs = this.invalidateCellHover(cellHoverBlurs);
					}
				}
			});
	}

	get isRendering() {
		const { model } = this.plugin;
		return model.scene().status !== 'stop' || model.drag().isActive;
	}

	invalidateColumnHover(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { columns } = model.highlight();

		return columns
			.map(columnKey => this.highlightColumn(columnKey, 'highlighted'));
	}

	invalidateRowHover(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { rows } = model.highlight();

		return rows
			.map(row => this.highlightRow(row, 'highlighted'));
	}

	invalidateCellHover(dispose) {
		dispose.forEach(f => f());

		const { model, table } = this.plugin;
		const { cell } = model.highlight();

		dispose = [];
		if (cell) {
			const { body } = table;
			const { rowIndex, columnIndex } = cell;
			dispose.push(this.highlightCell(body.cell(rowIndex, columnIndex), 'highlighted'));
		}

		return dispose;
	}

	invalidateSortBy(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const sortBy = model.sort().by;

		dispose = [];
		for (let entry of sortBy) {
			const key = getKey(entry);
			dispose.push(this.highlightColumn(key, 'sorted'));
		}

		return dispose;
	}

	invalidateSelection(dispose) {
		dispose.forEach(f => f());

		const { model } = this.plugin;
		const { items } = model.selection();

		const entries = this.selectionService.lookup(items);
		const cells = this.cellSelector.map(entries);

		return cells
			.map(cell => this.highlightCell(cell, 'selected'));
	}

	findColumnPosition(key) {
		const { model } = this.plugin;
		const { index } = model.columnList();

		const pos = findNode(index, node => node.key.model.key === key);
		if (pos) {
			return findLeaves(pos.node).map(leaf => leaf.key.columnIndex);
		}

		return [];
	}

	highlightColumn(key, cls) {
		const { table } = this.plugin;

		const position = this.findColumnPosition(key);
		if (!position.length) {
			return noop;
		}

		const { head, body, foot } = table;
		Fastdom.mutate(() => {
			const isLeaf = position.length === 1;
			for (let index of position) {
				if (isLeaf) {
					head.column(index).addClass(`${GRID_PREFIX}-${cls}`);
					head.column(index - 1).addClass(`${GRID_PREFIX}-${cls}-prev`);
					head.column(index + 1).addClass(`${GRID_PREFIX}-${cls}-next`);
				}

				const bodyColumn = body.column(index);
				const column = bodyColumn.model();
				if (column && column.canHighlight) {
					bodyColumn.addClass(`${GRID_PREFIX}-${cls}`);
					foot.column(index).addClass(`${GRID_PREFIX}-${cls}`);
				}
			}
		});

		return this.blurColumn(key, cls);
	}

	blurColumn(key, cls) {
		const { table } = this.plugin;

		const position = this.findColumnPosition(key);
		if (!position.length) {
			return noop;
		}

		const { head, body, foot } = table;
		return () => {
			Fastdom.mutate(() => {
				for (let index of position) {
					head.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
					head.column(index - 1).removeClass(`${GRID_PREFIX}-${cls}-prev`);
					head.column(index + 1).removeClass(`${GRID_PREFIX}-${cls}-next`);
					body.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
					foot.column(index).removeClass(`${GRID_PREFIX}-${cls}`);
				}
			});
		};
	}

	highlightRow(index, cls) {
		const { table } = this.plugin;

		if (index < 0) {
			return noop;
		}

		const { body } = table;
		Fastdom.mutate(() => body.row(index).addClass(`${GRID_PREFIX}-${cls}`));

		return this.blurRow(index, cls);
	}

	blurRow(index, cls) {
		const { table } = this.plugin;

		if (index < 0) {
			return noop;
		}

		const row = table.body.row(index);
		return () => Fastdom.mutate(() => row.removeClass(`${GRID_PREFIX}-${cls}`));
	}

	highlightCell(cell, cls) {
		Fastdom.mutate(() => {
			cell.addClass(`${GRID_PREFIX}-${cls}`);
		});

		return this.blurCell(cell, cls);
	}

	blurCell(cell, cls) {
		return () =>
			Fastdom.mutate(() => {
				cell.removeClass(`${GRID_PREFIX}-${cls}`);
			});
	}
}

class HighlightState {
	constructor() {
		this.columns = [];
		this.rows = [];
		this.cell = null;
	}
}

class CharReader {
	constructor(text) {
		this.text = text || '';
		this.peeks = [];
		this.position = 0;
		this.length = this.text.length;
	}

	static get eof() {
		return undefined;
	}

	read() {
		const peeks = this.peeks;
		if (peeks.length > 0) {
			return peeks.pop();
		}

		const nextPosition = this.position + 1;
		if (nextPosition < this.length) {
			const c = this.text[this.position];
			this.position = nextPosition;
			return c;
		}

		return CharReader.eof;
	}

	peek() {
		return this.peekCore(0);
	}

	peekPeek() {
		return this.peekCore(1);
	}

	peekCore(offset) {
		const peeks = this.peeks;
		if (offset < peeks.length) {
			return peeks[offset];
		}

		const length = this.length;
		for (let i = peeks.length; i <= offset; i++) {
			const nextPosition = this.position + 1;
			if (nextPosition >= length) {
				return CharReader.eof;
			}

			const c = this.text[this.position];
			this.position = nextPosition;
			peeks.push(c);
		}

		return peeks[offset];
	}

	seek(offset) {
		const peeks = this.peeks;
		const peekCount = peeks.length;
		peeks.splice(0, Math.Min(offset, peekCount));
		offset -= peekCount;
		while (--offset >= 0) {
			this.read();
		}

		return this.peek();
	}
}

class CsvImport {
	constructor(delimiter = ',') {
		this.delimiter = delimiter;
	}

	read(text) {
		const reader = new CharReader(text);
		const delimiter = this.delimiter;

		const result = [];
		let line = [];
		let term = '';
		const condition = true;
		do {
			const c = reader.peek();
			if (c === ' ') {
				reader.read();
				continue;
			}

			if (c === delimiter) {
				reader.read();

				line.push(term);
				term = '';
				continue;
			}

			if (c === '\n') {
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					term = '';
				}

				if (line.length > 0) {
					result.push(line);
					line = [];
				}

				continue;
			}

			if (c === '\r' && reader.peekPeek() === '\n') {
				reader.read();
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					term = '';
				}

				if (line.length > 0) {
					result.push(line);
					line = [];
				}

				continue;
			}

			if (c === CharReader.eof) {
				reader.read();

				if (line.length > 0 || term.length > 0) {
					line.push(term);
					result.push(line);
				}
				break;
			}

			if (c === '"') {
				term = this.readEscapedValue(reader, term);
			}
			else {
				term = this.readUnescapedValue(reader, term);
			}
		}
		while (condition);

		return result.map(this.lineToObj);
	}

	readEscapedValue(reader, term) {
		// Omit double quote
		let c = reader.read();
		while (c !== CharReader.eof) {
			c = reader.read();
			if (c === '"') {
				if (reader.peek() === '"') {
					term += reader.read();
					continue;
				}
				break;
			}
			term += c;
		}

		return term;
	}

	readUnescapedValue(reader, term) {
		const delimiter = this.delimiter;
		let c = reader.peek();
		while (c !== CharReader.eof) {
			if (c === delimiter || c === '\n' ||
				(c === '\r' && reader.peekPeek() === '\n'))
				break;

			term += reader.read();
			c = reader.peek();
		}

		return term;
	}

	lineToObj(line) {
		const result = {};
		for (let i = 0, length = line.length; i < length; i++) {
			result[i] = line[i];
		}
		return result;
	}
}

class ImportState {
	constructor() {
		this.resource = new Resource();
	}
}

class JsonImport {
	read(data) {
		const rows = JSON.parse(data);
		if (isArray(rows)) {
			return rows;
		}
		return [rows];
	}
}

const NODE_TYPE = {
	ELEMENT: 1,
	ATTRIBUTE: 2,
	TEXT: 3,
	DOCUMENT: 9
};

class XmlImport {
	read(text) {
		if (!text) {
			return [];
		}
		const parser = new DOMParser();
		const root = parser.parseFromString(text, 'text/xml').documentElement;
		const statistics = this.getStatistics(root);
		const graph = this.build(root, statistics, 'root');
		const key = Object.keys(graph)[0];
		const result = graph[key];
		if (isArray(result)) {
			return result;
		}

		return [result];
	}

	arrayFromChildren(node, statistics, path, tag) {
		const result = [];
		const children = Array.from(node.children).filter(child => child.nodeName === tag);
		for (let child of children) {
			result.push(this.buildNonArray(child, statistics, path));
		}

		return result;
	}

	build(node, statistics, path = 'root') {
		const st = statistics.get(path);
		if (st.isArray) {
			return this.arrayFromChildren(node.parentNode, statistics, path, node.nodeName);
		}

		return this.buildNonArray(node, statistics, path);
	}

	buildNonArray(node, statistics, path = 'root') {
		const st = statistics.get(path);
		if (st.isObject) {
			const result = {};
			const visited = new Set();
			for (let attr of Array.from(node.attributes)) {
				result[attr.name] = attr.value;
			}

			for (let child of Array.from(node.children)) {
				const childPath = this.getPath(path, child.nodeName);
				if (visited.has(childPath)) {
					continue;
				}

				visited.add(childPath);
				result[child.nodeName] = this.build(child, statistics, childPath);
			}

			return result;
		}

		if (st.isText) {
			return node.textContent;
		}

		return null;
	}

	info(node, lastInfo) {
		if (!lastInfo) {
			lastInfo = {
				isArray: false,
				isObject: false,
				isText: false
			};
		}

		return {
			isArray: lastInfo.isArray || Array.from(node.parentNode.children).filter(child => child.nodeName === node.nodeName).length > 1,
			isObject: lastInfo.isObject || node.children.length > 0 || node.attributes.length > 0,
			isText: lastInfo.isText || this.isTextContainer(node)
		};
	}

	getStatistics(node, path = 'root', statistics = new Map()) {
		statistics.set(path, this.info(node, statistics.get(path)));

		const children = Array.from(node.children);
		if (children.length > 0) {
			for (let child of children) {
				const childPath = this.getPath(path, child.nodeName);
				this.getStatistics(child, childPath, statistics);
			}
		}

		return statistics;
	}

	isTextContainer(node) {
		return node.nodeType === NODE_TYPE.ELEMENT && !node.children.length && node.childNodes.length;
	}

	getPath(...args) {
		return args.join('/');
	}
}

class Composite {
	static func(list, reduce = noop, memo = null) {
		return (...args) => {
			for (const f of list) {
				memo = reduce(memo, f(...args));
			}

			return memo;
		};
	}

	static command(list) {
		return new Command({
			source: 'composite',
			canExecute: (...args) => {
				return list.reduce((memo, cmd) => memo || cmd.canExecute(...args), false);
			},
			execute: (...args) => {
				return list
					.filter(cmd => cmd.canExecute(...args))
					.reduce((memo, cmd) => cmd.execute(...args) || memo, undefined);
			}
		});
	}

	static list(list) {
		return list.reduce((memo, xs) => memo.concat(xs), []);
	}

	static object(list, memo = {}) {
		return Object.assign(memo, ...list);
	}
}

function final() {
    let isLocked = false;
    return f => {
        if (isLocked) {
            return false;
        }

        isLocked = true;
        try {
            f();
            return true;
        } finally {
            isLocked = false;
        }
    };
}

class KeyboardState {
	constructor() {
		this.status = 'release';
		this.codes = [];
		this.code = null;
	}
}

class LayerState {
	constructor() {
		this.resource = new Resource();
	}
}

class LayoutLet {
	constructor(plugin) {
		const { model, observeReply, disposable } = plugin;
		const styleRow = this.styleRow.bind(this);

		this.plugin = plugin;

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					const { oldValue, newValue } = e.changes.cell;
					const oldColumn = oldValue ? oldValue.column : {};
					const newColumn = newValue ? newValue.column : {};

					if (oldColumn.key !== newColumn.key && (oldColumn.viewWidth || newColumn.viewWidth)) {
						Fastdom.measure(() => {
							const form = this.updateColumnForm();
							Fastdom.mutate(() => this.invalidateColumns(form));
						});
					}
				}
			});

		observeReply(model.layoutChanged)
			.subscribe(e => {
				if (e.tag.source === 'layout.let') {
					return;
				}

				if (e.hasChanges('columns')) {
					Fastdom.measure(() => {
						const form = this.updateColumnForm();
						Fastdom.mutate(() => this.invalidateColumns(form));
					});
				}
			});

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('canResize')) {
					const rows = Array.from(model.style().rows);
					if (e.state.canResize) {
						rows.push(styleRow);
					}
					else {
						const index = model.style.rows.indexOf(styleRow);
						rows.splice(index, 1);
					}
					model.style({ rows }, { source: 'layout.let' });
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					model.layout({
						columns: new Map()
					}, {
						source: 'layout.let',
						behavior: 'core'
					});
				}
			});

		observeReply(model.viewChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const columns = flattenColumns(e.state.columns);
					const hasNonDefaultWidth = x => x.width !== null || x.minWidth !== null || x.maxWidth !== null || x.widthMode === 'fit-head';
					if (columns.some(hasNonDefaultWidth)) {
						Fastdom.mutate(() => {
							const { columns } = model.layout();
							this.invalidateColumns(columns);
						});
					}
				}
			});

		disposable.add(() => {
			const sheet$1 = sheet(this.gridId, 'column-layout');
			sheet$1.remove();
		});
	}

	updateColumnForm() {
		const { model, table } = this.plugin;
		const { head } = table;
		const { cells } = head.context.bag;
		const layout = model.layout().columns;

		const form = new Map();
		for (let cell of cells) {
			const { column, rowIndex, columnIndex } = cell;
			if (!column.canResize) {
				continue;
			}

			const { key } = column;
			if (layout.has(key)) {
				const { width } = layout.get(key);
				form.set(key, { width });
			} else {
				const th = head.cell(rowIndex, columnIndex);
				const width = th.width();

				// It can be that clientWidth is zero on start, while css is not applied.
				if (width) {
					form.set(key, { width });
				}
			}
		}

		model.layout({ columns: form }, { source: 'layout.let', behavior: 'core' });

		const column = selectColumn(model.navigation());
		if (column && column.viewWidth) {
			const viewForm = new Map(form);
			const columnForm = form.get(column.key);
			viewForm.set(column.key, { width: columnForm ? Math.max(columnForm.width, column.viewWidth) : column.viewWidth });
			return viewForm;
		}

		return form;
	}

	invalidateColumns(form) {
		Log.info('layout', 'invalidate columns');

		const { table } = this.plugin;
		const columns = table.data.columns();
		const getWidth = widthFactory(table, form);

		const style = {};
		let { length } = columns;

		while (length--) {
			const column = columns[length];
			const width = getWidth(column.key);
			if (null !== width) {
				const key = escape$2(column.key);
				const size = width + 'px';
				const sizeStyle = {
					'width': size,
					'min-width': size,
					'max-width': size
				};

				style[`.q-grid-the-${key}`] = sizeStyle;
			}
		}

		const sheet$1 = sheet(this.gridId, 'column-layout');
		sheet$1.set(style);
	}

	styleRow(row, context) {
		const { model } = this.plugin;
		const { layout } = model;

		const form = layout().rows;
		const style = form.get(row);
		if (style) {
			const { minHeight } = model.row();
			if (minHeight > style.height){
				return;
			}

			context.class(`resized-${style.height}px`, { height: style.height + 'px' });
		}
	}

	get gridId() {
		return this.plugin.model.grid().id;
	}
}

class LayoutState {
	constructor() {
		this.columns = new Map();
		this.rows = new Map();
	}
}

class ModelBinder {
	constructor(host, plugin) {
		this.host = host;
		this.plugin = plugin;
	}

	canWrite(oldValue, newValue, key) {
		if (isUndefined(newValue)) {
			Log.warn('model.bind', `can't write undefined to the model[${key}]`);
			return false;
		}

		// As `Observable | async` returns null by default so we need to filter it out
		if (isArray(oldValue) && newValue === null) {
			Log.warn('model.bind', `the model[${key}] expects array, got ${newValue}`);
			return false;
		}

		return true;
	}

	bound(model, stateNames, run = true, track = true) {
		if (model) {
			const commits = [];
			for (let stateName of stateNames) {
				const state = model[stateName];
				const pack = this.packFactory(stateName);
				const write = this.writeFactory(stateName);

				if (run) {
					const oldState = state();
					const newState = pack(oldState);
					const changes = this.buildChanges(newState);
					write({ changes });
				}

				if (track) {
					this.disposable.add(
						model[stateName + 'Changed'].on(write)
					);
				}

				commits.push(() => {
					Log.info('model.bind', `to model "${stateName}"`);

					const oldState = state();
					const newState = pack(oldState);
					state(newState);
				});
			}

			return () => commits.forEach(commit => commit());
		}

		return noop;
	}

	writeFactory(name) {
		const host = this.host;
		return e => {
			const changes = Object.keys(e.changes);
			for (let diffKey of changes) {
				const hostKey = toCamelCase(name, diffKey);
				if (host.hasOwnProperty(hostKey)) {
					const diff = e.changes[diffKey];
					host[hostKey] = diff.newValue;
				}
			}
		};
	}

	packFactory(name) {
		return state => {
			const host = this.host;
			const newState = {};
			for (let stateKey of Object.keys(state)) {
				const hostKey = toCamelCase(name, stateKey);
				if (host.hasOwnProperty(hostKey)) {
					const oldValue = state[stateKey];
					const newValue = host[hostKey];
					if (this.canWrite(oldValue, newValue, stateKey)) {
						newState[stateKey] = newValue;
					}
				}
			}

			return newState;
		};
	}

	buildChanges(state) {
		return Object
			.keys(state)
			.reduce((memo, key) => {
				const value = state[key];
				memo[key] = {
					newValue: value,
					oldValue: value
				};
				return memo;
			}, {})
	}
}

class MouseState {
	constructor() {
		this.status = 'release';
		this.code = null;
		this.target = null;
		this.timestamp = new Date().getMilliseconds();
	}
}

class NavigationState {
	constructor() {
		this.cell = null;

		this.shortcut = {
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			next: 'tab',
			previous: 'shift+tab',
			home: 'home',
			end: 'end',
			pageUp: 'pageUp',
			pageDown: 'pageDown',
			upward: 'shift+pageUp',
			downward: 'shift+pageDown'
		};

		this.go = new Command({ source: 'navigation.model' });

		this.prevent = new Set([
			'space',
			'shift+space',
			'up',
			'down',
			'left',
			'right',
			'home',
			'end',
			'pageUp',
			'pageDown',
			'shift+pageDown',
			'shift+pageUp'
		]);
	}
}

class PaginationState {
	constructor() {
		this.resource = new Resource();

		this.current = 0;
		this.size = 50;
		this.sizeList = [5, 10, 20, 30, 40, 50];
		this.count = 0;
		this.mode = 'showPages'; 

		this.resetTriggers = {
			'filter': ['by'],
			'pivot': ['by'],
			'group': ['by']
		};

		this.shortcut = {
			prev: 'alt+pageup',
			next: 'alt+pagedown',
		};
	}
}

function replacer(key, value) {
	if (value instanceof Map) {
		return {
			type: 'map',
			value: Array.from(value.entries()),
		};
	}

	if (value instanceof Set) {
		return {
			type: 'set',
			value: Array.from(value.values()),
		};
	}

	return value;
}

function reviver(key, value) {
	if (typeof value === 'object' && value !== null) {
		if (value.type === 'map') {
			return new Map(value.value);
		}

		if (value.type === 'set') {
			return new Set(value.value);
		}
	}

	return value;
}

const serialize = value => JSON.stringify(value, replacer);
const deserialize = value => JSON.parse(value, reviver);

class PersistenceStorage {
	constructor(storage) {
		this.storage = storage;
	}

	getItem(key) {
		return new Promise(resolve => {
			const item = deserialize(this.storage.getItem(key));
			resolve(item);
		});
	}

	setItem(key, value) {
		return new Promise(resolve => {
			const item = this.storage.setItem(key, serialize(value));
			resolve(item);
		});
	}
}

class PersistenceState {
	constructor() {
		this.id = 'default';
		this.defaultGroup = 'My Presets';
		this.schedule = 'onDemand'; // onDemand | onStateChange

		this.load = new Command({ source: 'persistence.model' });
		this.remove = new Command({ source: 'persistence.model' });
		this.create = new Command({ source: 'persistence.model' });
		this.modify = new Command({ source: 'persistence.model' });
		this.setDefault = new Command({ source: 'persistence.model' });
		this.reset = new Command({ source: 'persistence.model' });

		this.storage = new PersistenceStorage(localStorage);
		this.settings = {
			group: ['by'],
			sort: ['by'],
			pivot: ['by'],
			filter: ['by'],
			queryBuilder: ['node'],
			pagination: ['current', 'size'],
			layout: ['columns']
		};
	}
}

class PipeState {
	constructor() {
		this.reduce = (units, model) => {
			const dataPipe = model.data().pipe;
			// Change one of default pipes to data pipes - cause default literaly means data
			// we can change only one because all other will be moved out during reduce
			const index = units.indexOf(PipeUnit.default);
			if (index >= 0) {
				units[index] = dataPipe;
			}

			units = uniq(units);
			const set = new Set(units);

			const schema = new Map([
				[PipeUnit.default, dataPipe],
				[PipeUnit.view, PipeUnit.default],
				[PipeUnit.column, PipeUnit.view]
			]);

			const shouldKeep = unit => {
				let next;
				while ((next = schema.get(unit))) {
					if (next === unit) {
						break;
					}

					if (set.has(next)) {
						return false;
					}

					unit = next;
				}

				return true;
			};

			return units.reduce((memo, unit) => {
				if (shouldKeep(unit)) {
					memo.push(unit);
				}

				return memo;
			}, []);
		};

		this.triggers = {
			'data': {
				'rows': PipeUnit.default,
				'columns': PipeUnit.column
			},
			'pagination': {
				'current': PipeUnit.default,
				'size': PipeUnit.default
			},
			'fetch': {
				'skip': PipeUnit.default
			},
			'sort': {
				'by': PipeUnit.default
			},
			'filter': {
				'by': PipeUnit.default,
				'match': PipeUnit.default,
				'custom': PipeUnit.default,
				'unit': PipeUnit.column,
			},
			'group': {
				'by': PipeUnit.default
			},
			'pivot': {
				'by': PipeUnit.default
			},
			'columnList': {
				'index': PipeUnit.columnIndex
			},
			'row': {
				'status': PipeUnit.rowDetails,
				'unit': PipeUnit.rowDetails,
				'canMove': PipeUnit.column,
				'canResize': PipeUnit.column
			},
			'rowList': {
				'index': PipeUnit.row
			},
			'animation': {
				'rows': PipeUnit.default
			}
		};

		this.effect = {};
	}
}

class PivotState {
	constructor() {
		this.resource = new Resource();
		this.by = [];
	}
}

class PluginState {
	constructor() {
		this.resource = new Resource();
		this.imports = {};
	}
}

class ProgressState {
	constructor() {
		this.resource = new Resource();
		this.isBusy = false;
		this.queue = [];
	}
}

function serializeGet(model) {
	const paginationState = model.pagination();
	const sortState = model.sort();
	const filterState = model.filter();

	return {
		order: sortState.by
			.map(item => {
				const field = Object.keys(item)[0];
				const order = item[field];
				return `${order === 'asc' ? '+' : '-'}${field}`;
			})
			.join(','),
		filter: Object
			.keys(filterState.by)
			.map(field => {
				const state = filterState.by[field];
				if(field === '$expression') {
					return `$expression=where:${state}`;
				}

				if (state.items) {
					return `${field}=in:${state.items.join(',')}`;
				}

				if (state.expression) {
					return `${field}=where:${state.expression}`;
				}

				return '';
			})
			.filter(part => !!part)
			.join(';'),
		skip: paginationState.current * paginationState.size,
		take: paginationState.size
	};
}

class RestState {
	constructor() {
		this.url = '';
		this.method = 'get';
		this.serialize = serializeGet;
	}
}

class RowListState {
	constructor() {
		this.index = new Map();
	}
}

class RowState {
	constructor() {
		this.resource = new Resource();

		this.mode = 'single'; // single | multiple | all
		this.unit = 'data'; // data | details
		this.height = element => element && element.offsetHeight || 64; // number | function(element, index)		
		this.status = new Map();
		this.shortcut = {
			toggle: 'space|enter'
		};
		this.canMove = false;
		this.canResize = false;
		this.minHeight = 0;
		this.pinTop = [];
		this.pinBottom = [];
		this.toggle = new Command();
	}
}

class SceneState {
	constructor() {
		this.status = 'idle'; // idle | start | pull | push | stop
		this.rows = [];
		this.column = {
			rows: [],
			line: [],
			area: {
				left: [],
				mid: [],
				right: []
			}
		};
	}
}

class ScrollState {
	constructor() {
		this.mode = 'default';

		this.top = 0;
		this.left = 0;		
		this.cursor = 0;

		this.map = {
			rowToView: identity,
			viewToRow: identity
		};

		this.resetTriggers = [
			'sort.view',
			'column.filter.view',
			'data.manipulation'
		];
	}
}

class SelectionState {
	constructor() {
		this.resource = new Resource();
		this.unit = 'cell'; //row|cell|column|mix
		this.mode = 'single'; //single|multiple|range|singleOnly
		this.items = [];
		this.area = 'body'; //body, custom
		this.toggle = new Command({ source: 'selection.model' });
		this.rowKey = identity;
		this.columnKey = identity;
		this.shortcut = {
			toggleRow: 'shift+space|space',
			togglePreviousRow: 'shift+up',
			toggleNextRow: 'shift+down',
			toggleColumn: 'ctrl+space',
			toggleNextColumn: 'shift+right',
			togglePreviousColumn: 'shift+left',
			selectAll: 'ctrl+a'
		};
	}
}

class SortState {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.mode = 'mixed';
		this.trigger = [];
	}
}

class StyleState {
	constructor() {
		this.row = noop;
		this.cell = noop;

		this.rows = [];
		this.cells = [];
		this.classList = [];

		this.invalidate = new Command({
			source: 'style.model',
			canExecute: context => context.model.edit().status === 'view'
		});
	}
}

class TemplateState {
	constructor() {
		this.resource = {};
	}
}

class ToolbarState {
	constructor() {
		this.resource = new Resource();
	}
}

class ValidationState {
	constructor() {
		this.resource = new Resource();
		this.rules = [];
	}
}

class ViewState {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.nodes = [];
		this.pivot = { head: new Node('$root', 0), rows: [] };
	}
}

class VisibilityState {
	constructor() {
		this.resource = new Resource();
		this.head = true;
		this.foot = true;
		this.body = true;
		this.toolbar = {
			top: true,
			bottom: true,
			right: false,
			left: false
		};

		this.pin = {
			left: false,
			right: false,
			top: false,
			bottom: false
		};

		this.plugin = {};
	}
}

class ModelBuilder {
    constructor() {
        this.state = {};

        this
            .register('action', ActionState)
            .register('animation', AnimationState)
            .register('body', BodyState)
            .register('clipboard', ClipboardState)
            .register('columnList', ColumnListState)
            .register('data', DataState)
            .register('drag', DragState)
            .register('edit', EditState)
            .register('export', ExportState)
            .register('fetch', FetchState)
            .register('filter', FilterState)
            .register('focus', FocusState)
            .register('foot', FootState)
            .register('grid', GridState)
            .register('group', GroupState)
            .register('head', HeadState)
            .register('highlight', HighlightState)
            .register('import', ImportState)
            .register('keyboard', KeyboardState)
            .register('layer', LayerState)
            .register('layout', LayoutState)
            .register('mouse', MouseState)
            .register('navigation', NavigationState)
            .register('pagination', PaginationState)
            .register('persistence', PersistenceState)
            .register('pipe', PipeState)
            .register('pivot', PivotState)
            .register('plugin', PluginState)
            .register('progress', ProgressState)
            .register('rest', RestState)
            .register('row', RowState)
            .register('rowList', RowListState)
            .register('scene', SceneState)
            .register('scroll', ScrollState)
            .register('selection', SelectionState)
            .register('sort', SortState)
            .register('style', StyleState)
            .register('template', TemplateState)
            .register('toolbar', ToolbarState)
            .register('validation', ValidationState)
            .register('view', ViewState)
            .register('visibility', VisibilityState);
    }

    register(key, ctor) {
        if (this.state.hasOwnProperty(key)) {
            throw new GridError(
                'model',
                `"${key}" is already registered`);
        }

        if (!isFunction(ctor)) {
            throw new GridError(
                `model.${key}`,
                `"${ctor}" is not a valid type, should be an constructor function`);
        }

        this.state[key] = ctor;
        return this;
    }

    build() {
        const { state } = this;
        const model = new Model();
        for (let name of Object.keys(state)) {
            const Type = state[name];
            model.inject(name, Type);
        }

        return model;
    }
}

const NO_BUTTON = 0;
const LEFT_BUTTON = 1;
const MIDDLE_BUTTON = 2;
const RIGHT_BUTTON = 3;

function checkButtonCode(event, code) {
    return getButtonCode(event) === code;
}

function getButtonCode(event) {
    return event.which;
}

function stringify(code) {
    switch (code) {
        case LEFT_BUTTON: return 'left';
        case RIGHT_BUTTON: return 'right';
        case MIDDLE_BUTTON: return 'middle';
        default: return null;
    }
}

class Navigation {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	position(y, direction) {
		const table = this.table;
		const body = table.body;
		const lastRow = this.lastRow;
		const lower = table.view.scrollHeight() - table.view.height();

		let index = 0;
		let offset = 0;

		// TODO: improve performance
		while (index <= lastRow && offset <= y) {
			offset += body.row(index).height();
			index++;
		}

		if (direction === 'down' && body.row(index)) {
			offset -= body.row(index).height();
			index--;
		}

		const row = Math.max(this.firstRow, Math.min(lastRow, index));
		offset = Math.min(offset, lower);
		return { row, offset };
	}

	goTo(rowIndex, columnIndex, source = 'navigation') {
		let cell = this.cell(rowIndex, columnIndex);
		if (!cell) {
			// TODO: make it better, right it just a huck for row-details,
			// need to support rowspan and colspan
			cell = this.cell(rowIndex, this.firstColumn);
		}

		this.model.navigation({
			cell
		}, {
			source
		});

		return true;
	}

	columns(rowIndex) {
		const columns = this.table.body.columns(rowIndex);
		const index = [];
		for (let i = 0, length = columns.length; i < length; i++) {
			const column = columns[i];
			if (column.model().canFocus) {
				index.push(column.index);
			}
		}
		return index;
	}

	get currentColumn() {
		const columns = this.columns(this.currentRow);
		const columnIndex = selectColumnIndex(this.model.navigation());
		const index = columns.indexOf(columnIndex);
		return columns.length ? columns[Math.max(index, 0)] : -1;
	}

	get nextColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.indexOf(this.currentColumn);
		return index >= 0 && index < columns.length - 1 ? columns[index + 1] : -1;
	}

	get prevColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.indexOf(this.currentColumn);
		return index > 0 && index < columns.length ? columns[index - 1] : -1;
	}

	get lastColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.length - 1;
		return index >= 0 ? columns[index] : -1;
	}

	get firstColumn() {
		const columns = this.columns(this.currentRow);
		return columns.length ? columns[0] : -1;
	}

	get currentRow() {
		const rowIndex = selectRowIndex(this.model.navigation());
		if (rowIndex < 0) {
			return this.model.scene().rows.length ? 0 : -1;
		}

		return rowIndex;
	}

	get nextRow() {
		const row = this.currentRow + 1;
		return row <= this.lastRow ? row : -1;
	}

	get prevRow() {
		const row = this.currentRow - 1;
		return row >= 0 ? row : -1;
	}

	get firstRow() {
		return Math.min(0, this.lastRow);
	}

	get lastRow() {
		return this.table.body.rowCount(this.currentColumn) - 1;
	}

	cell(rowIndex, columnIndex) {
		const cell = this.table.body.cell(rowIndex, columnIndex);
		const model = cell.model();
		if (model) {
			const { row, column } = model;
			return {
				rowIndex,
				columnIndex,
				row,
				column
			};
		}

		return null;
	}

	context(type, settings) {
		const model = this.model;
		const oldRow = this.currentRow;
		const oldColumn = this.currentColumn;
		const keyCode = model.action().shortcut.keyCode;

		return Object.assign({
			model,
			type,
			oldRow,
			oldColumn,
			keyCode
		}, settings);
	}

	get commands() {
		const { model, table } = this;
		const { edit } = model;
		const { shortcut, go } = model.navigation();

		const canNavigate = () => {
			if (edit().status === 'view') {
				return true;
			}

			const column = table.body.column(this.currentColumn).model();
			return column && (column.editorOptions.trigger === 'focus' || column.editorOptions.cruise === 'transparent');
		};

		const commands = {
			goDown: new Command({
				source: 'navigation',
				shortcut: shortcut.down,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('down', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.nextRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('down', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goUp: new Command({
				source: 'navigation',
				shortcut: shortcut.up,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('up', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.prevRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('up', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goRight: new Command({
				source: 'navigation',
				shortcut: shortcut.right,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.nextColumn;
						return newColumn >= 0 && go.canExecute(this.context('right', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.nextColumn;
					return go.execute(this.context('right', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goLeft: new Command({
				source: 'navigation',
				shortcut: shortcut.left,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.prevColumn;
						return newColumn >= 0 && go.canExecute(this.context('left', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.prevColumn;
					return go.execute(this.context('left', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goNext: new Command({
				source: 'navigation',
				shortcut: shortcut.next,
				canExecute: () => {
					const newRow = this.nextRow;
					const newColumn = this.nextColumn;
					const hasNextColumn = newColumn >= 0;
					const hasNextRow = newRow >= 0;
					return (hasNextColumn || hasNextRow) && go.canExecute(this.context('next', { newRow, newColumn }));
				},
				execute: () => {
					const nextColumn = this.nextColumn;
					const hasNextColumn = nextColumn >= 0;
					const newRow = hasNextColumn ? this.currentRow : this.nextRow;
					const newColumn = hasNextColumn ? nextColumn : this.firstColumn;

					return go.execute(this.context('next', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goPrevious: new Command({
				source: 'navigation',
				shortcut: shortcut.previous,
				canExecute: () => {
					const newColumn = this.prevColumn;
					const newRow = this.prevRow;
					const hasPrevColumn = newColumn >= 0;
					const hasPrevRow = newRow >= 0;
					return (hasPrevColumn || hasPrevRow) && go.canExecute(this.context('previous', { newRow, newColumn }));
				},
				execute: () => {
					const prevColumn = this.prevColumn;
					const hasPrevColumn = prevColumn >= 0;
					const newColumn = hasPrevColumn ? prevColumn : this.lastColumn;
					const newRow = hasPrevColumn ? this.currentRow : this.prevRow;
					return go.execute(this.context('previous', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			home: new Command({
				source: 'navigation',
				shortcut: shortcut.home,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.prevColumn;
						return newColumn >= 0 && go.canExecute(this.context('end', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.firstColumn;
					return go.execute(this.context('home', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			end: new Command({
				source: 'navigation',
				shortcut: shortcut.end,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.nextColumn;
						return newColumn >= 0 && go.canExecute(this.context('home', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.lastColumn;
					return go.execute(this.context('end', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			upward: new Command({
				source: 'navigation',
				shortcut: shortcut.upward,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('upward', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.firstRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('upward', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			downward: new Command({
				source: 'navigation',
				shortcut: shortcut.downward,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('downward', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.lastRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('downward', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			pageUp: new Command({
				source: 'navigation',
				shortcut: shortcut.pageUp,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('pageUp', { newRow }));
					}

					return false;
				},
				execute: () => {
					const view = table.view;
					const position = this.position(view.scrollTop() - view.height(), 'up');
					const newRow = position.row;
					const newColumn = this.currentColumn;
					if (go.execute(this.context('pageUp', { newRow, newColumn }))) {
						this.model.scroll({ top: position.offset }, { source: 'navigation' });
						return this.goTo(newRow, newColumn, 'navigation.scroll');
					}

					return false;
				}
			}),
			pageDown: new Command({
				source: 'navigation',
				shortcut: shortcut.pageDown,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('pageDown', { newRow }));
					}

					return false;
				},
				execute: () => {
					const view = table.view;
					const position = this.position(view.scrollTop() + view.height(), 'down');
					const newRow = position.row;
					const newColumn = this.currentColumn;
					if (go.execute(this.context('pageDown', { newRow, newColumn }))) {
						this.model.scroll({ top: position.offset }, { source: 'navigation' });
						return this.goTo(position.row, this.currentColumn, 'navigation.scroll');
					}

					return false;
				}
			})
		};

		return new Map(Object.entries(commands));
	}
}

class NavigationLet {
	constructor(plugin, shortcut) {
		const { model, table, observeReply } = plugin;
		this.plugin = plugin;

		const navigation = new Navigation(model, table);
		let focusBlurs = [];

		shortcut.register(navigation.commands);

		this.focus = new Command({
			source: 'navigation.view',
			canExecute: newCell => {
				const { cell: oldCell } = model.navigation();
				if (newCell && newCell.column.canFocus && !Td.equals(newCell, oldCell)) {
					return true;
				}

				return false;
			},
			execute: e => {
				const { rowIndex, columnIndex, behavior } = e;
				const td = table.body.cell(rowIndex, columnIndex).model();
				if (td) {
					const { row, column } = td;
					model.navigation({
						cell: {
							rowIndex,
							columnIndex,
							row,
							column
						}
					}, {
						source: 'navigation.view',
						behavior
					});
				} else {
					model.navigation({
						cell: null
					}, {
						source: 'navigation.view',
						behavior
					});
				}
			}
		});

		this.scrollTo = new Command({
			source: 'navigation.view',
			execute: (row, column) => {
				const cell = table.body.cell(row, column);
				this.scroll(table.view, cell);
			},
			canExecute: (row, column) => table.body.cell(row, column).model() !== null
		});

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					if (e.tag.behavior !== 'core') {
						// We need this one to toggle focus from details to main grid
						// or when user change navigation cell through the model
						if (!table.view.isFocused()) {
							table.view.focus();
						}
					}

					const rowIndex = selectRowIndex(e.state);
					const columnIndex = selectColumnIndex(e.state);

					focusBlurs = this.invalidateFocus(focusBlurs);
					if (e.tag.source !== 'navigation.scroll'
						&& e.tag.behavior !== 'core'
						&& this.scrollTo.canExecute(rowIndex, columnIndex)
					) {
						this.scrollTo.execute(rowIndex, columnIndex);
					}

					model.focus({
						rowIndex,
						columnIndex
					}, {
						source: 'navigation.view'
					});
				}
			});

		observeReply(model.focusChanged)
			.subscribe(e => {
				if (e.tag.source === 'navigation.view') {
					return;
				}

				if (e.hasChanges('isActive')) {
					const { view } = table;
					const activeClassName = `${GRID_PREFIX}-active`;
					if (e.state.isActive) {
						Fastdom.mutate(() => view.addClass(activeClassName));
						view.focus();
					} else {
						Fastdom.mutate(() => view.removeClass(activeClassName));
					}
				}

				if (e.hasChanges('rowIndex') || e.hasChanges('columnIndex')) {
					this.focus.execute(e.state);
				}

			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					const { status } = e.state;
					switch (status) {
						case 'stop': {
							const navState = model.navigation();
							const rowIndex = selectRowIndex(navState);
							const columnIndex = selectColumnIndex(navState);

							if (rowIndex >= 0 && columnIndex >= 0) {
								let td = table.body.cell(rowIndex, columnIndex).model();
								this.focus.execute({
									rowIndex: td ? td.rowIndex : -1,
									columnIndex: td ? td.columnIndex : -1,
									behavior: 'core'
								});
							}

							break;
						}
					}
				}
			});
	}

	invalidateFocus(dispose) {
		const { model, table } = this.plugin;

		dispose.forEach(f => f());
		dispose = [];

		const rowIndex = selectRowIndex(model.navigation());
		const columnIndex = selectColumnIndex(model.navigation());
		const cell = table.body.cell(rowIndex, columnIndex);
		if (cell.model()) {
			const row = table.body.row(rowIndex);

			Fastdom.mutate(() => {
				cell.addClass(`${GRID_PREFIX}-focused`);
				row.addClass(`${GRID_PREFIX}-focused`);
			});

			dispose.push(() => Fastdom.mutate(() => {
				cell.removeClass(`${GRID_PREFIX}-focused`);
				row.removeClass(`${GRID_PREFIX}-focused`);
			}));
		}

		return dispose;
	}

	scroll(view, target) {
		const { model } = this.plugin;
		const { scroll } = model;
		Fastdom.measure(() => {
			const tr = target.rect();
			const vr = view.rect('body-mid');
			const state = {};

			if (view.canScrollTo(target, 'left')) {
				if (vr.left > tr.left
					|| vr.left > tr.right
					|| vr.right < tr.left
					|| vr.right < tr.right) {

					if (vr.width < tr.width || vr.left > tr.left || vr.left > tr.right) {
						state.left = tr.left - vr.left + scroll().left;
					}
					else if (vr.left < tr.left || vr.right < tr.right) {
						state.left = tr.right - vr.right + scroll().left;
					}
				}
			}

			if (view.canScrollTo(target, 'top')) {
				if (vr.top > tr.top
					|| vr.top > tr.bottom
					|| vr.bottom < tr.top
					|| vr.bottom < tr.bottom) {

					if (vr.height < tr.height || vr.top > tr.top || vr.top > tr.bottom) {
						state.top = tr.top - vr.top + scroll().top;
					}
					else if (vr.top < tr.top || vr.bottom < tr.bottom) {
						state.top = tr.bottom - vr.bottom + scroll().top;
					}
				}
			}

			if (Object.keys(state).length) {
				scroll(state, { behavior: 'core', source: 'navigation.view' });
			}
		});
	}
}

class PaginationLet {
	constructor(plugin) {
		const { model, observe } = plugin;


		const { resetTriggers } = model.pagination();
		Object.keys(resetTriggers)
			.forEach(name =>
				observe(model[name + 'Changed'])
					.subscribe(e => {
						if (e.tag.behavior === 'core') {
							return;
						}

						if (model.scroll().mode === 'virtual') {
							return;
						}

						const trigger = resetTriggers[name];
						for (const key of trigger) {
							if (e.hasChanges(key)) {
								model.pagination({ current: 0 }, { source: e.tag.source || 'pagination.view' });
							}
						}
					}));
	}

	get current() {
		return this.plugin.model.pagination().current;
	}

	get size() {
		return this.plugin.model.pagination().size;
	}
}

// TODO: refactor this to the commands
class PersistenceService {
	constructor(model, createDefaultModel) {
		this.model = model;
		this.createDefaultModel = createDefaultModel;
	}

	save(settings) {
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		const model = {};
		for (const key in settings) {
			const source = gridModel[key]();
			const target = {};
			model[key] = target;
			for (const p of settings[key]) {
				const value = source[p];
				target[p] = clone(value);
			}
		}

		return model;
	}

	load(model, settings) {
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		for (const key in settings) {
			const source = model[key];
			if (source) {
				const target = gridModel[key];
				target(source, { source: 'persistence.service' });
			}
		}

		return model;
	}

	reset(settings) {
		const defaultModel = this.createDefaultModel();
		const gridModel = this.model;
		settings = settings || gridModel.persistence().settings;

		const model = {};
		for (let key in settings) {
			model[key] = {};
			const source = defaultModel[key];
			const target = gridModel[key];
			for (const p of settings[key]) {
				model[key][p] = source()[p];
			}
			target(model[key], { source: 'persistence.service' });
		}

		return model;
	}
}

class PluginService {
	constructor(model) {
		this.model = model;
	}

	resolve(name) {
		const lib = this.model.plugin().imports[name];
		if (!lib) {
			switch (name) {
				case 'xlsx': {
					throw new GridError('plugin.service', 'To use export plugin for xlsx format please add http://github.com/SheetJS/js-xlsx library to your project');
				}
				case 'fileSaver': {
					throw new GridError('plugin.service', 'To use export plugin for file saving please add https://github.com/eligrey/FileSaver.js library to your project');
				}
				case 'pdf': {
					throw new GridError('plugin.service', 'To use export plugin for pdf format please add https://github.com/MrRio/jsPDF and https://github.com/simonbengtsson/jsPDF-AutoTable libraries to your project');
				}
				default: {
					throw new GridError('import library', `Can't find ${name} library in imports`);
				}
			}
		}
		return lib;
	}
}

function factory(resource, key) {
	const data = resource.data;
	const scope = resource.scope;
	if (resource instanceof EnumerableResource) {
		let keyIndex = 1;
		let count = resource.count;
		const originKey = key;
		while (data.hasOwnProperty(key)) {
			key = originKey + keyIndex++;
		}

		if (count < keyIndex) {
			count = keyIndex;
		}

		return (content, env) => {
			// TODO: do we need full clone here?
			data[key] = content;
			if (Object.keys(env).length) {
				scope[key] = env;
			}
			return new EnumerableResource(data, scope, count);
		};
	}

	return (content, env) => {
		// TODO: do we need full clone here?
		data[key] = content;
		if (Object.keys(env).length) {
			scope[key] = env;
		}
		return new Resource(data, scope);
	};
}

function serializePost(model) {
	const paginationState = model.pagination();
	const sortState = model.sort();
	const filterState = model.filter();

	return {
		filter: filterState.by,
		order: sortState.by.map(s => {
			const key = Object.keys(s)[0];
			const value = s[key];
			return (value === 'asc' ? '+' : '-') + key;
		}),
		skip: paginationState.current * paginationState.size,
		take: paginationState.size
	};
}

class RowDetailsLet {
	constructor(plugin, shortcut) {
		const { model, observeReply, observe, disposable } = plugin;

		this.plugin = plugin;

		this.toggleStatus = new Command({
			source: 'row.details.view',
			execute: row => {
				if (!row) {
					row = selectRow(model.navigation());
				}

				const { toggle, status, mode } = model.row();
				if (toggle.execute({ row }) !== false) {
					const newStatus = toggleStatus([row], status, mode);
					model.row({ status: newStatus }, {
						source: 'row.details.view'
					});

					observe(model.sceneChanged)
						.pipe(
							filter$1(e => e.hasChanges('status') && e.state.status === 'stop'),
							takeOnce()
						)
						.subscribe(e => {
							const rowStatus = newStatus.get(row);
							if (rowStatus && rowStatus.expand) {
								const index = model.view().rows.indexOf(row);
								model.focus({
									rowIndex: index + 1
								}, {
									source: 'row.details.let'
								});
							}
						});
				}
			},
			canExecute: row => {
				if (!row) {
					const { cell } = model.navigation();
					if (cell && cell.column.type === 'row-expand') {
						row = cell.row;
					}
				}

				const { toggle } = model.row();
				return !!row && toggle.canExecute({ row });
			},
			shortcut: model.row().shortcut.toggle
		});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.tag.source === 'row.details.view') {
					return;
				}

				if (e.hasChanges('rows')) {
					const { status, mode } = model.row();
					const newStatus =
						invalidateStatus(
							model.data().rows,
							status,
							mode
						);

					model.row({ status: newStatus }, {
						source: 'row.details.view'
					});
				}
			});

		let canExecuteCheckSub;
		const unsubscribeCanExecuteCheck = () => {
			if (canExecuteCheckSub) {
				canExecuteCheckSub.unsubscribe();
				canExecuteCheckSub = null;
			}
		};

		disposable.add(
			unsubscribeCanExecuteCheck
		);

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('toggle')) {
					const { toggle } = e.state;
					unsubscribeCanExecuteCheck();
					canExecuteCheckSub = toggle.canExecuteCheck
						.subscribe(() => {
							this.toggleStatus.canExecuteCheck.next();
						});
				}
			});

		shortcut.register([this.toggleStatus]);
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const { model } = this.plugin;
		const { status } = model.row();
		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}

class RowLet {
	constructor(plugin, tagName) {
		const { model, table, observe } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;

		const pathFinder = new PathService(table.box.bag.body);

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const row = pathFinder.row(eventPath(e));
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				switch (e.action) {
					case 'over': {
						const row = pathFinder.row(eventPath(e));
						if (!e.inAreaY(row.element)) {
							return;
						}

						const newIndex = row.index;
						if (oldIndex !== newIndex) {
							const oldRow = table.body.row(oldIndex);
							oldRow.removeClass(`${GRID_PREFIX}-drag`);

							const newRow = table.body.row(newIndex);
							newRow.addClass(`${GRID_PREFIX}-drag`);

							const tr = table.body.row(oldIndex).model();
							const entries = [];
							for (let entry of model.rowList().index.entries()) {
								const index = entry[1];
								if (oldIndex < index && index <= newIndex) {
									entry[1] = index - 1;
								} else if (oldIndex > index && index >= newIndex) {
									entry[1] = index + 1;
								}

								entries.push(entry);
							}

							const index = new Map(entries);
							const { rowId } = model.data();
							const key = rowId(newIndex, tr.model);
							index.set(key, newIndex);
							model.rowList({ index }, { source: 'row.view' });

							e.dragData = newIndex;
						}
						break;
					}
					case 'drop':
					case 'end': {
						const oldRow = table.body.row(oldIndex);
						oldRow.removeClass(`${GRID_PREFIX}-drag`);
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'row.view',
			execute: e => {
				const index = e.data;
				const row = table.body.row(index);
				row.addClass(`${GRID_PREFIX}-drag`);
				const tr = row.model();
				if (tr) {
					return tr.element;
				}
			},
			canExecute: e => {
				if (isNumber(e.data)) {
					const index = e.data;
					return index >= 0 && model.scene().rows.length > index;
				}

				return false;
			}
		});

		this.resize = new Command({
			source: 'row.view'
		});

		observe(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					model.rowList({
						index: new Map(),
					}, {
						source: 'row.view',
						behavior: 'core'
					});
				}
			});
	}

	get canMove() {
		const { model } = this.plugin;
		return model.row().canMove;
	}

	get canResize() {
		const { model } = this.plugin;
		return model.row().canResize;
	}
}

class ScrollLet {
	constructor(plugin, vscroll) {
		const { model, observeReply, service } = plugin;
		const { scroll, row, pagination, fetch, pipe } = model;

		this.plugin = plugin;
	
		const rowHeight = row().height;
		const settings = {
			threshold: pagination().size,
			resetTriggers: []
		};

		if (rowHeight > 0 || isFunction(rowHeight)) {
			settings.rowHeight = rowHeight;
		}

		this.y = vscroll.factory(settings);
		this.y.container.read = Fastdom.measure;
		this.y.container.write = Fastdom.mutate;

		const subscribe =
			(this.y.container.draw$.on || this.y.container.draw$.subscribe)
				.bind(this.y.container.draw$);

		const updateCurrentPage = position => {
			const { size, current, count } = pagination();
			const newCurrent = size === 0
				? 0
				: count - 1 <= position + size
					? Math.ceil(count / size) - 1
					: Math.floor((position + size / 2) / size);

			if (newCurrent !== current) {
				pagination({ current: newCurrent }, {
					source: 'scroll.view',
					behavior: 'core'
				});
			}
		};

		const updateTotalCount = () => {
			const { effect } = pipe();
			if (effect.hasOwnProperty('memo')) {
				const count = effect.memo.length;
				pagination({ count }, {
					source: 'scroll.view',
					behavior: 'core'
				});

				return count;
			}

			return pagination().count;
		};

		subscribe(e => {
			const { position } = e;
			updateCurrentPage(position);

			scroll({ cursor: position }, {
				source: 'scroll.view',
				behavior: 'core'
			});
		});

		switch (scroll().mode) {
			case 'virtual': {
				this.y.settings.fetch = (skip, take, d) => {
					fetch({ skip }, {
						source: 'scroll.view',
						behavior: 'core'
					});

					if (skip === 0) {
						const count = updateTotalCount();
						d.resolve(count);
					} else {
						service.invalidate({
							source: 'scroll.view',
							why: 'refresh'
						}).then(() => {
							const count = updateTotalCount();
							d.resolve(count);
						});
					}
				};

				let startSource;
				const resetTriggers = new Set(scroll().resetTriggers);

				observeReply(model.sceneChanged)
					.subscribe(e => {
						if (e.hasChanges('status')) {
							const { status } = e.state;
							switch (status) {
								case 'start': {
									startSource = e.tag.source;
									if (resetTriggers.has(startSource)) {
										fetch({ skip: 0 }, {
											source: 'scroll.view',
											behavior: 'core'
										});
									}
									break;
								}
								case 'stop': {
									if (resetTriggers.has(startSource)) {
										this.y.container.reset();
									}
									break;
								}
							}
						}
					});

				break;
			}
			default: {
				observeReply(model.paginationChanged)
					.subscribe(e => {
						if (e.tag.behavior !== 'core') {
							this.y.container.reset();
						}
					});
				break;
			}
		}

		observeReply(model.scrollChanged)
			.subscribe(e => {
				if (e.tag.source === 'scroll.view') {
					return;
				}

				if (e.hasChanges('mode')) {
					switch (e.state.mode) {
						case 'virtual': {
							scroll({
								map: {
									rowToView: index => index - this.y.container.position,
									viewToRow: index => index + this.y.container.position
								}
							}, {
								source: 'scroll.view',
								behavior: 'core'
							});
							break;
						}
						case 'default': {
							scroll({
								map: {
									rowToView: identity,
									viewToRow: identity
								}
							});
							break;
						}
					}
				}

				if (e.hasChanges('left') || e.hasChanges('top')) {
					this.invalidate();
				}
			});
	}

	invalidate() {
		Log.info('layout', 'invalidate scroll');

		const { model, table } = this.plugin;
		const { view } = table;
		const { left, top } = model.scroll();

		Fastdom.mutate(() => {
			view.scrollLeft(left);
			view.scrollTop(top);
		});
	}

	get mode() {
		return this.plugin.model.scroll().mode;
	}
}

class SelectionCommandManager extends CompositeCommandManager {
	constructor(model, manager) {
		super(manager);

		this.model = model;
	}

	filter(commands) {
		if (this.model.edit().status === 'edit') {
			const { cell } = this.model.navigation();
			if (cell && cell.column.type !== 'select') {
				return [];
			}
		}

		return super.filter(commands);
	}
}

class SelectionRange {
	constructor(model) {
		this.model = model;
	}

	build() {
		const rangeMap = {
			'row': this.buildRows.bind(this),
			'column': this.buildColumns.bind(this),
			'cell': this.buildCells.bind(this),
			'mix': this.buildMix.bind(this)
		};

		const model = this.model;
		return (...args) => {
			const selection = model.selection();
			const buildRange = rangeMap[selection.unit];
			if (!buildRange) {
				throw new GridError('range.builder', `Invalid unit ${selection.unit}`);
			}

			return buildRange(...args);
		};
	}

	buildRows(startCell, endCell) {
		const model = this.model;
		const { rows } = model.scene();
		if (!endCell) {
			return [rows[startCell.rowIndex]];
		}

		const startIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endIndex = Math.max(startCell.rowIndex, endCell.rowIndex);
		return rows.slice(startIndex, endIndex + 1);
	}

	buildColumns(startCell, endCell) {
		if (!endCell) {
			return [startCell.column];
		}

		const columns = this.model.columnList().line;
		const startIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endIndex = Math.max(startCell.columnIndex, endCell.columnIndex);
		return columns.slice(startIndex, endIndex + 1);
	}

	buildCells(startCell, endCell) {
		if (!endCell) {
			return [{
				column: startCell.column,
				row: startCell.row
			}];
		}

		const model = this.model;
		const { rows } = model.scene();
		const { columns } = model.view();

		const startRowIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endRowIndex = Math.max(startCell.rowIndex, endCell.rowIndex);

		const startColumnIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endColumnIndex = Math.max(startCell.columnIndex, endCell.columnIndex);

		const selectedRows = rows.slice(startRowIndex, endRowIndex + 1);
		const selectedColumns = columns.slice(startColumnIndex, endColumnIndex + 1);

		const items = [];
		selectedRows.forEach(row => {
			selectedColumns
				.filter(column => column.category === 'data')
				.forEach(column => {
					items.push({
						column: column,
						row: row
					});
				});
		});

		return items;
	}

	buildMix(startCell, endCell) {
		const mixUnit = startCell.column.type === 'row-indicator' ? 'row' : 'cell';
		const range = (mixUnit === 'row' ? this.buildRows(startCell, endCell) : this.buildCells(startCell, endCell));
		return range
			.map(item => ({
				item: item,
				unit: mixUnit
			}));
	}
}

class SubSelectionState {
	constructor(model, service) {
		this.model = model;
		this.service = service;
	}

	select(item, state = true, key) {
		key = key || this.keyFactory();
		if (isArray(item)) {
			item.forEach(item => this.select(item, state, key));
			return;
		}

		if (item instanceof Node) {
			const { rows } = this.model.data();
			if (rows.length) {
				item.rows.forEach(index => this.select(rows[index], state, key));
				return;
			}
		}

		this.selectCore(item, state, key);
	}

	canSelect(item) {
		return this.canSelectCore(item);
	}

	toggle(item) {
		const state = this.state(item);
		return this.select(item, state === null || !state);
	}

	state(item, key) {
		key = key || this.keyFactory();
		if (isArray(item)) {
			const all = item.every(item => this.state(item, key));
			return all ? true : item.some(item => this.state(item, key)) ? null : false;
		}

		if (item instanceof Node) {
			const { rows } = this.model.data();
			if (rows.length) {
				const all = item.rows.length && item.rows.every(index => this.state(rows[index], key));
				return all ? true : item.rows.some(index => this.state(rows[index], key)) ? null : false;
			}
		}

		return this.stateCore(item, key);
	}

	stateAll(items) {
		if (!items.length) {
			return false;
		}

		const key = this.keyFactory();

		const notSelected = items.findIndex(item => this.state(item, key) === false);
		if (notSelected < 0) {
			return true;
		}

		return notSelected === 0
			? items.every(item => this.state(item, key) === false)
				? false
				: null
			: null;
	}

	keyFactory() {
		return this.service.hashFactory();
	}

	clear() {
		this.clearCore();
	}

	entries() {
		return [];
	}

	selectCore() {
	}

	clearCore() {
	}

	stateCore() {
		return false;
	}

	canSelectCore() {
		return true;
	}
}

class SingleSelectionState extends SubSelectionState {
	constructor(model, service) {
		super(model, service);

		this.item = null;
	}

	entries() {
		return this.item ? [this.item] : [];
	}

	selectCore(item, state) {
		if (state) {
			this.item = item;
		}
		else {
			this.item = null;
		}
	}

	stateCore(item, key) {
		return this.item !== null && key(item) === key(this.item);
	}

	clearCore() {
		this.item = null;
	}
}

class SingleOnlySelectionState extends SubSelectionState {
	constructor(model, service) {
		super(model, service);

		this.item = null;
	}

	entries() {
		return this.item ? [this.item] : [];
	}

	selectCore(item, state) {
		if (state) {
			this.item = item;
		}
	}

	canSelectCore(item) {
		return item !== this.item;
	}

	stateCore(item, key) {
		return this.item !== null && key(item) === key(this.item);
	}

	clearCore() {
		this.item = null;
	}
}

class MultipleSelectionState extends SubSelectionState {
	constructor(model, service) {
		super(model, service);

		this.items = new Map();
	}

	entries() {
		return Array.from(this.items.values());
	}

	selectCore(item, state, key) {
		if (state) {
			this.items.set(key(item), item);
		}
		else {
			this.items.delete(key(item));
		}
	}

	stateCore(item, key) {
		return this.items.has(key(item));
	}

	clearCore() {
		this.items = new Map();
	}
}

class RangeSelectionState extends MultipleSelectionState {
	constructor(model, service) {
		super(model, service);
	}

	select(item, state = true) {
		if (isArray(item)) {
			this.clear();
		}

		super.select(item, state);
	}
}

function selectionStateFactory(model, service) {
	const mode = model.selection().mode;

	switch (mode) {
		case 'single':
			return new SingleSelectionState(model, service);
		case 'singleOnly':
			return new SingleOnlySelectionState(model, service);
		case 'multiple':
			return new MultipleSelectionState(model, service);
		case 'range':
			return new RangeSelectionState(model, service);
		default:
			throw new GridError('selection.state.factory', `Invalid selection mode "${mode}"`);
	}
}

class SelectionLet {
  constructor(plugin, shortcut) {
    const { model, table, observeReply } = plugin;

    this.plugin = plugin;
    this.selectionService = new SelectionService(model);
    this.form = selectionStateFactory(model, this.selectionService);
    this.selectionRange = new SelectionRange(model);

    const commands = this.getCommands();
    shortcut.register(commands);

    this.toggleRow = commands.get('toggleRow');
    this.toggleColumn = commands.get('toggleColumn');
    this.toggleCell = commands.get('toggleCell');
    this.reset = commands.get('reset');
    this.stateCheck = new SubjectLike();

    observeReply(model.navigationChanged)
      .subscribe(e => {
        if (e.tag.source === 'selection.view') {
          return;
        }

        if (e.hasChanges('cell')) {
          if (this.toggleCell.canExecute(e.state.cell)) {
            this.toggleCell.execute(e.state.cell);
          }
        }
      });

    const modeClass = `${GRID_PREFIX}-select-${model.selection().mode}`;
    const unitClass = `${GRID_PREFIX}-select-${model.selection().unit}`;

    const { view } = table;
    view.addClass(modeClass);
    view.addClass(unitClass);

    observeReply(model.selectionChanged)
      .subscribe(e => {
        if (e.hasChanges('mode')) {
          const newModeClass = `${GRID_PREFIX}-select-${e.state.mode}`;
          const oldModeClass = `${GRID_PREFIX}-select-${e.changes.mode.oldValue}`;

          view.removeClass(oldModeClass);
          view.addClass(newModeClass);
        }

        if (e.hasChanges('unit')) {
          const newUnitClass = `${GRID_PREFIX}-select-${e.state.unit}`;
          const oldUnitClass = `${GRID_PREFIX}-select-${e.changes.unit.oldValue}`;

          view.removeClass(oldUnitClass);
          view.addClass(newUnitClass);
        }

        if (e.hasChanges('unit') || e.hasChanges('mode')) {
          if (!e.hasChanges('items')) {
            this.form.clear();
            if (model.selection().items.length) {
              model.selection({ items: [] }, {
                source: 'selection.view'
              });
            }

            this.form = selectionStateFactory(model, this.selectionService);
          }
        }

        if (e.hasChanges('items')) {
          if (e.tag.source !== 'selection.view') {
            // Don't use commit it came outside already

            const oldEntries = this.selectionService.lookup(e.changes.items.oldValue);
            this.select(oldEntries, false);

            const newEntries = this.selectionService.lookup(e.state.items);
            this.select(newEntries, true);
          }
          
          this.stateCheck.next(e.state.items);
        }
      });

    observeReply(model.dataChanged)
      .subscribe(e => {
        const { unit, items } = model.selection();

        const needUpdateAfterRowsChanged = e.hasChanges('rows') && (unit === 'row' || unit === 'mix' || unit === 'cell');
        const needUpdateAfterColumnsChanged = e.hasChanges('columns') && (unit === 'column' || unit === 'mix' || unit === 'cell');

        if (needUpdateAfterRowsChanged || needUpdateAfterColumnsChanged) {
          // re-invalidate selection
          this.form.clear();
          const entries = this.selectionService.lookup(items);
          this.select(entries, true);
        }
      });
  }

  getCommands() {
    const { model, table } = this.plugin;
    const { shortcut } = model.selection();

    const toggleActiveRow = new Command({
      source: 'selection.view',
      canExecute: () => {
        const rowIndex = selectRowIndex(model.navigation());
        const row = this.rows[rowIndex >= 0 ? rowIndex : rowIndex + 1];

        if (!this.form.canSelect(row)) {
          return false;
        }

        return model.selection().unit === 'row' && this.rows.length > 0;
      },
      execute: () => {
        const rowIndex = selectRowIndex(model.navigation());
        const row = this.rows[rowIndex >= 0 ? rowIndex : rowIndex + 1];
        const commit = this.toggle(row);
        commit();
      },
      shortcut: shortcut.toggleRow
    });

    const commands = {
      toggleCell: new Command({
        source: 'selection.view',
        canExecute: item => {
          const selectionState = model.selection();
          return item && selectionState.mode !== 'range' && (selectionState.unit === 'cell' || selectionState.unit === 'mix');
        },
        execute: (item, source) => {
          const selectionState = model.selection();
          switch (selectionState.unit) {
            case 'cell': {
              const commit = this.toggle(item, source);
              commit();
              break;
            }
            case 'mix': {
              if (item.column.type === 'row-indicator') {
                const commit = this.toggle({ item: item.row, unit: 'row' }, source);
                commit();
                break;
              }
              else {
                const commit = this.toggle({ item: item, unit: 'cell' }, source);
                commit();
                break;
              }
            }
          }
        }
      }),
      toggleRow: new Command({
        source: 'selection.view',
        execute: (item, source) => {
          const commit = this.toggle(item, source);
          commit();
        },
        canExecute: row => {
          if (!this.form.canSelect(row)) {
            return false;
          }

          const e = {
            items: isUndefined(row)
              ? model.scene().rows
              : [row],
            source: 'custom',
            kind: 'toggleRow'
          };

          if (!row) {
            return model.selection().toggle.canExecute(e) && this.mode === 'multiple';
          }

          return model.selection().toggle.canExecute(e);
        }
      }),
      toggleColumn: new Command({
        source: 'selection.view',
        execute: (item, source) => {
          const commit = this.toggle(item, source);
          commit();
        }
      }),
      commitRow: new Command({
        source: 'selection.view',
        canExecute: () => {
          const column = selectColumn(model.navigation());
          return column && column.type === 'select';
        },
        execute: () => {
          if (toggleActiveRow.canExecute()) {
            toggleActiveRow.execute();
          }
        },
        shortcut: model.edit().commitShortcuts['select'] || ''
      }),
      toggleActiveRow: toggleActiveRow,
      togglePrevRow: new Command({
        source: 'selection.view',
        canExecute: () => model.selection().unit === 'row' && selectRowIndex(model.navigation()) > 0,
        execute: () => {
          const rowIndex = selectRowIndex(model.navigation());
          const columnIndex = selectColumnIndex(model.navigation());

          const row = this.rows[rowIndex];
          const commit = this.toggle(row);
          commit();

          this.navigateTo(rowIndex - 1, columnIndex);
        },
        shortcut: shortcut.togglePreviousRow
      }),
      toggleNextRow: new Command({
        source: 'selection.view',
        canExecute: () => model.selection().unit === 'row' && selectRowIndex(model.navigation()) < this.rows.length - 1,
        execute: () => {
          const rowIndex = selectRowIndex(model.navigation());
          const columnIndex = selectColumnIndex(model.navigation());

          const row = this.rows[rowIndex];
          const commit = this.toggle(row);
          commit();

          this.navigateTo(rowIndex + 1, columnIndex);
        },
        shortcut: shortcut.toggleNextRow
      }),
      toggleActiveColumn: new Command({
        source: 'selection.view',
        canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) >= 0,
        execute: () => {
          const columnIndex = selectColumnIndex(model.navigation());

          const column = this.columns[columnIndex];
          const commit = this.toggle(column);
          commit();
        },
        shortcut: shortcut.toggleColumn
      }),
      toggleNextColumn: new Command({
        source: 'selection.view',
        canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) < this.columns.length - 1,
        execute: () => {
          const rowIndex = selectRowIndex(model.navigation());
          const columnIndex = selectColumnIndex(model.navigation());

          const column = this.columns[columnIndex];
          const commit = this.toggle(column);
          commit();

          this.navigateTo(rowIndex, columnIndex + 1);
        },
        shortcut: shortcut.toggleNextColumn
      }),
      togglePrevColumn: new Command({
        source: 'selection.view',
        canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) > 0,
        execute: () => {
          const rowIndex = selectRowIndex(model.navigation());
          const columnIndex = selectColumnIndex(model.navigation());

          const column = this.columns[columnIndex];
          const commit = this.toggle(column);
          commit();

          this.navigateTo(rowIndex, columnIndex - 1);
        },
        shortcut: shortcut.togglePreviousColumn
      }),
      selectAll: new Command({
        source: 'selection.view',
        canExecute: () => {
          const { mode } = model.selection();
          return mode === 'multiple' || mode === 'range';
        },
        execute: () => {
          let entries = [];
          switch (model.selection().unit) {
            case 'row': {
              entries = this.rows;
              break;
            }
            case 'column': {
              entries = model.columnList().line;
              break;
            }
            case 'cell':
            case 'mix': {
              const { body } = table;

              const buildRange = this.selectionRange.build();
              const startCell = body.cell(0, 0);
              const endCell = body.cell(this.rows.length, this.columns.length);

              entries = buildRange(startCell, endCell);
              break;
            }
            default: {
              throw new GridError('selection.view', `Invalid unit ${model.selection().unit}`);
            }
          }

          const commit = this.select(entries, true);
          commit();
        },
        shortcut: shortcut.selectAll
      })
    };

    return new Map(
      Object.entries(commands)
    );
  }

  selectRange(startCell, endCell, source) {
    const buildRange = this.selectionRange.build();
    const range = buildRange(startCell, endCell);
    const commit = this.select(range, true, source);
    commit();
  }

  toggle(items, source = 'custom') {
    const { model } = this.plugin;
    const { toggle } = model.selection();

    items = !arguments.length || isUndefined(items)
      ? this.rows
      : isArray(items)
        ? items : [items];

    const e = { items, source, kind: 'toggle' };
    if (toggle.canExecute(e)) {
      toggle.execute(e);

      const { form } = this;
      form.toggle(items);

      return () => {
        model.selection({
          items: this.selectionService.map(form.entries())
        }, {
          source: 'selection.view'
        });
      };
    }

    return noop;
  }

  select(items, state, source = 'custom') {
    const { model } = this.plugin;
    const { toggle } = model.selection();
    const e = {
      items,
      source,
      kind: 'select'
    };

    if (toggle.canExecute(e)) {
      toggle.execute(e);

      this.form.select(items, state);

      return () => {
        const items = this.selectionService.map(this.form.entries());
        model.selection({ items }, {
          source: 'selection.view'
        });
      };
    } else {
      return noop;
    }
  }

  state(item) {
    if (!arguments.length) {
      return !!this.form.stateAll(this.rows);
    }

    return this.form.state(item) === true;
  }

  isIndeterminate(item) {
    if (!arguments.length) {
      return this.form.stateAll(this.rows) === null;
    }

    return this.form.state(item) === null;
  }

  get selection() {
    return this.plugin.model.selection();
  }

  get mode() {
    return this.selection.mode;
  }

  get items() {
    return this.selection.items;
  }

  get rows() {
    const { table } = this.plugin;
    return table.data.rows();
  }

  get columns() {
    const { table } = this.plugin;
    return table.data.columns();
  }

  navigateTo(rowIndex, columnIndex) {
    const { table, model } = this.plugin;
    const { row, column } = table.body.cell(rowIndex, columnIndex).model();
    model.navigation({
      cell: {
        rowIndex,
        columnIndex,
        row,
        column
      }
    }, { source: 'selection.view' });
  }
}

function stringifyFactory(property) {
	switch (property) {
		case 'filter':
			return filter;
		case 'sort':
			return sort;
		case 'group':
		case 'pivot':
			return transformBy(property);
		default:
			return () => '';
	}
}

function filter(model) {
	const values = Object.values(model.by)
		.map(column => column.items);

	if (values.length === 0) return '';

	const by = flatten(values).join(', ');
	return `filter ${by}`;
}

function sort(model) {
	const keys = [];
	for (let item of model.by) {
		for (let key in item) {
			keys.push(key);
		}
	}

	if (keys.length === 0) return '';

	const by = keys.join(', ');
	return `sort ${by}`;
}

function transformBy(property) {
	return model => {
		const keys = model.by;
		if (keys.length === 0) return '';

		const by = keys.join(', ');
		return `${property} ${by}`;
	};
}

function key(pair) {
	const key = Object.keys(pair)[0];
	if (!key) {
		throw new GridError(
			'pair',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

function index(pairs, pairKey) {
	return pairs.map(key).findIndex(k => k === pairKey);
}

function value(pair) {
	const pairKey = key(pair);
	return pair[pairKey];
}

function map(pairs) {
	return pairs.reduce((memo, pair) => {
		const pairKey = key(pair);
		memo[pairKey] = pair[pairKey];
		return memo;
	}, {});
}

function predicateFactory(search) {
	if (isObject(search)) {
		// TODO: improve performance
		const getters = Object
			.keys(search)
			.map(key => {
				const value = compileGet(key);
				return { key, value };
			});

		const { length } = getters;
		switch (length) {
			case 0: {
				return yes;
			}
			case 1: {
				const get = getters[0];
				const pattern = search[get.key];
				if (!pattern) {
					return yes;
				}

				const expr = new RegExp(pattern, 'gi');
				return item => expr.test(get.value(item));
			}
			default: {
				return item =>
					getters.reduce((memo, get) =>
						(memo && new RegExp(search[get.key], 'gi').test(get.value(item)) || search[get.key] === ''),
						true);

			}
		}
	}

	const pattern = escapeRegexp(search);
	const expr = new RegExp(pattern, 'gi');
	return item => {
		expr.lastIndex = 0;
		return expr.test(item);
	}
}

function firstRowTitle(index, row) {
	return row[index];
}
function numericTitle(index) {
	return index;
}
function alphaTitle(index) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	if (index < alphabet.length) {
		return alphabet[index];
	} else {
		const indexFirst = Math.floor(index / alphabet.length - 1);
		const indexSecond = index % alphabet.length;
		return `${alphabet[indexFirst]}${alphabet[indexSecond]}`;
	}
}

function upload(element) {
	const { ownerDocument } = element;
	const input = ownerDocument.createElement('input');
	input.type = 'file';
	input.style.display = 'none';
	
	element.appendChild(input);
	input.click();
}

class SortLet {
	constructor(plugin) {
		const { model } = plugin;
		this.plugin = plugin;

		this.hover = false;
		this.toggle = new Command({
			source: 'sort.view',
			canExecute: column => {
				const key = column.key;
				const map = mapColumns(model.columnList().line);
				return map.hasOwnProperty(key) && map[key].canSort !== false;
			},
			execute: column => {
				const key = column.key;
				const sort = model.sort;
				const sortState = sort();
				let by = Array.from(sortState.by);

				if (sortState.mode === 'mixed') {
					const { code, status } = model.keyboard();
					const isSingleMode = code !== 'shift' || status !== 'down';
					// if shift key is not pressed - reset sort for other columns and do sort like single mode
					if (isSingleMode) {
						const index = getIndex(by, key);
						by = index >= 0 ? by.filter((_, i) => i === index) : [];
					}
				}
				const index = getIndex(by, key);
				if (index >= 0) {
					const dir = getDirection(by[index]);
					switch (dir) {
						case 'desc': {
							by.splice(index, 1);
							this.hover = false;
							break;
						}
						case 'asc': {
							const entry = { [key]: 'desc' };
							by[index] = entry;
							this.hover = false;
							break;
						}
						default:
							throw GridError(
								'head.core',
								`Invalid sort direction ${dir}`);
					}
				}
				else {
					if (sortState.mode === 'single') {
						by.length = 0;
					}

					const entry = { [key]: 'asc' };
					by.push(entry);

					const order = orderFactory(model);
					order(by);
				}

				sort({ by }, { source: 'sort.view' });
			}
		});

		this.onInit();
	}

	onInit() {
		const { model, observeReply } = this.plugin;
		const { sort } = model;

		observeReply(model.columnListChanged)
			.subscribe(e => {
				if (e.hasChanges('index')) {
					const sortState = sort();
					const order = orderFactory(model);
					const sortBy = order(Array.from(sortState.by));
					if (!this.equals(sortBy, sortState.by)) {
						sort({ by: sortBy }, { source: 'sort.view' });
					}
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const { by } = sort();
					const columnMap = mapColumns(e.state.columns);
					const newBy = by.filter(entry => columnMap.hasOwnProperty(getKey(entry)));
					if (!this.equals(newBy, by)) {
						sort({ by: newBy }, { source: 'sort.view' });
					}
				}
			});
	}

	equals(x, y) {
		return JSON.stringify(x) === JSON.stringify(y);
	}

	direction(column) {
		const { key } = column;
		const { by } = this.plugin.model.sort();
		return getMap(by)[key];
	}

	order(column) {
		const { key } = column;
		const { model } = this.plugin;
		const { by } = model.sort();
		return getIndex(by, key);
	}
}

class StyleEntry {
	constructor(element, sheets, markDirty) {
		this.element = element;
		this.list = new Set();
		this.sheets = sheets;
		this.markDirty = markDirty;
	}

	class(key, style) {
		key = escape$2(key);
		this.list.add(key);
		this.markDirty(this);
		if (style) {
			const sheets = this.sheets;
			if (!sheets.has(key)) {
				sheets.set(key, style);
			}
		}
	}
}

class StyleMonitor {
	constructor(model) {
		this.model = model;
		this.entries = new Set();
		this.newSheets = new Map();
		this.oldSheets = new Map();
	}

	enter() {
		const newSheets = this.newSheets;
		let entries = this.entries;
		for (let entry of entries) {
			for (let cls of entry.list) {
				entry.element.removeClass(cls, true);
			}
		}

		entries = this.entries = new Set();
		const markDirty = entry => entries.add(entry);

		return element => {
			const entry = new StyleEntry(element, newSheets, markDirty);
			return entry.class.bind(entry);
		};
	}

	exit() {
		const entries = this.entries;
		for (let entry of entries) {
			for (let cls of entry.list) {
				entry.element.addClass(cls, true);
			}
		}

		const newSheets = this.newSheets;
		const oldSheets = this.oldSheets;
		const id = this.model.grid().id;
		for (let cls of oldSheets.keys()) {
			if (!newSheets.has(cls)) {
				const sheet$1 = sheet(id, cls);
				sheet$1.remove();
			}
		}

		for (let [cls, style] of newSheets.entries()) {
			if (!oldSheets.has(cls)) {
				const sheet$1 = sheet(id, cls);
				sheet$1.set({ [`.${cls}`]: style });
			}
		}

		this.oldSheets = newSheets;
		this.newSheets = new Map();
	}
}

class StyleService {
	constructor(model) {
		this.style = model.style;
	}

	row() {
		const { rows, row } = this.style();
		const visitors = row === noop
			? rows
			: rows.concat([row]);

		return Composite.func(visitors);
	}

	cell() {
		const { cells, cell } = this.style();
		if (isFunction(cell)) {
			const visitors = cell === noop
				? cells
				: cells.concat([cell]);

			return Composite.func(visitors);
		}

		const keys = Object.keys(cell);
		if (keys.length) {
			const visitors = cells.concat(keys.map(key => {
				const visit = cell[key];
				return (row, column, context) => {
					if (column.key === key) {
						visit(row, column, context);
					}
				};
			}));

			return Composite.func(visitors);
		}

		return Composite.func(cells);
	}
}

class VirtualRowStyle {
	constructor(table, style) {
		this.table = table;
		this.style = style;
	}

	visitFactory() {
		const { style } = this;
		const { rowBox } = this.table.body;
		const { entries } = rowBox;

		return (row, context) => {
			const model = {
				dataIndex: context.row,
			};

			const key = rowBox.key(model);
			const classList = entries.get(key);
			if (classList) {
				for (let cls of classList) {
					context.class(cls);
				}
			}

			style(row, context);
		};
	}
}

class VirtualCellStyle {
	constructor(table, style) {
		this.table = table;
		this.style = style;
	}

	visitFactory() {
		const { style } = this;
		const { cellBox } = this.table.body;
		const { columnBox } = this.table.body;

		const cellEntries = cellBox.entries;
		const columnEntries = columnBox.entries;

		return (row, column, context) => {
			// column level
			const columnModel = {
				dataIndex: context.column,
			};

			const columnKey = columnBox.key(columnModel);
			const columnClassList = columnEntries.get(columnKey);
			if (columnClassList) {
				for (let cls of columnClassList) {
					context.class(cls);
				}
			}

			// cell level
			const cellModel = {
				dataRowIndex: context.row,
				dataColumnIndex: context.column,
			};

			const cellKey = cellBox.key(cellModel);
			const cellClassList = cellEntries.get(cellKey);
			if (cellClassList) {
				for (let cls of cellClassList) {
					context.class(cls);
				}
			}

			// add classes
			style(row, column, context);
		};
	}
}

class StyleLet {
	constructor(plugin) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.valueFactory = getValueFactory;
		this.service = new StyleService(model);
		this.active = {
			row: false,
			cell: false
		};

		this.monitor = {
			row: new StyleMonitor(model),
			cell: new StyleMonitor(model)
		};

		observeReply(model.styleChanged)
			.subscribe(e => {
				if (e.hasChanges('row') || e.hasChanges('rows')) {
					this.active.row = e.state.row !== noop || e.state.rows.length > 0;
				}

				if (e.hasChanges('cell') || e.hasChanges('cells')) {
					this.active.cell = e.state.cell !== noop || e.state.cells.length > 0;
				}
			});
	}

	needInvalidate() {
		const { model } = this.plugin;
		if (model.scene().status !== 'stop') {
			return false;
		}

		const { active } = this;
		const isVirtual = model.scroll().mode === 'virtual';
		const isActive = isVirtual || active.row || active.cell;

		if (!isActive) {
			return false;
		}

		const { invalidate } = model.style();
		const context = {
			model
		};

		return invalidate.canExecute(context) && invalidate.execute(context) !== false;
	}

	invalidate(domCell, domRow) {
		const { model, table } = this.plugin;
		let { row: isRowActive, cell: isCellActive } = this.active;

		const isVirtual = model.scroll().mode === 'virtual';

		// TODO: improve performance
		const valueCache = new Map();
		const value = (row, column) => {
			let getValue = valueCache.get(column);
			if (!getValue) {
				getValue = getValueFactory(column);
				valueCache.set(column, getValue);
			}

			return getValue(row);
		};

		const columnList = table.data.columns();
		const columnMap = mapColumns(columnList);

		let visitRow = this.service.row();
		let visitCell = this.service.cell();
		if (isVirtual) {
			isRowActive = true;
			isCellActive = true;
			visitRow = new VirtualRowStyle(table, visitRow).visitFactory();
			visitCell = new VirtualCellStyle(table, visitCell).visitFactory();
		}

		// For performance reason we make rowContext and cellContext the same reference 
		// for the all style calls.
		const rowContext = {
			class: noop,
			row: -1,
			value: null,
			columns: {
				map: columnMap,
				list: columnList
			}
		};

		const cellContext = {
			class: noop,
			row: -1,
			column: -1,
			value: null,
			columns: rowContext.columns
		};

		// To improve performance take rows and cells directly from the bag and not from the DOM table. 
		const { body } = table;
		const { rowToView, columnToView } = table.box.mapper;
		const bodyBag = table.box.bag.body;

		if (isRowActive) {
			const rows = bodyBag.getRowElements();
			for (let tr of rows) {
				const { index, element, model } = tr;
				// This private method we use only for performance, don't use it in other places.
				const row = body.createRowCore(rowToView(index), element);

				rowContext.class = domRow(row);
				rowContext.row = index;
				rowContext.value = value;

				visitRow(model, rowContext);
			}
		}

		if (isCellActive) {
			const cells = bodyBag.getCellElements();
			for (let td of cells) {
				const { rowIndex, columnIndex, element, row, column } = td;
				// This private method we use only for performance, don't use it in other places.
				const cell = body.createCellCore(rowToView(rowIndex), columnToView(columnIndex), element);

				cellContext.class = domCell(cell);
				cellContext.row = rowIndex;
				cellContext.column = columnIndex;
				cellContext.value = value;

				visitCell(row, column, cellContext);
			}
		}
	}
}

const builder = new ModelBuilder();
function modelFactory() {
	return builder.build();
}

function viewFactory(
	plugin,
	commandManager,
	vscroll,
	selectors
) {
	const { model, disposable } = plugin;
	const { shortcut } = model.action();

	const navigationShortcut = {
		keyCode: () => shortcut.keyCode,
		register: commands =>
			disposable.add(
				shortcut.register(
					commandManager,
					commands
				)
			),
	};

	const selectionCommandManager =
		new SelectionCommandManager(
			model,
			commandManager
		);

	const selectionShortcut = {
		register: commands => {
			disposable.add(
				shortcut.register(
					selectionCommandManager,
					commands
				)
			);
		}
	};

	return host => {
		host.head = new HeadLet(plugin, selectors.th);
		host.body = new BodyLet(plugin);
		host.foot = new FootLet(plugin);
		host.row = new RowLet(plugin, selectors.tr);
		host.layout = new LayoutLet(plugin);
		host.scroll = new ScrollLet(plugin, vscroll);
		host.highlight = new HighlightLet(plugin);
		host.sort = new SortLet(plugin);
		host.pagination = new PaginationLet(plugin);
		host.nav = new NavigationLet(plugin, navigationShortcut);
		host.group = new GroupLet(plugin, navigationShortcut);
		host.edit = new EditLet(plugin, navigationShortcut);
		host.filter = new FilterLet(plugin);
		host.rowDetails = new RowDetailsLet(plugin, navigationShortcut);
		host.selection = new SelectionLet(plugin, selectionShortcut);
		host.style = new StyleLet(plugin);
		host.clipboard = new ClipboardLet(plugin, navigationShortcut);
	};
}

class ViewHost {
  constructor(plugin) {
    this.plugin = plugin;

    this.watch(plugin.service);
    this.final = final();

    // todo: make the logic based on mouse state
    this.startCell = null;
  }

  invalidate() {
    this.final(() => {
      const { view } = this.plugin;
      const { style } = view;

      if (style.needInvalidate()) {
        const rowMonitor = style.monitor.row;
        const cellMonitor = style.monitor.cell;

        Fastdom.mutate(() => {
          // Apply mutate inside another mutate to ensure that style.invalidate is triggered last.
          Fastdom.mutate(() => {
            const domCell = cellMonitor.enter();
            const domRow = rowMonitor.enter();
            try {
              style.invalidate(domCell, domRow);
            }
            finally {
              rowMonitor.exit();
              cellMonitor.exit();
            }
          });
        });
      }
    });
  }

  triggerLine(service, timeout) {
    const { model } = this.plugin;
    const { reduce } = model.pipe();

    let session = [];
    const job = jobLine(timeout);
    return (source, changes, units) => {
      model.scene({ status: 'start' }, {
        source
      });

      session.push(...units);
      job(() => {
        const units = reduce(session, model);
        session = [];

        units.forEach(pipe =>
          service.invalidate({
            source,
            changes,
            pipe,
            why: pipe.why || 'refresh'
          })
        );
      });
    };
  }

  watch(service) {
    const { model, observeReply } = this.plugin;    const { triggers } = model.pipe();
    const { pipe } = model.data();

    const triggerJob = this.triggerLine(service, 10);
    if (pipe !== PipeUnit.default) {
      triggerJob('grid', {}, [pipe]);
    }

    Object.keys(triggers)
      .forEach(name =>
        observeReply(model[name + 'Changed'])
          .subscribe(e => {
            if (e.tag.behavior === 'core') {
              return;
            }

            const units = [];
            const trigger = triggers[name];
            for (const key in e.changes) {
              const unit = trigger[key];
              if (unit) {
                units.push(unit);
              }
            }

            if (units.length > 0) {
              triggerJob(e.tag.source || name, e.changes, units);
            }
          }));
  }

  mouseDown(e) {
    const { model, view } = this.plugin;
    const { edit } = model;

    const td = this.findCell(e);

    model.mouse({
      code: stringify(getButtonCode(e)),
      status: 'down',
      target: td
    }, {
      source: 'mouse.down'
    });

    if (checkButtonCode(e, LEFT_BUTTON)) {
      const { area, mode } = this.selection;

      if (td) {
        const fromNotEditMode = edit().status === 'view';

        this.navigate(td);
        if (area === 'body') {
          this.select(td);
        }

        if (fromNotEditMode && view.edit.cell.enter.canExecute(td)) {
          view.edit.cell.enter.execute(td);
        }

        if (mode === 'range' && td.column.type !== 'select') {
          this.startCell = td;
          view.selection.selectRange(td, null, 'body');
        }
      }
    }
  }

  mouseUp(e) {
    const { model } = this.plugin;
    const { edit } = model;

    const td = this.findCell(e);

    this.startCell = null;

    model.mouse({
      code: stringify(getButtonCode(e)),
      status: 'up',
      target: td,
    }, {
      source: 'mouse.up'
    });

    if (checkButtonCode(e, LEFT_BUTTON)) {
      if (edit().status === 'startBatch') {
        edit({ status: 'endBatch' }, { source: 'body.ctrl' });
      }
    }

    model.mouse({
      code: stringify(NO_BUTTON),
      status: 'release',
      target: null,
      timestamp: Date.now(),
    }, {
      source: 'mouse.up'
    });
  }

  mouseMove(e) {
    const { model, view } = this.plugin;
    const { highlight } = view;
    const { rows, cell } = model.highlight();

    const td = this.findCell(e);
    if (td) {

      if (cell) {
        highlight.cell.execute(cell, false);
      }

      const newCell = {
        rowIndex: td.rowIndex,
        columnIndex: td.columnIndex
      };

      model.mouse({
        status: 'move',
        target: cell || newCell
      }, {
        source: 'mouse.move'
      });

      if (highlight.cell.canExecute(newCell)) {
        highlight.cell.execute(newCell, true);
      }

      const tr = this.findRow(e);
      if (tr) {
        const { index } = tr;

        if (highlight.row.canExecute(index)) {
          rows
            .filter(i => i !== index)
            .forEach(i => highlight.row.execute(i, false));

          highlight.row.execute(index, true);
        }
      }

      if (checkButtonCode(e, LEFT_BUTTON)) {
        if (this.selection.mode === 'range') {
          const startCell = this.startCell;
          const endCell = td;

          if (startCell && endCell) {
            this.navigate(endCell);
            view.selection.selectRange(startCell, endCell, 'body');
          }
        }
      }

    } else {
      model.mouse({
        status: 'move',
        target: null,
      }, {
        source: 'mouse.move'
      });
    }
  }

  mouseEnter(e) {
    const { model } = this.plugin;
    model.mouse({
      status: 'enter',
      target: null,
      code: null
    }, {
      source: 'mouse.enter'
    });
  }

  mouseLeave() {
    const { model } = this.plugin;

    model.mouse({
      status: 'leave',
      target: null,
      code: null
    }, {
      source: 'mouse.leave'
    });

    this.clearHighlight();
  }

  select(cell) {
    const { area, mode, unit } = this.selection;
    if (cell.column.type !== 'select' && (area !== 'body' || mode === 'range')) {
      return;
    }

    const { model, view } = this.plugin;
    const editMode = model.edit().mode;
    switch (unit) {
      case 'row': {
        if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
          const focusState = model.focus();
          if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
            if (view.selection.toggleRow.canExecute(cell.row)) {
              view.selection.toggleRow.execute(cell.row, 'body');
            }
          }
        } else if (!editMode && cell.column.category !== 'control') {
          if (view.selection.toggleRow.canExecute(cell.row)) {
            view.selection.toggleRow.execute(cell.row, 'body');
          }
        }

        break;
      }

      case 'column': {
        if (!editMode) {
          view.selection.toggleColumn.execute(cell.column, 'body');
        }

        break;
      }

      case 'mix': {
        if (cell.column.type === 'row-indicator') {
          view.selection.toggleCell.execute(cell, 'body');
        }

        break;
      }
    }
  }

  navigate(cell) {
    const { view } = this.plugin;
    const { focus } = view.nav;

    if (focus.canExecute(cell)) {
      focus.execute(cell);
    }
  }

  findCell(e) {
    const { table } = this.plugin;
    const pathFinder = new PathService(table.box.bag.body);
    const path = eventPath(e);

    let td = pathFinder.cell(path);
    if (!td) {
      const firstElement = path[0];
      const isEditMarker =
        firstElement
        && firstElement.classList.contains('q-grid-edit-marker');

      if (isEditMarker) {
        const { model } = this.plugin;
        const { rowIndex, columnIndex } = model.focus();
        td = table.body.cell(rowIndex, columnIndex).model();
      }
    }

    return td;
  }

  findRow(e) {
    const { table } = this.plugin;
    const pathFinder = new PathService(table.box.bag.body);
    const path = eventPath(e);
    return pathFinder.row(path);
  }

  clearHighlight() {
    const { view } = this.plugin;
    const { highlight } = view;
    if (highlight.clear.canExecute()) {
      highlight.clear.execute();
    }
  }

  get selection() {
    const { model } = this.plugin;
    return model.selection();
  }
}

export { Action, ActionState, Aggregation, AnimationState, ArrayColumn, ArrayColumnModel, Bag, Body, BodyHost, BodyLet, BodyState, BoolColumn, BoolColumnModel, Box, BoxHost, Cache, CacheStrategy, Cell, CellBox, CellEditor, CellSelector, CharReader, ClipboardLet, ClipboardState, CohortColumn, CohortColumnModel, Column, ColumnBox, ColumnListHost, ColumnListState, ColumnModel, ColumnView, Command, CommandKey, CommandManager, Composite, CompositeCommandManager, Container, CsvExport, CsvImport, CurrencyColumn, CurrencyColumnModel, Data, DataColumnModel, DataRow, DataState, DateColumn, DateColumnModel, DateTimeColumn, DateTimeColumnModel, Defer, DetailsRow, Disposable, DragService, DragState, EditCellLet, EditLet, EditRowLet, EditService, EditState, Element, EmailColumn, EmailColumnModel, EnumerableResource, Event, EventListener, EventManager, ExportState, FakeClassList, FakeElement, FakeLayer, FakeTable, Fastdom, Fetch, FetchState, FileColumn, FileColumnModel, FilterLet, FilterRowColumn, FilterRowColumnModel, FilterState, FocusAfterRenderService, FocusService, FocusState, Foot, FootLet, FootState, FormatService, GRID_PREFIX, GridError, GridHost, GridService, GridState, GroupColumn, GroupColumnModel, GroupLet, GroupState, GroupSummaryColumn, GroupSummaryColumnModel, Guard, Head, HeadHost, HeadLet, HeadState, HighlightLet, HighlightState, IdColumn, IdColumnModel, ImageColumn, ImageColumnModel, ImportState, JsonExport, JsonImport, Keyboard, KeyboardState, LEFT_BUTTON, LayerState, LayoutLet, LayoutState, Lazy, Log, MIDDLE_BUTTON, MarkupVisitor, Matrix, Middleware, Model, ModelBinder, ModelBuilder, MouseState, MultipleSelectionState, NO_BUTTON, Navigation, NavigationLet, NavigationState, Node, NodeRow, NumberColumn, NumberColumnModel, ObservableEvent, ObservableReplyEvent, Operator, PadColumn, PadColumnModel, PaginationLet, PaginationState, PasswordColumn, PasswordColumnModel, PathService, PersistenceService, PersistenceState, PersistenceStorage, Pipe, PipeState, PipeUnit, PivotColumn, PivotColumnModel, PivotRow, PivotState, PluginService, PluginState, PredicateVisitor, ProgressState, RIGHT_BUTTON, Range, RangeSelectionState, ReferenceColumn, ReferenceColumnModel, Renderer, Resource, RestState, Row, RowBox, RowDetails, RowDetailsColumn, RowDetailsColumnModel, RowDetailsLet, RowDetailsStatus, RowEditor, RowExpandColumn, RowExpandColumnModel, RowIndicatorColumn, RowIndicatorColumnModel, RowLet, RowListState, RowNumberColumn, RowNumberColumnModel, RowOptionsColumn, RowOptionsColumnModel, RowState, Scene, SceneState, ScrollLet, ScrollState, SelectColumn, SelectColumnModel, SelectionCommandManager, SelectionLet, SelectionRange, SelectionService, SelectionState, Selector, SelectorCache, SelectorFactory, SelectorMark, SelectorMediator, Shortcut, ShortcutDispatcher, SingleOnlySelectionState, SingleSelectionState, SortLet, SortState, StyleBox, StyleEntry, StyleLet, StyleMonitor, StyleService, StyleState, SubSelectionState, SubjectLike, Table, TableCommandManager, Td, TemplatePath, TemplateState, TextColumn, TextColumnModel, TextSelection, TimeColumn, TimeColumnModel, ToolbarState, Tr, TrContainer, Unit, UnitFactory, UnsubscribableLike, UrlColumn, UrlColumnModel, ValidationState, View, ViewHost, ViewState, VirtualBody, VirtualBox, VirtualCell, VirtualCellStyle, VirtualColumn, VirtualElement, VirtualRow, VirtualRowStyle, VisibilityState, Visitor, XmlExport, XmlImport, alphaTitle, animationPipe, bend, binarySearch, bodyCellClassifier, build$1 as build, buildExpression, buildFromModel, buildLines, buildPivot, calk, castFactory, checkButtonCode, collapse, columnFactory, columnIndexPipe, columnIndexPipeUnit, columnPipe, columnPipeUnit, commandKey, compare, compareParseFactory, compile$1 as compile, compileGet, compileSet, copy, copyToClipboard, createValidator, css, dataPipe, defaultPipeUnit, deserialize, elementFromPoint, escape$2 as escape, escapeAttr, escapeRegexp, eventPath, expand, factory, filter$1 as filter, filterNode, filterPipe, final, findColumn, findFirstLeaf, findIndex, findLeaves, findLine, findNode, findType, firstRowTitle, flatView, flattenColumns, flattenFactory, flattenRows, generate, generateCommandKey, generateFactory, getButtonCode, getCellValue, getDirection, getIndex, getKey, getLabel, getLabelFactory, getMap, getType$1 as getType, getTypeName, getValue$1 as getValue, getValueFactory, graphFlatView, groupBuilder, groupPipe, groupPipeUnit, guid, hasRules, headCellClassifier, htmlEncode, identity, index, inferType, invalidateStatus, isEmail, isFileAnImage, isImage, isPrimitive, isUrl, jobLine, key, lineView, map, mapColumns, match, matchISO8601, memoPipe, merge$1 as merge, mergeTree, modelFactory, no, nodeBuilder, noop, numericTitle, orderBy, orderFactory, paginationPipe, parents, parseFactory, pivot, pivotForm, pivotPipe, preOrderDFS, predicateFactory, resolveType, rowDetailsPipeUnit, rowPipeUnit, scenePipe, scenePipeUnit, selectColumn, selectColumnIndex, selectRow, selectRowIndex, selectionStateFactory, serialize, serializeGet, serializePost, setLabel, setValue, sheet, sortFactory, sortIndexFactory, sortPipe, stringify, stringifyFactory, tableFactory, takeOnce, toCamelCase, toggleStatus, upload, value, viewFactory, viewPipe, viewPipeUnit, widthFactory, yes };
