import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GridModule, ThemeModule } from 'ng2-qgrid';

import { ExampleEditCellBasicComponent } from '../examples/edit-cell-basic/example-edit-cell-basic.component';
import { ExampleFirstLookComponent } from './first-look/example-first-look.component';

export const exampleRoutes: Routes = [
    {
        path: 'example-first-look',
        component: ExampleFirstLookComponent
    },
    {
        path: 'example-edit-cell-basic',
        component: ExampleEditCellBasicComponent
    },
    {
        path: '',
        redirectTo: '/example-first-look',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        ExampleEditCellBasicComponent,
        ExampleFirstLookComponent
    ],
    imports: [
        GridModule,
        ThemeModule,
        CommonModule
    ],
    exports: [
        ExampleEditCellBasicComponent,
        ExampleFirstLookComponent        
    ]
})
export class ExampleModule { }