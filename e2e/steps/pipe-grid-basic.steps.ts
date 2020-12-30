import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I scroll bottom right corner', async () => scrollBottomRightCorner());

async function scrollBottomRightCorner() {
	await browser.sleep(1000);
	const rows = element(by.tagName(`tbody`))
		.all(by.css(`tr[q-grid-core-source=body]`));
	const cells = rows.get(await rows.count() - 1)
		.all(by.css(`td`));
	const el4MouseHover = cells.get(await cells.count() - 1);

	await browser.actions().mouseMove(el4MouseHover).perform();
}
