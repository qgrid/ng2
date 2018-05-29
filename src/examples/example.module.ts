import { CommonModule } from '@angular/common';
import { Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

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
import { ExamplePluginGridBasicComponent } from './plugin-grid-basic/example-plugin-grid-basic.component';
import { ExamplePluginMyPagerComponent } from './plugin-grid-basic/example-plugin-my-pager.component';
import { ExampleActionBarBasicComponent } from './action-bar-basic/example-action-bar-basic.component';
import { ExampleDetailsRowBasicComponent } from './details-row-basic/example-details-row-basic.component';
import { ExampleDragRowBasicComponent } from './drag-row-basic/example-drag-row-basic.component';
import { ExampleDragColumnBasicComponent } from './drag-column-basic/example-drag-column-basic.component';
import { ExampleEditCellBatchComponent } from './edit-cell-batch/example-edit-cell-batch.component';
import { ExampleFilterConditionBasicComponent } from './filter-condition-basic/example-filter-condition-basic.component';
import { ExampleFilterRowBasicComponent } from './filter-row-basic/example-filter-row-basic.component';
import { ExampleFocusCellAutoComponent } from './focus-cell-auto/example-focus-cell-auto.component';
import { ExamplePersistenceBasicComponent } from './persistence-basic/example-persistence-basic.component';
import { ExamplePaginationBasicComponent } from './pagination-basic/example-pagination-basic.component';
import { ExamplePinColumnBasicComponent } from './pin-column-basic/example-pin-column-basic.component';
import { ExamplePivotColumnBasicComponent } from './pivot-column-basic/example-pivot-column-basic.component';

const EXAMPLES: Array<any> = [
    ExampleLookPeopleBasicComponent,
    ExampleLookAtomsBasicComponent,
    ExampleLookPeopleModelComponent,
    ExampleLookAtomsModelComponent,
    ExampleLookAtomsCustomizedComponent,
    ExampleEditCellBasicComponent,
    ExampleEditCellBatchComponent,
    ExampleSelectRowBasicComponent,
    ExampleSelectCellBasicComponent,
    ExampleGroupRowBasicComponent,
    ExamplePivotColumnBasicComponent,
    ExampleSortRowComponent,
    ExampleStyleRowBasicComponent,
    ExampleManipulateDataBasicComponent,
    ExampleDragRowBasicComponent,
    ExampleDragColumnBasicComponent,
    ExampleActionBarBasicComponent,
    ExampleDetailsRowBasicComponent,
    ExamplePaginationBasicComponent,
    ExamplePinColumnBasicComponent,
    ExampleFilterConditionBasicComponent,
    ExampleFilterRowBasicComponent,
    ExampleFocusCellAutoComponent,
    ExamplePersistenceBasicComponent,
    ExamplePluginGridBasicComponent,
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
    declarations: EXAMPLES.concat([
        ExamplePluginMyPagerComponent
    ]),
    exports: EXAMPLES,
    imports: [
        GridModule,
        ThemeModule,
        CommonModule,
        MatButtonModule
    ]
})
export class ExampleModule { }