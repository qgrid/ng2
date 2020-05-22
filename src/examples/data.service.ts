import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export class Human {
	id: number;
	contact: { email: string[] };
	password: string;
	comment: string;
	likes: string[];
	gender: 'male' | 'female';
	birthday: string;
	memberSince: string;
	name: {
		first: string,
		last: string
	};
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

export class Quote {
	metal: string;
	ldn1: string;
	bid: number;
	ask: number;
	ldn2: string;
	previous: number;
	last: number;
	ldn3: string;
	high: number;
	low: number;
	volume: number;
	settle: number;
	ldn4: string;
}

@Injectable()
export class DataService {
	constructor(private http: HttpClient) { }

	getPeople(count: string | number = 100): Observable<Human[]> {
		return this.http.get<Human[]>(`assets/people/${count}.json`);
	}

	getPresets(): Observable<any> {
		return this.http.get('assets/presets/1.json');
	}

	getAtoms(): Observable<Atom[]> {
		return this.http.get<Atom[]>(`assets/atoms/118.json`);
	}

	getQuotes(): Observable<Quote[]> {
		return this.http.get<Quote[]>(`assets/quotes/9.json`);
	}

	getAtomPresets(id, user): Observable<any> {
		const commonPresets = this.http.get<any[]>('assets/presets/atoms.json');
		const items = JSON.parse(localStorage.getItem(id));
		if (items && items.hasOwnProperty(user)) {
			return combineLatest(
				commonPresets,
				of(items[user] as any[])
			).pipe(
				map((...lists) => lists.reduce((memo, list) => memo.concat(list), []))
			);
		}
		return commonPresets;
	}

	setAtomPresets(id, user, items): Observable<any> {
		const oldItems = JSON.parse(localStorage.getItem(id));
		const newItems = {
			...oldItems,
			...{ [user]: items }
		};
		localStorage.setItem(id, JSON.stringify(newItems));
		return of(newItems[user]);
	}

	getUsers(): Observable<string[]> {
		return of(['user1', 'user2']);
	}
}
