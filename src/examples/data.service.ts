import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Human {
	id: number;
	contact: { email: string[] };
	password: string;
	comment: string;
}

export class Atom {
	name: string;
	appearance: string;
	mass: number;
	boil: number;
	color: string;
	density: number;
	discoveredBy: string;
	melt: number;
	namedBy: string;
	number: number;
	period: number;
	phase: string;
	source: string;
	spectralImg: string;
	summary: string;
	symbol: string;
	shells: Array<number>;
	radius: number;
	discoveredIn: number;
	groupBlock: string;
	bondingType: string;
}

@Injectable()
export class DataService {
	constructor(private http: HttpClient) {
	}

	getPeople(count: string | number = 100): Observable<Human[]> {
		return this.http.get<Human[]>(`assets/people/${count}.json`);
	}

	getPresets(): Observable<any> {
		return this.http.get('assets/presets/1.json');
	}

	getAtoms(): Observable<Atom[]> {
		return this.http.get<Atom[]>(`assets/atoms/117.json`);			
	}
}
