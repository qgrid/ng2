import { Component } from '@angular/core';

@Component({
	selector: 'example-column-text-basic',
	templateUrl: 'example-column-text-basic.component.html',
	styleUrls: ['example-column-text-basic.component.scss']
})
export class ExampleColumnTextBasicComponent {
	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'maxLength2': 'PI',
			'textArea': 'Lorem ipsum dolor sit amet, ne facete legendos incorrupte duo, sea quot sapientem te, laudem repudiandae sit ne. Ut utinam ullamcorper quo. Odio quidam adolescens vim an, et quidam dolores pro. Semper malorum volumus mei id, utamur placerat volutpat ea pri, no ludus prompta lobortis mel. Quo in duis ferri, at atqui mandamus moderatius nec, eam inermis legendos at. Pro id habemus adipiscing, tibique prodesset ex mei.',
			'customTemplate': 'Hello World'
		}
	];
}