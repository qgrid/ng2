import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I select {string} value', (text: string) => selectElementFromReferences(text));

function selectElementFromReferences(text) {
	element(by.xpath('//mat-card-content//tbody//*[contains(text(), \'' + text + '\')]')).click();
}
