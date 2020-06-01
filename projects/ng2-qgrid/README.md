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
   rows$ = this.dataService.getRows();
}
```

Note that q-grid rows should be an array of objects, any other types like array of numbers or strings will throw an error.

## Dependencies

*  @angular/common
*  @angular/core
*  @angular/forms

If `material` theme is used, it's also required to install [angular material](https://material.angular.io/)

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

## Build Application
```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run build:app
```

## Browser support

* `Chrome` latest is supported.
* `FireFox` latest is supported.
* `Safari` latest is supported.
* `Edge` latest is supported.

## Licence

Code licensed under MIT license.