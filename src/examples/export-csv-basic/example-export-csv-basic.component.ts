import { Component } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'example-export-csv-basic',
	templateUrl: 'example-export-csv-basic.component.html',
	styleUrls: [ 'example-export-csv-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleExportCsvBasicComponent {
}

