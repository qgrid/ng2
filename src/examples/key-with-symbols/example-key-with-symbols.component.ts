import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'example-key-with-symbols',
	templateUrl: 'example-key-with-symbols.component.html',
	styleUrls: ['example-key-with-symbols.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleKeyWithSymbolsComponent {
	static id = 'key-with-symbols';

	rows = [{
		'key.With.Symbols': {
			'sub.Key.With."."': 'sub-key with dot',
			'sub.Key.With."@"': 'sub-key with "@"',
			'sub.Key.With.","': 'sub-key with ","',
			'sub.Key.With."!"': 'sub-key with "!"',
			'sub.Key.With."$"': 'sub-key with "$"',
			'sub.Key.With."?"': 'sub-key with "?"',
			'sub.Key.With."\'"': 'sub-key with "\'"',
			'sub.Key.With."^"': 'sub-key with "^"',
			'sub.Key.With.";"': 'sub-key with ";"',
			'sub.Key.With."#"': 'sub-key with "#"',
			'sub.Key.With."%"': 'sub-key with "%"'
		}
	}];
}
