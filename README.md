# qgrid
Angular data grid

## examples
https://qgrid.github.io/ng2/

## installation
* `$ npm install ng2-qgrid`

* add grid and theme modules to your app module
```javascript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';

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
### sync examples with stackblitz
You have to run script to update stackblitz projects with examples. It will load content of src/examples to github repository in the separate branches which will be synced with stackblitz projects.

`npm run examples -- -v <version> -p <pattern> -s <silent>`

Available arguments:

* `-v`: Version of qgrid example. It will be added as suffix to example name (default: latest).
* `-p`: Pattern of examples what you'd like to load.
* `-s`: Silent mode to hide extra console output (default: true).

Examples:

* load all examples of 6.0.1 version:

`npm run examples -- 6.0.1`

* load basic example of persistence plugin of latest version and print all logs:

`npm run examples -- -p persistence-basic -s false`


## licence
Code licensed under MIT license.