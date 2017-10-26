import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../../data/data.service';
import { GridService } from 'ng2-qgrid/index';

import { getMoment } from 'ng2-qgrid/core/services';
import { Command } from 'ng2-qgrid/core/command';

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

	private moment = getMoment();

	private commitCommand = new Command({
		execute: e => {
			if (e.column.key === 'attachment' || e.column.key === 'avatar') {
				setTimeout(() => {
					const filename = e.newLabel;
					// $mdToast.show(
					// 	$mdToast.simple()
					// 		.textContent(`File ${filename} loaded`)
					// 		.position('top right')
					// 		.hideDelay(2000)
					// );
					e.column.value(e.row, `https://fake.data.server.com/attachment/${encodeURI(filename)}`);
				}, 1000);
			}
		}
	});

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
			.map(humans => this.madeAvatarField(humans))
			.map(humans => this.madeAttachementField(humans))
			.subscribe(people => {
				this.rows = people;
			});
	}

	private madeTimeNowField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['timeNow'] = this.moment().format('HH:mm:ss');
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
			human['avatar'] = null; // human['webPage'] + `/images/avatar.png`;
		});
		return humans;
	}

	private madeAttachementField(humans: Human[]): Human[] {
		humans.forEach((human: any) => {
			human['attachment'] = null; // human['webPage'] + `/attachment/`;
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
}
