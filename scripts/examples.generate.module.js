function generateExampleModule(exampleName) {
	const baseName = exampleName
		.split('-')
		.map(s => capitalize(s))
		.join('');
	const componentName = `Example${baseName}Component`;

	return `import { CommonModule } from '@angular/common';
import { Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';

import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ${componentName} } from './example/example-${exampleName}.component';


@NgModule({
	declarations: [${componentName}],
	bootstrap: [${componentName}],
	imports: [
		GridModule,
		ThemeModule,
		CommonModule,
		FormsModule,
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
