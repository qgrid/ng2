# q-grid
Angular data grid

## Documentation
https://qgrid.github.io

## Install the q-grid via npm

```bash
npm install ng2-qgrid
```

## Add q-grid and theme modules to application root

```typescript
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
Note that now q-grid supports 2 themes out of box `@angular/material` and `basic`, the second one doesn't require `@angular/material` to be installed.

## Create an angular component

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="myRows | async">
            <q-grid-columns generation="deep">
            </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   myRows: Observable<[]>;

   constructor(dataService: MyDataService) {
         this.myRows = dataService.getRows();
   }
}
```

Note that q-grid rows should be an array of objects, any other types like array of numbers or strings will throw an error.

## Dependencies

*  @angular/common
*  @angular/core
*  @angular/forms
*  @angular/http

If you use `material` theme from the q-grid package, you also need to install [angular material](https://material.angular.io/)

* @angular/cdk
* @angular/material

## Development

```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run start
```

## Browser support

* `Chrome` is supported.
* `Safari` is in progress.
* `FireFox` is in progress.
* `Edge` is in progress.
* `IE11` is in progress.

## Licence

Code licensed under MIT license.