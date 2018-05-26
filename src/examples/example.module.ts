import { CommonModule } from '@angular/common';
import { Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ExampleLookPeopleBasicComponent } from './look-people-basic/example-look-people-basic.component';
import { ExampleLookAtomsBasicComponent } from './look-atoms-basic/example-look-atoms-basic.component';
import { ExampleLookAtomsCustomizedComponent } from './look-atoms-customized/example-look-atoms-customized.component';
import { ExampleEditCellBasicComponent } from './edit-cell-basic/example-edit-cell-basic.component';
import { ExampleSelectRowBasicComponent } from './select-row-basic/example-select-row-basic.component';
import { ExampleSelectCellBasicComponent } from './select-cell-basic/example-select-cell-basic.component';
import { ExampleGroupRowBasicComponent } from './group-row-basic/example-group-row-basic.component';
import { ExampleSortRowComponent } from './sort-row-basic/example-sort-row.component';
import { ExampleDestroyGridBasicComponent } from './destroy-grid-basic/example-destroy-grid-basic.component';
import { ExampleDestroyGridModelComponent } from './destroy-grid-model/example-destroy-grid-model.component';
import { ExampleLookPeopleModelComponent } from './look-people-model/example-look-people-model.component';
import { ExampleLookAtomsModelComponent } from './look-atoms-model/example-look-atoms-model.component';
import { ExampleStyleRowBasicComponent } from './style-row-basic/example-style-row-basic.component';
import { ExampleManipulateDataBasicComponent } from './manipulate-data-basic/example-manipulate-data-basic.component';

const EXAMPLES = [    
    ExampleLookPeopleBasicComponent,
    ExampleLookAtomsBasicComponent,
    ExampleLookPeopleModelComponent,
    ExampleLookAtomsModelComponent,
    ExampleLookAtomsCustomizedComponent,
    ExampleEditCellBasicComponent,
    ExampleSelectRowBasicComponent,
    ExampleSelectCellBasicComponent,
    ExampleGroupRowBasicComponent,
    ExampleSortRowComponent,
    ExampleStyleRowBasicComponent,
    ExampleManipulateDataBasicComponent,
    ExampleDestroyGridBasicComponent,
    ExampleDestroyGridModelComponent
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