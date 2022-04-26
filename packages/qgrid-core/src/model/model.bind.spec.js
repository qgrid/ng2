import { Event } from '../event/event';
import { ModelBinder } from './model.bind';

describe('ModelBinder', () => {
	const state = { prop: 'originValue' };
	const model = {
		state: value => {
			if (value) {
				Object.assign(state, value);
				return;
			}

			return state;
		},
		stateChanged: new Event(),
	};

	const modelNames = ['state'];

	const host = { stateProp: 'hostValue' };

	const modelBinder = new ModelBinder(host, { add: x => x });
	describe('bind', () => {
		it('commit should setup model property', () => {
			const commit = modelBinder.bound(model, modelNames, false, false);
			commit();
			expect(model.state().prop).to.equal('hostValue');
		});

		it('model property change should lead to host changes', () => {
			model.stateChanged.emit({
				changes: {
					prop: {
						newValue: 'hostValue',
						oldValue: model.state().prop,
					},
				},
			});

			expect(host.stateProp).to.equal('hostValue');
		});
	});
});
