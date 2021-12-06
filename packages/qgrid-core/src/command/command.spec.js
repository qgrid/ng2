import {Command} from './command';

describe('Command', () => {
	it('should set default values', () => {
		let command = new Command();
		expect(command.execute()).to.be.true;
		expect(command.canExecute()).to.be.true;
	});
});