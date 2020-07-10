# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [9.1.4] - 2020-06-02
### Added
- Support 2 version 9.1.x - Ivy, 9.1.x-ve - View Engine
- `q-grid-shortcut-host` directive that can change key event source for q-grid commands.

### Changed
- Better top toolbar layout.
- Grid title now wraps to the second row if not fit to width.

## [9.1.3] - 2020-06-01
### BREAKING
* Remove q-grid-title, use `q-grid-caption` instead.

### Fixed
* Remove auto entering to the edit mode on cell focus.
* Row options column menu item click doesn't trigger an action.
* Fixed when cell-handler go out of view port when hold page-up.
* Highlight column on mouse over even if it's sorted.
* When focus grid using tab key, also focus first focusable cell.
* Clear function on column filter expression views deactivates filter.
* Pane doesn't work when select row.
* Select all by `ctrl-a` in `multiple` and `range` modes.

### Added
* Add new option for column generation, typeDetection = 'inference' | 'raw'.
* Add shortcuts to the pager's next/prev buttons (alt+pagedown, alt+pageup).
* Introduce q-grid-row `behavior` array input to control if it's required to expand row on click or shortcut.
* Add `q-grid-focused` class to the row when one of it's cell is in focus..
* Add `q-grid-alt` plugin that automatically set pagination and selection by `alt+[0-9]` shortcuts.
* Add `timestamp` property to mouse state to handle double clicks.

## [9.1.2] - 2020-05-27
### BREAKING
- q-grid is block element by default, was inline.
- Rename edit state property from `state` to `status`.
- Selection state `key` property split into 2 `rowKey` and `columnKey`.
- Data state `id` property split into 2 `rowId` and `columnId`.
- Remove `actions`, `pipe`, `selectionKey`, `filterFetch` input properties from the grid component.
- Remove `keep` method from grid plugin.
- Data rowId returns row index by default not the instance.
- Instead of class q-grid-cell.key use q-grid-`the`-cell.key.
- Get rid of redundant spans in cell templates.
- Column pin `min` instead of `null`.
- Rename column `class` to `category`.
- Remove `rowIndex`, `columnIndex`, `row`, `column` from navigation state.

### Added
- Ivy support.
- New scene status called `idle`, before the first render.
- Introduce canExecuteCheck for the command to explicitly update canExecute status.
- Extend plugin interface with `observe` and `observeReply` functions.
- Copy cell label to clipboard.
- New column type `datetime` that represents date and time.
- Possibility to change column filter template for the particular column.
- New way to access dynamic states like columnChooser, through the `resolve` method.
- Introduce pager `mode` that can be equal to `showRows` or `showPages` value.

### Changed
- Better plugin support.
- Get rid of model proxy.
- Rendering performance improvements.
- All components got OnPush CDS.
- Better core types.
- Row details get focus on expand.
- Immutable model state to prevent event handling artifacts.
- Remove browser select.
- Optimize css styles for rendering performance and size.
- Pin `mid` instead of `null`.

### Fixed
- *ngIf for column component works.
- Fix row options icon is jumping on edit.
- Row resize algorithm.
- Better paddings for column filter and chooser.

## [9.0.1] - 2020-03-13
### Fixed
- Build

## [9.0.0] - 2020-03-13
### Changed
- Migrate to Angular 9.
- Static query migration.

### BREAKING
- Cell selection occurs after mouse down not mouse up.

## [7.5.2] - 2020-03-04
### Fixed
- Dynamic column visibility.
- Get rid of duplicate actions on destroy.

## [7.5.1] - 2020-01-22
### Fixed
- Fix npm package.

## [7.5.0] - 2020-01-22
### Added
- Keyboard API.
- Mouse API.

### Changed
- Better column drag and drop.
- Filter row style enhancements.
 
### Fixed
- Progress line.
- Column filter matches labels not values.

### BREAKING
- Navigation event raised before selection event.
- `Pane` context receives value from the trigger property `NOT` cell.
- `View` model `rows` section now contains data before pagination.
- Separate `view` pipe to `scene` and `view` pipes.
- Remove `debounce` property from navigation model.

## [7.4.0] - 2019-08-16
### Added
- Selection `singleOnly` mode that prevent row unselecting, and draws radio buttons instead of check boxes.

## [7.3.0] - 2019-08-08
### Added
- Live row plugin.
- Live cell plugin.

### Changed
- `Space` key selects the row.

## [7.2.6] - 2019-07-31
### Fixed
- Column `isDefault` property works as expected.

## [7.2.5] - 2019-07-29
### Added
- Live cell plugin.

### Fixed
- Toggle column filter operator not reset predicate.
- Search in column chooser does not work when column title is null.

## [7.2.4] - 2019-06-25
### Fixed
- `itemLabel` works for auto-complete.

## [7.2.3] - 2019-06-20
### Fixed
- Can't enter edit mode when selection unit is row.

## [7.2.2] - 2019-06-20
### Fixed
- Layer default styles.

## [7.2.1] - 2019-06-20
### Fixed
- Angular Material version.

## [7.2.0] - 2019-06-20
### Changed
- Migrate to Angular 7.
- Reference editor cancels value on backdrop click.
- Move layer component under the box.

### Fixed
- Commit command get correct arguments.
- Better mouse navigation in edit mode.
- Dropdown behavior on close.
- Limit filter by chip width to support multiline text.
- Do not show shortcut tooltip in action bar if it's empty
- Same id layers can be accidentally shown.

### Added
- Possibility to add panes.
- Layer panel gets class appropriate to layer name.

## [6.4.0] - 2019-05-14
### Added
- Column filter modes.

### Fixed
- Selection toggle command can control checkbox disable state.

## [6.3.9] - 2019-04-24
### Added
- Dropdown supports array of objects.

## [6.3.8] - 2019-04-15
### Fixed
- Support right pinned column in details mode.

## [6.3.7] - 2019-04-12
### Fixed
- Propagate `description` property in column component.
- Reset scroll only if page size, page or filter was changed.
- Better pagination behavior when after data rows changed.

## [6.3.5] - 2019-04-11
### Changed
- `Focus service` takes into account pagination.

### Fixed
- Compatibility with Chrome implementation of flex box overflow since version 73.
- Select all button.

## [6.3.4] - 2019-03-12
### Fixed
- Default import template is shown up.

## [6.3.0] - 2019-02-22
### Added
- Add support row options menu dividers.

### Changed
- Show action title if icon is not set.
- Get rid of ng-template in cell editor component.

### Fixed
- Custom symbols in the column `key`.
- Fix column chooser label style.
- Fix column filter header style.
- Pagination styles.

## [6.2.4] - 2019-02-05
### Fixed
- Row options shortcut fix for multiple actions.

## [6.2.3] - 2019-02-05
### Added
- Row options shortcut support.

## [6.2.2]
### Fixed
- Better FireFox support by encapsulation of MouseEvent path property.
- Better edit strategy when trigger of editor options is set to 'focus'.

## [6.2.1]
### Added
- Edit form support.
- Travis CI.
- Cucumber specs infrastructure.
- Edit cell validation support.

### Fixed
- Blanks position in the column filter.

## [6.2.0]
### Fixed
- Column filter `blanks` is removed when reset clicked.

### Added
- Column hierarchy and dnd support in the column chooser.
- Cohort column dnd support.

### BREAKING
- `model.columnList().index` now contains tree of columns, not a column key list.
  
## [6.1.5] - 2018-07-03
### Fixed
- Row highlight in details modes.
- Mark q-grid for check on invalidate, that allows to have basic functionality when q-grid host has onPush strategy.

### Added
- Basic theme array, url and email support.

## [6.1.4] - 2018-06-28
### Fixed
- Time cell editor.
- Fix q-grid-embedded array cell look.
- Percent width are aware of pad column padding.
- Show horizontal scroll-bar if there are no data rows, but some columns are present.
- Observables in dropdown editors.

### Added
- Beta version of row virtual scrolling.
- Tab-trap component for the url and email editors.
- Column groups manipulation through the structural directives.
- Import from csv, pdf, xlsx, json.
- Export to csv, pdf, xlsx, json.

### Changed
- Improve performance of Style API using dom bags directly.

## [6.1.3] - 2018-06-21
### Fixed
- Fixed AOT compilation.
- Fixed time editor value assign.
- Dark theme for plugins and cell handler.
- Textarea editor now shows length of the input text.

## [6.1.1] - 2018-06-15
### Fixed
- Highlight on drag and drop.
- Pager target should be closed after enter hit.

### Changed 
- Column Filter, Column Chooser, Query Builder, Persistence Plugins became responsible.

## [6.1.0] - 2018-06-15
### BREAKING
- Need to change theme import from `import { ThemeModule } from 'ng2-qgrid'` to `import { ThemeModule } from 'ng2-qgrid/theme/material`

### Deprecated
- Use `FetchContext` `search` property instead of `filter` property.
- Use `<q-grid caption="My Grid">` instead of `<q-grid header="My Grid">`.

### Added
- Support of custom themes, we are not linked tight with angular/material any more.
- 113+ Examples.
- Readonly strategies `<q-grid interactionMode="full | readonly | detached">`.
- Spanned headers and column groups.
- Group summaries.
- `PluginServices` that allows to write own plugins for q-grid.
- Better caching strategies for renders.
- New `rowspan` mode for groups.
- New `rowList` model.
- Drag and drop column support in `column chooser`.
- Initial basic theme.
- Float(fixed) rows support through the `model.row()` `pin` property.
- New column generation mode `cohort`.
- Action trigger template support.

### Changed
- Live `drag and drop` for rows and columns.
- Use `Model Proxy` for resource utilization.
- New `Dom matrix` engine for rendering.
- Reference column API.
- Pin columns are highlighted when scroll horizontal.
- 
### Fixed
- Better row details rendering. 
- Fixed focus position on scene render (e.g. sort, filter etc.).
- Column sort algorithm became more predictable.
- Array cell editor doesn't work with keyboard.

## [5.3.10] - 2018-05-21
### Added
- `ToggleAll` command that can be override to intersect toggle all groups action.

### Changed
- Clicking on group header leads to collapse/expand of all nodes in the view.
- By default child node label is empty.

### Fixed
- `Group pipe` index calculation - the root cause of invalid filtering. 

## [5.3.9] - 2018-05-18
### Added
- Focus method to the grid service.

### Changed
- AOT Compatible.
- Angular CLI as app starter.
- Rollup scripts to build the library.

### Fixed
- FocusAfterRender service.
- Column filter IsBlank is displayed in chips.
- Legend template syntax.
- TypeScript definitions.
- Async pipe for rows property.

## [5.3.7] - 2018-07-08
### Added
- Template support of column filter items.

### Fixed
- Column sort plugin uses `FocusAfterRender` only on click.

## [5.3.6] - 2018-04-20
### Added
- `Persistence` plugin - added groups.

## [5.3.5] - 2018-04-19
### Added
- `Query builder panel` component styles are standalone.

## [5.3.4] - 2018-04-18
### Added
- `Query builder` plugin.
- Cell batch update.

## [5.3.3] - 2018-04-13
### Added
- `Persistence` plugin.
- `Status bar` plugin.
- Selected chips in `column filter` plugin.
- Focus cell when after sort or filter column.

### Fixed
- Vscroll reset.

## [5.3.2] - 2018-03-23
### Added
- Supporting of custom fetch in the column filter.
- Virtual scroll module.
- Pager target menu.

### Changed
- Added grid core pipes under there `ng2-qgrid` namespace.
- Remove `popup` module.

### Fixed
- Pager custom size and sizeList not being honored/rendered correctly.
- Rename `action-bar-core` to `action-bar`.

## [5.2.4] - 2018-02-16
### Changed
- Renamed `action-bar-core` to `action-bar`.
- `layout="row"` refactored to `class="layout-row"`.
- Export q-grid `common module` to make `q-grid-position` directive available for the end user.

### Fixed
- Url editor.
- Text alignment in the file editor.
- Navigation should trigger detect changes.

## [5.2.3] - 2018-02-12
### Fixed
- Embed style for `row-options` column type.
- TypeScript declarations.

## [5.2.2] - 2018-02-12
### Fixed
- Remove `BrowserModule` from components to allow lazy loading.
- Fix column filter and column chooser styles.

## [5.2.0] - 2018-02-09
### Added
- Column [viewWidth](https://qgrid.github.io/ng/#!/column-view-size) property.
- Filter `by` property `blanks` option support.

### Changed
- Show (Blanks) checkbox in column filter if there is empty string, null or undefined in the list.
- Explicitly set `display: inline` for label in column sort plugin.
- Change q-grid-embed styles.

### Fixed
- Better layout of column filter and column sort icons.

## [5.1.2] - 2018-01-03
### Added
* Possibility to change row size `<q-grid-row [canResize]="true"`.
* Possibility to drag and drop rows `<q-grid-row [canMove]="true"`.
* Style queue to the style Api, accessible through style model cells/rows props.
* Rows property to the layout property.

### Changed
* Improve performance through change detection strategy.
* Improve performance through reducing number of change detections.
* Improve performance through adding track by index.
* Improve performance through invoking drag and drop out of ng zone.
* Layout columns property changed type form object to map.

## [5.1.1] - 2017-12-28
### Added
* Legend plugin.
* Bool cell editor.
* File cell editor.
* Image cell editor.

### Changed
* Theme module should be explicitly added to the user application.
* Backdrop triggers close event on mouse wheel click.
* Change dependencies to peer in prod package.json.

### Fixed
* Array cell editor improvements.
* Fix minimization in release script.
* Grid in grid support.

## [5.0.2] - 2017-12-22

### Added
* Theme support.
* Material theme that is used angular material inside.
* Grid service that allows to create grid model and get more control on the grid itself.
* Make grid header and footer sticky.
* Sticky footer.
* Top, left, right, bottom toolbars.
* Embed flex css framework, that was extracted from angular-material.
* Auto generation modes for columns.
* Allow to reorder columns.
* Allow to resize columns.
* Allow to setup width of column in percents.
* Allow to have custom templates for cells in html.
* Column multi-sort support
* Column sort modes: single, multiple
* Column sorting depends on position
* Frozen columns.
* Custom.
* Array column type.
* Bool column type.
* Date column type.
* Email column type.
* Group column type.
* Number column type.
* Pad column type.
* Password column type.
* Pivot column type.
* Row indicator column type.
* Row number column type.
* Select column type.
* File column type.
* Time column type.
* Image column type.
* Url column type.
* Currency column type.
* Row options column type.
* Row expand column type.
* Row details column type.
* Reference column type.
* Id column type.
* Row details.
* Cell inline editing.
* Cell navigation with keyboard.
* Mouse navigation.
* Style API to apply runtime style to the cells and rows.
* Row and cell highlighting.
* Focus cell API.
* Range selection.
* Row selection.
* Cell selection.
* Mix selection, when user can select row by clicking on row-indicator column or cell.
* Selection key that allows to reduce data row to some valuable thing.
* Selection modes: single and multiple.
* Keyboard editing support.
* Edit API.
* Dropdown editor.
* Textarea editor.
* Column filter plugin.
* Initial filter row implementation.
* Filter API for custom filters.
* Column grouping.
* Custom hierarchy for grouping.
* Column pivoting.
* Import/Export to csv, excel and pdf.
* Column aggregation.
* Plugin system.
* Column chooser plugin.
* Pager plugin.
* Progress plugin.

[unreleased]: https://github.com/qgrid/ng2/compare/v9.1.4...HEAD
[9.1.4]: https://github.com/qgrid/ng2/compare/v9.1.3...v9.1.4
[9.1.3]: https://github.com/qgrid/ng2/compare/v9.0.1...v9.1.3
[9.0.1]: https://github.com/qgrid/ng2/compare/v9.0.0...v9.0.1
[9.0.0]: https://github.com/qgrid/ng2/compare/v7.5.2...v9.0.0
[7.5.2]: https://github.com/qgrid/ng2/compare/v7.5.1...v7.5.2
[7.5.1]: https://github.com/qgrid/ng2/compare/v7.5.0...v7.5.1
[7.5.0]: https://github.com/qgrid/ng2/compare/v7.4.0...v7.5.0
[7.4.0]: https://github.com/qgrid/ng2/compare/v7.3.0...v7.4.0
[7.3.0]: https://github.com/qgrid/ng2/compare/v7.2.6...v7.3.0
[7.2.6]: https://github.com/qgrid/ng2/compare/v7.2.5...v7.2.6
[7.2.5]: https://github.com/qgrid/ng2/compare/v7.2.4...v7.2.5
[7.2.4]: https://github.com/qgrid/ng2/compare/v7.2.3...v7.2.4
[7.2.3]: https://github.com/qgrid/ng2/compare/v7.2.2...v7.2.3
[7.2.2]: https://github.com/qgrid/ng2/compare/v7.2.1...v7.2.2
[7.2.1]: https://github.com/qgrid/ng2/compare/v7.2.0...v7.2.1
[7.2.0]: https://github.com/qgrid/ng2/compare/v6.4.0...v7.2.0
[6.4.0]: https://github.com/qgrid/ng2/compare/v6.3.9...v6.4.0
[6.3.9]: https://github.com/qgrid/ng2/compare/v6.3.7...v6.3.9
[6.3.8]: https://github.com/qgrid/ng2/compare/v6.3.7...v6.3.8
[6.3.7]: https://github.com/qgrid/ng2/compare/v6.3.5...v6.3.7
[6.3.5]: https://github.com/qgrid/ng2/compare/v6.3.4...v6.3.5
[6.3.4]: https://github.com/qgrid/ng2/compare/v6.3.0...v6.3.4
[6.3.0]: https://github.com/qgrid/ng2/compare/v6.2.4...v6.3.0
[6.2.4]: https://github.com/qgrid/ng2/compare/v6.2.4...v6.2.3
[6.2.3]: https://github.com/qgrid/ng2/compare/v6.2.3...v6.2.2
[6.2.2]: https://github.com/qgrid/ng2/compare/v6.2.2...v6.2.1
[6.2.1]: https://github.com/qgrid/ng2/compare/v6.2.1...v6.2.0
[6.2.0]: https://github.com/qgrid/ng2/compare/v6.2.0...v6.1.5
[6.1.5]: https://github.com/qgrid/ng2/compare/v6.1.5...v6.1.4
[6.1.4]: https://github.com/qgrid/ng2/compare/v6.1.4...v6.1.3
[6.1.3]: https://github.com/qgrid/ng2/compare/v6.1.3...v6.1.1
[6.1.1]: https://github.com/qgrid/ng2/compare/v6.1.1...v6.1.0
[6.1.0]: https://github.com/qgrid/ng2/compare/v6.1.0...v5.3.10
[5.3.10]: https://github.com/qgrid/ng2/compare/v5.3.10...v5.3.9
[5.3.9]: https://github.com/qgrid/ng2/compare/v5.3.8...v5.3.7
[5.3.7]: https://github.com/qgrid/ng2/compare/v5.3.7...v5.3.6
[5.3.6]: https://github.com/qgrid/ng2/compare/v5.3.6...v5.3.5
[5.3.5]: https://github.com/qgrid/ng2/compare/v5.3.5...v5.3.4
[5.3.4]: https://github.com/qgrid/ng2/compare/v5.3.4...v5.3.2
[5.3.3]: https://github.com/qgrid/ng2/compare/v5.3.2...v5.2.4
[5.3.2]: https://github.com/qgrid/ng2/compare/v5.3.2...v5.2.4
[5.2.4]: https://github.com/qgrid/ng2/compare/v5.2.4...v5.2.3
[5.2.3]: https://github.com/qgrid/ng2/compare/v5.2.3...v5.2.2
[5.2.2]: https://github.com/qgrid/ng2/compare/v5.2.2...v5.2.1
[5.2.0]: https://github.com/qgrid/ng2/compare/v5.2.0...v5.1.2
[5.1.2]: https://github.com/qgrid/ng2/compare/v5.1.2...v5.1.1
[5.1.1]: https://github.com/qgrid/ng2/compare/v5.1.1...v5.0.2
[5.0.0]: https://github.com/qgrid/ng2/compare/v5.0.0...v1.0.7
[1.0.7]: https://github.com/qgrid/ng2/compare/v1.0.7...v1.0.6
[1.0.6]: https://github.com/qgrid/ng2/compare/v1.0.6...v1.0.5
[1.0.5]: https://github.com/qgrid/ng2/compare/v1.0.5...v1.0.4
[1.0.4]: https://github.com/qgrid/ng2/compare/v1.0.4...v1.0.3
[1.0.3]: https://github.com/qgrid/ng2/compare/v1.0.3...v1.0.2
[1.0.2]: https://github.com/qgrid/ng2/compare/v1.0.2...v1.0.1