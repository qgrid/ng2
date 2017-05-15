import {AppError} from '../infrastructure';

export function castFactory(r) {
	const rt = typeof r,
		asString = '' + r,
		asNumber = +r,
		asDate = new Date(r);

	return l => {
		const lt = typeof l;
		if (rt === lt) {
			return r;
		}

		switch (lt) {
			case 'number':
				return asNumber;
			case 'string':
				return asString;
			case 'date':
				return asDate;
			default:
				throw AppError(
					'cast.factory',
					`Unsupported format ${lt}`
				);
		}
	};
}