import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I delete row by index[{int}]', (index) => getDeleteButton(index).click());

function getDeleteButton(index) {
	return element.all(by.xpath(`//*[(text()=' DELETE ROW ')]`)).get(index);
}