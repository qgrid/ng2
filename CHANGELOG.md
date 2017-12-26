# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [Unreleased]
* Auto-complete cell editor.
* Reference cell editor.
* Auto generation of row edit form.
* Initial implementation of virtual scrolling.
* Infinite scrolling.
* Popup plugin.
* Validation framework.
* Persistence plugin.
* Email, url cell editor.

## [5.1.0] - 2017-12-26
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

[unreleased]: https://github.com/qgrid/ng/compare/v5.1.0...HEAD
[5.1.0]: https://github.com/qgrid/ng/compare/v5.1.0...v5.0.2
[5.0.0]: https://github.com/qgrid/ng/compare/v5.0.2...v1.0.7
[1.0.7]: https://github.com/qgrid/ng/compare/v1.0.7...v1.0.6
[1.0.6]: https://github.com/qgrid/ng/compare/v1.0.6...v1.0.5
[1.0.5]: https://github.com/qgrid/ng/compare/v1.0.5...v1.0.4
[1.0.4]: https://github.com/qgrid/ng/compare/v1.0.4...v1.0.3
[1.0.3]: https://github.com/qgrid/ng/compare/v1.0.3...v1.0.2
[1.0.2]: https://github.com/qgrid/ng/compare/v1.0.2...v1.0.1
