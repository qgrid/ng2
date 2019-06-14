import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I drag column {string} to column {string}', (elem, target) => dragElement(elem, target));

// DND doesn't work now
async function dragElement(elem, target) {
	const el = element(by.xpath(`//*[contains(text(),'" + elem + "')]/../..`));
	const trg = element(by.xpath(`//*[contains(text(),'" + target + "')]/../..`));
	browser.actions()
		.mouseMove(el.getWebElement(), { x: 0, y: 0 })
		.mouseDown()
		.mouseMove(el.getWebElement(), { x: 20, y: 20 })
		.mouseMove(trg.getWebElement(), { x: 5, y: 5 })
		.mouseUp()
		.perform();
}
