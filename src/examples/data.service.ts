import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Human {
	id: number;
	contact: { email: string[] };
	password: string;
	comment: string;
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
}
