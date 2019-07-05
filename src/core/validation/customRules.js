const required = {
    name: 'required',
    rules: 'required',
    error: `Can't be empty`,
};

const positive_integer = {
    name: 'positive_integer',
    rules: 'positive_integer',
    error: 'Must be a positive integer',
}

const positive_decimal = {
    name: 'positive_decimal',
    rules: 'positive_decimal',
    error: 'Must be a positive decimal',
}

const url = {
    name: 'url',
    rules: 'url',
    error: 'Must be a url',
}

const not_empty_list = {
    name: 'not_empty_list',
    rules: 'not_empty_list',
    error: `Can't be empty`,
}

const any_object = {
    name: 'any_object',
    rules: 'any_object',
    error: 'Must be a object',
}

const integer = {
    name: 'integer',
    rules: 'integer',
    error: 'Must be an integer',
}

const decimal = {
    name: 'decimal',
    rules: 'decimal',
    error: 'Must be a decimal',
}

const email = {
    name: 'email',
    rules: 'email',
    error: 'Must be a email',
}

const iso_date = {
    name: 'iso_date',
    rules: 'iso_date',
    error: 'Must be a date',
}

const string = {
    name: 'string',
    rules: 'string',
    error: 'Must be a string',
}


function max_number(maxNumber) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;
        if (isNaN(+value)) return 'Must be a number';

        if (+value > +maxNumber) return `Must be < ${maxNumber}`;
        outputArr.push(+value);
    };
}

function min_number(minNumber) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;
        if (isNaN(+value)) return 'Must be a number';

        if (+value < +minNumber) return `Must be > ${minNumber}`;
        outputArr.push(+value);
    };
}

function length_between(minLength, maxLength) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        value += '';
        if (value.length < minLength || value.length > maxLength) return `Length must be [${minLength}, ${maxLength}]`;
        outputArr.push(value);
    };
}

function one_of(allowedValues) {
    if (!Array.isArray(allowedValues)) {
        allowedValues = Array.prototype.slice.call(arguments);
        allowedValues.pop();
    }

    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        for (const allowedValue of allowedValues) {
            if (value + '' === allowedValue + '') {
                outputArr.push(allowedValue);
                return;
            }
        }

        return `One of [${allowedValues}]`;
    };
}

function like(reStr, flags) {
    const isIgnoreCase = arguments.length === 3 && flags.match('i');
    const re = new RegExp(reStr, isIgnoreCase ? 'i' : '');

    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        value += '';
        if (!value.match(re)) return 'Must match the pattern';
        outputArr.push(value);
    };
}

function equal_to_field(field) {
    return (value, params) => {
        if (value === undefined || value === null || value === '') return;

        if (value != params[field]) return `Field must be equal '${field}'`;
        return;
    };
}

function length_equal(length) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        value += '';
        if (value.length != length) return `Length must be equal to ${length}`;
        outputArr.push(value);
    };
}

function eq(allowedValue) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        if (value + '' === allowedValue + '') {
            outputArr.push(allowedValue);
            return;
        }

        return `Must be equal to '${allowedValue}'`;
    };
}
function max_length(maxLength) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        value += '';
        if (value.length > maxLength) return `Length must be < ${maxLength}`;
        outputArr.push(value);
    };
}

function min_length(minLength) {
    return (value, params, outputArr) => {
        if (value === undefined || value === null || value === '') return;

        value += '';
        if (value.length < minLength) return `Length must be > ${minLength}`;
        outputArr.push(value);
    };
}

const aliasedRules = {
    required,
    positive_integer,
    positive_decimal,
    url,
    not_empty_list,
    any_object,
    integer,
    decimal,
    email,
    iso_date,
    string
}
const customRules = {
    max_number: max_number,
    min_number: min_number,
    length_between: length_between,
    one_of: one_of,
    like: like,
    equal_to_field: equal_to_field,
    length_equal: length_equal,
    eq: eq,
    max_length: max_length,
    min_length: min_length
}

export { aliasedRules, customRules };