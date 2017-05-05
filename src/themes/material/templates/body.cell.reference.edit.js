ReferenceEdit.$inject = ['$scope', 'qgrid'];
export default function ReferenceEdit($scope, qgrid) {
	this.cell = () => $scope.$editor || $scope.$view.edit.cell;

	let closed = false;
	const close = () => {
		if ($scope.$popup && !closed) {
			$scope.$popup.close();
			closed = true;
		}
	};

	const options = this.cell().options;
	this.gridModel = (options
		&& options.modelFactory
		&& options.modelFactory($scope.$view ? $scope.$view.model.navigation() : {}))
		|| qgrid.model();

	this.commit = ($cell, $event) => {
		this.cell().value = this.gridModel.selection().items;
		this.cell().commit.execute($cell, $event);
		close();
	};

	this.cancel = ($cell, $event) => {
		this.cell().cancel.execute($cell, $event);
		close();
	};

	$scope.$on('$destroy', () => {
		close();
	});
}