import { When } from 'cucumber';
import {element, by, browser, protractor} from 'protractor';


When('I enter {string} and {string}', (date1: string, date2: string) => betweenDates(date1, date2));

function betweenDates(date1, date2) {
	const input1 = element.all(by.className('mat-input-element')).get(1);
	input1.clear();
	input1.sendKeys(date1, protractor.Key.ENTER);
	const input2 = element.all(by.className('mat-input-element')).get(2);
	input2.clear();
	input2.sendKeys(date2, protractor.Key.ENTER);
}
