export function final() {
	let isLocked = false;
	return f => {
		if (isLocked) {
			return false;
		}

		isLocked = true;
		try {
			f();
			return true;
		} finally {
			isLocked = false;
		}
	};
}
