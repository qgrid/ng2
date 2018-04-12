export function groupSchema() {
	return class GroupSchema {
		public plan: any[];

		constructor(public node, public line) {
			this.plan = [];
		}

		apply(group) {
			this.plan.forEach(p => p(this.node, this.line, group));
		}
	};
}
