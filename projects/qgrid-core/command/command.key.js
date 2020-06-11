
export function commandKey(name) {
    return {
        name
    };
}

let seq = 0;
export function generateCommandKey() {
    return {
        name: `__generated_key_${seq++}`
    };
}
