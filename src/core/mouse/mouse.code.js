export const NO_BUTTON = 0;
export const LEFT_BUTTON = 1;
export const MIDDLE_BUTTON = 2;
export const RIGHT_BUTTON = 3;

export function checkButtonCode(event, code) {
    return getButtonCode(event) === code;
}

export function getButtonCode(event) {
    return event.which;
}

