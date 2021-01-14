import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I click load button', () => click('refresh'));
When('I click clear button', () => click('clear_all'));
When('I scroll page right [{int}]', async (num: number) =>
	scrollElementHorizontalOnValue(
		await element.all(by.tagName('tbody')).get(0).getWebElement(),
		num
	)
);
When('I scroll page left [{int}]', async (num: number) =>
	scrollElementHorizontalOnValue(
		await element.all(by.tagName('tbody')).get(0).getWebElement(),
		-num
	)
);
When('I sort column {string} downwards', async (col: string) =>
	sortColumnDownwards(col)
);

function click(text) {
	return element(by.buttonText(text)).click();
}

async function scrollElementHorizontalOnValue(elem, crement) {
	browser.executeScript('arguments[0].scrollLeft = arguments[0].scrollLeft + arguments[1]', elem, crement);
}

async function sortColumnDownwards(col) {
	return element(by.xpath('//label[contains(text(), \'' + col + '\')]/../mat-icon[contains(text(), \'arrow_downward\')]')).click();
}
