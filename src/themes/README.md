### Grid module expects next files for each theme
* `index.html` - all ng-templates in next format: `<ng-temaplte key="body.cell.text.tpl.html" let-$cell>{{$cell.value}}</ng-template>`
* `index.scss` - styles for all templates
* `theme.component.ts` -  entry point for ng-templates
* `theme.module.ts` - module with required imports
* `theme.service.ts` - named service