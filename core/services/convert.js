import {identity, isObject, isArray, isBoolean, isEmail, isString} from '../utility';
import * as momentjs from 'moment';

const moment = momentjs.default;

export function getMoment() {
	return moment;
}

export function parseFactory(type) {
	switch (type) {
		case 'text':
		case 'email':
		case 'url':
		case 'password':
			return parseText;
		case 'number':
		case 'currency':
			return parseNumber;
		case 'time':
			return parseTime;
		case 'date':
			return parseDate;
		case 'bool':
			return parseBool;
		case 'array':
			return parseArray;
		default:
			return identity;
	}
}

export function getType(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = getType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (parseNumber(value) !== null && !isNaN(value)) {
		return 'number';
	}

	if (parseBool(value) !== null) {
		return 'bool';
	}

	if (parseDate(value) !== null) {
		return 'date';
	}

	if (parseTime(value) !== null) {
		return 'time';
	}

	if (isEmail(value)) {
		return 'email';
	}

	if (isString(value)) {
		return 'text';
	}

	if (isObject(value)) {
		return 'object';
	}

	return 'text';
}

export function isPrimitive(type) {
	switch (type) {
		case 'date':
		case 'time':
		case 'bool':
		case 'text':
		case 'number':
		case 'email':
		case 'url':
			return true;
		default:
			return false;
	}
}

function parseBool(value) {
	return isBoolean(value)
		? value
		: value === 'true'
			? true
			: value === 'false'
				? false
				: null;
}

function parseText(value) {
	return value !== null
		? '' + value
		: null;
}

function parseDate(value) {
	if (value === null) {
		return null;
	}

	if (value instanceof Date) {
		return value;
	}

	value = '' + value;
	const m = value.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/);
	if (m) {
		const utc = Date.UTC(
			m[1],
			m[3] ? m[3] - 1 : 0,
			m[5] || 1,
			m[7] || 0,
			m[8] || 0,
			m[10] || 0,
			m[12] ? Number('0.' + m[12]) * 1000 : 0
		);
		const date = new Date(utc);
		if (m[13]) { // has gmt offset or Z
			if (m[14]) { // has gmt offset
				date.setUTCMinutes(
					date.getUTCMinutes() +
					(m[15] == '-' ? 1 : -1) * (Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0))
				);
			}
		}
		return date;
	}

	return null;
}

function parseTime(testStr) {

	var mdate = moment(testStr, 'HH:mm:ss', true);
	
	if(!mdate.isValid()){
		return null;
	}
	return mdate.toDate();
}
	
function parseTime000(testStr, regex) { 
    if (!testStr || typeof(testStr) !== 'string') {
		return null;
	}

	const regexHhMmTest =  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
	const regexHhMm =  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/i;

	const regAmPmTest = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/;
	const regexAmPm =  /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;

	if (!regex){
		return parseTime(testStr, regexHhMm)
	}

	if (regex === regexHhMm && !regexHhMmTest.test(testStr)){
		return parseTime(testStr, regexAmPm)
	} else if (regex === regexAmPm && !regexAmPmTest.test(testStr)) {
			return null;
	}

    var time = testStr.match(regex); 
	
	if (time == null) {
		if(regex === regexHhMm) {
			return parseTime(testStr, regAmPm)
		}
		return null;
	}

    var hours = parseInt(time[1],10);    
    if (hours == 12 && !time[4]) {
          hours = 0;
    }
    else {
        hours += (hours < 12 && time[4])? 12 : 0;
    }   
    var d = new Date();             
    d.setHours(hours);
    d.setMinutes(parseInt(time[3],10) || 0);
    d.setSeconds(0, 0);  
    return d;
}

function validateHhMm(inputField) {
	var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);

	if (isValid) {
		inputField.style.backgroundColor = '#bfa';
	} else {
		inputField.style.backgroundColor = '#fba';
	}

	return isValid;
}

function parseNumber(value) {
	const number = parseFloat(value);
	if (!isNaN(number) && isFinite(number)) {
		return number;
	}

	return null;
}

function parseArray(value) {
	if (isArray(value)) {
		return value;
	}

	return null;
}