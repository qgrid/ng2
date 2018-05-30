# qgrid
Angular data grid

## examples
https://qgrid.github.io/ng2/

## installation
* `$ npm install ng2-qgrid`

* add grid and theme modules to your app module
```javascript
import { GridModule, ThemeModule } from 'ng2-qgrid';

@NgModule({
   imports: [
      GridModule,
      ThemeModule
   ]
})
export class AppModule {
}
```

* add grid model and grid service to your component if it's required
```javascript
import { GridModel, GridService } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
   public gridModel: GridModel;

   constructor(gridService: GridService) {
      this.gridModel = gridService.model();
   }

   ngOnInit(): void {
      this.gridModel
         .data({
            rows: getRows()
         });
   }
}
```

* add html markup to your component
```html
<q-grid [model]="gridModel">
   <q-grid-columns generation="deep">
      <q-grid-column type="number" aggregation="sum"></q-grid-column>
      <q-grid-column key="totalAmount" type="currency" aggregation="sum"></q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Development
### run project
* `git clone https://github.com/qgrid/ng2.git`
* `npm install`
* `npm run start`

## licence
Code licensed under MIT license.