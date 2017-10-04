import { HighlightPipe } from './highlight.pipe';

describe('Pipe: HighlightPipe', () => {
	let pipe: HighlightPipe;

	beforeEach(() => {
		pipe = new HighlightPipe();
	});

	it('', () => {
		expect(pipe.transform('addhighlightclass', 'highlight'))
			.toBe('add<span class="q-grid-highlight-part">highlight</span>class');
	});
});
