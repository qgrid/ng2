import { RowDetails } from './row.details';
import { invalidateStatus } from './row.details.service';
import { ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY } from '../command-bag/command.bag';

export class RowDetailsLet {
	constructor(plugin) {
		const { model, observeReply, disposable, commandPalette } = plugin;

		this.plugin = plugin;

		this.toggleStatus = commandPalette.get(ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY);

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.tag.source === 'row.details.let' ||
					e.tag.source === 'row.details.toggle.status.command') {
					return;
				}

				if (e.hasChanges('rows')) {
					const { status, mode } = model.row();
					const newStatus =
						invalidateStatus(
							model.data().rows,
							status,
							mode
						);

					model.row({
						status: newStatus
					}, {
						source: 'row.details.let'
					});
				}
			});

		let canExecuteCheckSub;
		const unsubscribeCanExecuteCheck = () => {
			if (canExecuteCheckSub) {
				canExecuteCheckSub.unsubscribe();
				canExecuteCheckSub = null;
			}
		};

		disposable.add(
			unsubscribeCanExecuteCheck
		);

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('toggle')) {
					const { toggle } = e.state;
					unsubscribeCanExecuteCheck();
					canExecuteCheckSub = toggle.canExecuteCheck
						.subscribe(() => {
							this.toggleStatus.canExecuteCheck.next();
						});
				}
			});
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const { model } = this.plugin;
		const { status } = model.row();

		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}