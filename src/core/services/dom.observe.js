import {Event} from '../infrastructure';

export function children(element) {
	const event = new Event();

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.removedNodes.length || mutation.addedNodes.length) {
				event.emit({
					removed: mutation.removedNodes,
					added: mutation.addedNodes
				});
			}
		});
	});

	const config = {
		childList: true,
		subtree: true
	};

	observer.observe(element, config);

	return {
		on: f => event.on(f)
	};
}

export function style(element) {
	const event = new Event();

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.attributeName) {
				event.emit({
					oldValue: mutation.oldValue,
					newValue: mutation.target.style
				});
			}
		});
	});

	const config = {
		attributes: true,
		attributeOldValue: true,
		attributeFilter: ['style']
	};

	observer.observe(element, config);

	return {
		on: f => event.on(f)
	};
}

export function className(element) {
	const event = new Event();

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.attributeName) {
				event.emit({
					oldValue: mutation.oldValue,
					newValue: Array.from(mutation.target.classList).join(' ')
				});
			}
		});
	});

	const config = {
		attributes: true,
		attributeOldValue: true,
		attributeFilter: ['class']
	};

	observer.observe(element, config);

	return {
		on: f => event.on(f)
	};
}
