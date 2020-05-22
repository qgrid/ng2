# q-grid
Angular data grid

## Documentation
https://qgrid.github.io

## Examples
https://qgrid.github.io/ng2

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
      <q-grid [rows]="rows$ | async">
            <q-grid-columns generation="deep">
            </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
         this.rows$ = dataService.getRows();
   }
}
```

Note that q-grid rows should be an array of objects, any other types like array of numbers or strings will throw an error.

## Dependencies

*  @angular/common
*  @angular/core
*  @angular/forms

If you use `material` theme from the q-grid package, you also need to install [angular material](https://material.angular.io/)

* @angular/cdk
* @angular/material

## Development

```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run start
```

## Build Library
```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run build:lib
```

## Browser support

* `Chrome` is supported.
* `FireFox` is supported.
* `Safari` is supported.
* `Edge` is in progress.
* `IE11` is in progress.

## Licence

Code licensed under MIT license.