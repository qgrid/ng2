import { ModelBinder } from './model.bind';
import { Event } from './event';

describe('ModelBinder', () => {
	let state = { prop: 'originValue' };
	let model = {
		state: value => {
			if (value) {
				Object.assign(state, value);
				return;
			}

			return state;
		},
		stateChanged: new Event()
	};

	let modelNames = ['state'];

	let host = { stateProp: 'hostValue' };

	let modelBinder = new ModelBinder(host);
	describe('bind', () => {
		it('commit should setup model property', () => {
			const commit = modelBinder.bound(model, modelNames, false);
			commit();
			expect(model.state().prop).to.equal('hostValue');
		});

		it('model property change should lead to host changes', () => {
			model.stateChanged.emit({
				changes: {
					prop: {
						newValue: 'valueAfterEvent',
						oldValue: model.state().prop
					}
				}
			});

			expect(host.stateProp).to.equal('valueAfterEvent');
		});
	});
});
