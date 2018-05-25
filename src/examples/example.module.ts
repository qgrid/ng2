import { CommonModule } from '@angular/common';
import { Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ExampleLookPeopleBasicComponent } from './look-people-basic/example-look-people-basic.component';
import { ExampleLookAtomsBasicComponent } from './look-atoms-basic/example-look-atoms-basic.component';
import { ExampleEditCellBasicComponent } from './edit-cell-basic/example-edit-cell-basic.component';
import { ExampleSelectRowBasicComponent } from './select-row-basic/example-select-row-basic.component';
import { ExampleSelectCellBasicComponent } from './select-cell-basic/example-select-cell-basic.component';
import { ExampleGroupRowBasicComponent } from './group-row-basic/example-group-row-basic.component';
import { ExampleSortRowComponent } from './sort-row-basic/example-sort-row.component';

const EXAMPLES = [    
    ExampleLookPeopleBasicComponent,
    ExampleLookAtomsBasicComponent,
    ExampleEditCellBasicComponent,
    ExampleSelectRowBasicComponent,
    ExampleSelectCellBasicComponent,
    ExampleGroupRowBasicComponent,
    ExampleSortRowComponent
];

const PATH_REGEX = /Example(.*)Component/;
function toPath(componentType: Function) {
    const name = PATH_REGEX.exec(componentType.name)[1];
    return name
        .split(/(?=[A-Z])/)
        .map(part => part.toLowerCase())
        .join('-');
}

export const exampleRoutes: Routes =
    EXAMPLES
        .map<Route>(example => ({
            path: toPath(example),
            component: example
        }))
        .concat([
            {
                path: '',
                redirectTo: toPath(ExampleLookPeopleBasicComponent),
                pathMatch: 'full'
            }
        ]);

@NgModule({
    declarations: EXAMPLES,
    exports: EXAMPLES,
    imports: [
        GridModule,
        ThemeModule,
        CommonModule
    ]
})
export class ExampleModule { }