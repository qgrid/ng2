import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I click folder button [{int}]', (index: number) => clickFolderButton(index));

function clickFolderButton(index) {
	return element.all(by.xpath("//*[contains(text(),'folder')]")).get(index).click();
}