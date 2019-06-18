import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I click options cell [{int}]', (index: number) => clickSelectedOptionsCell(index));

function clickSelectedOptionsCell(index) {
	const tr = element.all(by.tagName('tbody'))
		.get(1)
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	return tr.element(by.css(`.q-grid-the-rowOptions`)).click();
}
