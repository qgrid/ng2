# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [Unreleased]
* Auto-complete cell editor.
* Row edit form.
* Infinite scrolling.
* Performance improvements.
* Validation framework.
* Email, url cell editor.
* Copy/paste selection to excel.
* Auto-complete for Query builder.
* Query builder input performance improvements.
* Batch edit improvements.

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
- Added grid core pipes under ther `ng2-qgrid` namespace.
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
- Remove `BrowserModule` from componentns to allow lazy loading.
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
* Possibility to change row size `<q-grid-row canResize="true"`.
* Possibility to drag and drop rows `<q-grid-row canMove="true"`.
* Style queue to the style Api, accessible through style model cells/rows props.
* Rows property to the layout property.

### Changed
* Improve performance through change detection strategy.
* Improve performance through reducing number of change detections.
* Improve performance through adding track by index.
* Improve performance through invoking drang and drop out of ng zone.
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
* Fix minification in release script.
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

[unreleased]: https://github.com/qgrid/ng2/compare/v5.3.10...HEAD
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
