class Plan {
	constructor(schema) {
		this.isRoot = !arguments.length;
		this.current = this.schema = schema || {};
	}

	branch() {
		return new Plan(this.current);
	}

	cursor(name) {
		const schema = this.schema;
		this.current =
			schema.hasOwnProperty(name)
				? schema[name]
				: schema[name] = {};
	}

	compile(data) {
		if (this.isRoot) {
			return {
				schema: this.schema,
				data: data
			};
		}
		else {
			return data;
		}
	}
}

function factory(plan) {
	return name => {
		plan.cursor(name);
		return settings => {
			return pivot(settings, plan.branch());
		};
	};
}

export function pivot(settings, plan) {
	plan = plan || new Plan();

	const pivot = factory(plan);
	const aggregate = row => {
		return settings
			.selector(row)
			.reduce((memo, selection) => {
				const name = settings.name(selection);
				memo[name] = settings.value(selection, row, pivot(name));
				return memo;
			}, settings.factory(row));
	};

	return rows =>
		plan.compile(
			plan.isRoot
				? rows.map(aggregate)
				: aggregate(rows));
}