export function final() {
    let isLocked = false;
    return f => {
        if (isLocked) {
            return;
        }

        isLocked = true;
        try {
            f();
        } finally {
            isLocked = false;
        }
    };
}