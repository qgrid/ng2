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
});
