import { HighlightPipe } from './highlight.pipe';

describe('Pipe: HighlightPipe', () => {
	let pipe: HighlightPipe;

	beforeEach(() => {
		pipe = new HighlightPipe();
	});

	it('should wrap specified string with `q-grid-highlight-part` class', () => {
		expect(pipe.transform('addhighlightclass', 'highlight'))
			.toBe('add<span class="q-grid-highlight-part">highlight</span>class');
	});

	it('text & search = 0 case', () => {
		expect(pipe.transform(0, 0))
			.toBe('<span class="q-grid-highlight-part">0</span>');
	});
	
	it('text & search = null case', () => {
		expect(pipe.transform(null, null))
			.toBe('null');
	});
	
	it('text & search = undefined case', () => {
		expect(pipe.transform(undefined, undefined))
			.toBe('undefined');
	});
});
