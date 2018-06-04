function generateExampleModule(exampleName) {
	const baseName = exampleName
		.split('-')
		.map(s => capitalize(s))
		.join('');
	const exampleComponentName = `Example${baseName}Component`;

	return `import { CommonModule } from '@angular/common';
import { Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';

import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ${exampleComponentName} } from './example/example-${exampleName}.component';


@NgModule({
	declarations: [${exampleComponentName}],
	bootstrap: [${exampleComponentName}],
	imports: [
		GridModule,
		ThemeModule,
		CommonModule,
		MatButtonModule,
		MatSelectModule
	]
})
export class ExampleModule {
	ngDoBootstrap() {}
}`;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = generateExampleModule;
