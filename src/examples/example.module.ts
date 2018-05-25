import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ExampleFirstLookComponent } from './first-look/example-first-look.component';
import { ExampleEditCellBasicComponent } from './edit-cell-basic/example-edit-cell-basic.component';
import { ExampleSelectionRowBasicComponent } from './selection-row-basic/example-selection-row-basic.component';
import { ExampleGroupingBasicComponent } from './grouping-basic/example-grouping-basic.component';
import { ExampleSelectionCellBasicComponent } from 'examples/selection-cell-basic/example-selection-cell-basic.component';

export const exampleRoutes: Routes = [
    {
        path: '',
        redirectTo: '/example-first-look',
        pathMatch: 'full'
    },
    {
        path: 'example-first-look',
        component: ExampleFirstLookComponent
    },
    {
        path: 'example-edit-cell-basic',
        component: ExampleEditCellBasicComponent
    },
    {
        path: 'example-selection-row-basic',
        component: ExampleSelectionRowBasicComponent
    },
    {
        path: 'example-selection-cell-basic',
        component: ExampleSelectionCellBasicComponent
    },
    {
        path: 'example-grouping-basic',
        component: ExampleGroupingBasicComponent
    },

];

@NgModule({
    declarations: [
        ExampleEditCellBasicComponent,
        ExampleFirstLookComponent,
        ExampleSelectionRowBasicComponent,
        ExampleSelectionCellBasicComponent,
        ExampleGroupingBasicComponent
    ],
    imports: [
        GridModule,
        ThemeModule,
        CommonModule
    ],
    exports: [
        ExampleEditCellBasicComponent,
        ExampleFirstLookComponent,
        ExampleSelectionRowBasicComponent,
        ExampleSelectionCellBasicComponent,
        ExampleGroupingBasicComponent
    ]
})
export class ExampleModule { }