import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../../data/data.service';
import { GridService } from 'ng2-qgrid/index';

import * as fileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import * as pdf from 'jspdf';
import 'jspdf-autotable';

@Component({
	selector: 'home',
	providers: [],
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
	public rows: Human[] = [];
	public gridModel = null;

	constructor(public dataService: DataService, public gridService: GridService) {
		this.gridModel = gridService.model();
		const imports = {
			fileSaver,
			xlsx,
			pdf
		};
		this.gridModel
			.plugin({
				imports
			});
	}

	public ngOnInit() {
		this.dataService
			.getPeople(100)
			.map(humans => this.madeIsFeemaleField(humans))
			.map(humans => this.madeEmailSingleField(humans))
			.map(humans => this.madeTimeNowField(humans))
			.map(humans => this.madeWebPageField(humans))
			// .map(humans => this.madeAvatarField(humans))
			.subscribe(people => {
				this.rows = people;
			});
	}

	private madeTimeNowField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['timeNow'] = this.now;
		});
		return humans;
	}

	private madeWebPageField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['webPage'] = `https://corp.portal.com/${human.name.last}.${human.name.first}`;
		});
		return humans;
	}

	private madeAvatarField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['avatar'] = human['webPage'] + `/avatar.png`;
		});
		return humans;
	}

	private madeIsFeemaleField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['isFemail'] = human.gender === 'female';
		});
		return humans;
	}

	private madeEmailSingleField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			const emails: any[] = human.contact.email as any[];
			if (emails) {
				human.contact.singleEmail = emails.join(',');
			}
		});
		return humans;
	}

	private get now() {
		return new Date(new Date().getTime()).toLocaleTimeString('en-US', 
		{hour12: false, hour: '2-digit', minute: '2-digit', second: 'numeric'});
	}
}
