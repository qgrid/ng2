import { Command } from '../command';
import { Composite } from './composite';
import { identity, yes, no } from '../utility/kit';

describe('Composite', () => {
	describe('composite function', () => {
		it('should return function', () => {
			const func = Composite.func(() => {});
			expect(func).to.be.a('function');
		});

		it('should invoke functions', () => {
			const foo = chai.spy();
			Composite.func([foo])();
			expect(foo).to.have.been.called();
		});

		it('should pass arguments to functions', () => {
			const foo = chai.spy();
			Composite.func([foo])(1, 'two', {});
			expect(foo).to.have.been.called.with(1, 'two', {});
		});

		it('should reduce values', () => {
			const func = Composite.func(
				[() => 1, () => 2, () => 3],
				(memo, item) => memo + item
			);
			expect(func()).to.be.equal(6);
		});

		it('should use initial memo', () => {
			const func = Composite.func([identity], identity, 'Memo');
			expect(func()).to.be.equal('Memo');
		});
	});

	describe('composite command', () => {
		it('should reduce provided commands canExecute to false if all commands are falsy', () => {
			const command1 = new Command({
				canExecute: no
			});

			const command2 = new Command({
				canExecute: no
			});

			const command = Composite.command([command1, command2]);
			expect(command.canExecute()).to.be.equal(false);
		});

		it('should reduce provided commands canExecute to true if at least one command is truthy', () => {
			const command1 = new Command({
				canExecute: yes
			});

			const command2 = new Command({
				canExecute: no
			});

			const command = Composite.command([command1, command2]);
			expect(command.canExecute()).to.be.equal(true);
		});

		it('should pass arguments to all canExecute functions', () => {
			const spy1 = chai.spy(no);
			const spy2 = chai.spy(no);

			const command1 = new Command({
				canExecute: spy1
			});

			const command2 = new Command({
				canExecute: spy2
			});

			const command = Composite.command([command1, command2]);
			command.canExecute(1, 'two', {}, []);

			expect(spy1).to.have.been.called.with(1, 'two', {}, []);
			expect(spy2).to.have.been.called.with(1, 'two', {}, []);
		});

		it('should execute only commands that can be executed', () => {
			const spy1 = chai.spy();
			const spy2 = chai.spy();
			const spy3 = chai.spy();

			const command1 = new Command({
				canExecute: yes,
				execute: spy1
			});
			const command2 = new Command({
				canExecute: no,
				execute: spy2
			});
			const command3 = new Command({
				canExecute: yes,
				execute: spy3
			});

			const command = Composite.command([command1, command2, command3]);
			command.execute();

			expect(spy1).to.have.been.called();
			expect(spy2).not.to.have.been.called();
			expect(spy3).to.have.been.called();
		});

		it('should pass arguments to all canExecute on execution', () => {
			const spy1 = chai.spy();
			const spy2 = chai.spy();
			const spy3 = chai.spy();

			const command1 = new Command({
				canExecute: spy1
			});
			const command2 = new Command({
				canExecute: spy2
			});
			const command3 = new Command({
				canExecute: spy3
			});

			const command = Composite.command([command1, command2, command3]);
			command.execute(1, 'two', {}, []);

			expect(spy1).to.have.been.called.with(1, 'two', {}, []);
			expect(spy2).to.have.been.called.with(1, 'two', {}, []);
			expect(spy3).to.have.been.called.with(1, 'two', {}, []);
		});

		it('should pass arguments to all execute on execution', () => {
			const spy1 = chai.spy();
			const spy2 = chai.spy();
			const spy3 = chai.spy();

			const command1 = new Command({
				execute: spy1
			});
			const command2 = new Command({
				execute: spy2
			});
			const command3 = new Command({
				execute: spy3
			});

			const command = Composite.command([command1, command2, command3]);
			command.execute(1, 'two', {}, []);

			expect(spy1).to.have.been.called.with(1, 'two', {}, []);
			expect(spy2).to.have.been.called.with(1, 'two', {}, []);
			expect(spy3).to.have.been.called.with(1, 'two', {}, []);
		});
	});
});
