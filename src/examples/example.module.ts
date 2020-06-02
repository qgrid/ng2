import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';

import { ExampleActionBarBasicComponent } from './action-bar-basic/example-action-bar-basic.component';
import { ExampleActionBarOnEnterComponent } from './action-bar-on-enter/example-action-bar-on-enter.component';
import { ExampleActionBarTemplateComponent } from './action-bar-template/example-action-bar-template.component';
import { ExampleAggregateColumnBasicComponent } from './aggregate-column-basic/example-aggregate-column-basic.component';
import { ExampleAltBasicComponent } from './pane-basic/example-alt-basic.component';
import { ExampleColumnArrayBasicComponent } from './column-array-basic/example-column-array-basic.component';
import { ExampleColumnAutocompleteBasicComponent } from './column-autocomplete-basic/example-column-autocomplete-basic.component';
import { ExampleColumnBoolBasicComponent } from './column-bool-basic/example-column-bool-basic.component';
import { ExampleColumnColumnVisibilityBasicComponent } from './column-visibility-basic/example-column-visibility-basic.component';
import { ExampleColumnCurrencyBasicComponent } from './column-currency-basic/example-column-currency-basic.component';
import { ExampleColumnDataSafeComponent } from './column-data-safe/example-column-data-safe.component';
import { ExampleColumnDateBasicComponent } from './column-date-basic/example-column-date-basic.component';
import { ExampleColumnDateTimeBasicComponent } from './column-datetime-basic/example-column-datetime-basic.component';
import { ExampleColumnDropdownBasicComponent } from './column-dropdown-basic/example-column-dropdown-basic.component';
import { ExampleColumnEmailBasicComponent } from './column-email-basic/example-column-email-basic.component';
import { ExampleColumnFileBasicComponent } from './column-file-basic/example-column-file-basic.component';
import { ExampleColumnIdBasicComponent } from './column-id-basic/example-column-id-basic.component';
import { ExampleColumnImageBasicComponent } from './column-image-basic/example-column-image-basic.component';
import { ExampleColumnListBasicComponent } from './column-list-basic/example-column-list-basic.component';
import { ExampleColumnListLoopComponent } from './column-list-loop/example-column-list-loop.component';
import { ExampleColumnNumberBasicComponent } from './column-number-basic/example-column-number-basic.component';
import { ExampleColumnPasswordBasicComponent } from './column-password-basic/example-column-password-basic.component';
import { ExampleColumnReferenceBasicComponent } from './column-reference-basic/example-column-reference-basic.component';
import { ExampleColumnRowIndicatorBasicComponent } from './column-row-indicator-basic/example-column-row-indicator-basic.component';
import { ExampleColumnRowNumberBasicComponent } from './column-row-number-basic/example-column-row-number-basic.component';
import { ExampleColumnRowOptionsBasicComponent } from './column-row-options-basic/example-column-row-options-basic.component';
import { ExampleColumnTextBasicComponent } from './column-text-basic/example-column-text-basic.component';
import { ExampleColumnTimeBasicComponent } from './column-time-basic/example-column-time-basic.component';
import { ExampleColumnTooltipBasicComponent } from './column-tooltip-basic/example-column-tooltip-basic.component';
import { ExampleColumnTypeSafeComponent } from './column-type-safe/example-column-type-safe.component';
import { ExampleColumnUrlBasicComponent } from './column-url-basic/example-column-url-basic.component';
import { ExampleDataRowAddComponent } from './data-row-add/example-data-row-add.component';
import { ExampleDataRowDeleteComponent } from './data-row-delete/example-data-row-delete.component';
import { ExampleDefineColumnAsyncComponent } from './define-column-async/example-define-column-async.component';
import { ExampleDefineColumnBasicComponent } from './define-column-basic/example-define-column-basic.component';
import { ExampleDefineColumnHybridComponent } from './define-column-hybrid/example-define-column-hybrid.component';
import { ExampleDefineColumnTypeComponent } from './define-column-type/example-define-column-type.component';
import { ExampleDestroyGridBasicComponent } from './destroy-grid-basic/example-destroy-grid-basic.component';
import { ExampleDestroyGridModelComponent } from './destroy-grid-model/example-destroy-grid-model.component';
import { ExampleDetailsRowAllComponent } from './details-row-all/example-details-row-all.component';
import { ExampleDetailsRowApiComponent } from './details-row-api/example-details-row-api.component';
import { ExampleDetailsRowBasicComponent } from './details-row-basic/example-details-row-basic.component';
import { ExampleDetailsRowCustomComponent } from './details-row-custom/example-details-row-custom.component';
import { ExampleDetailsRowGridComponent } from './details-row-grid/example-details-row-grid.component';
import { ExampleDetailsRowPinComponent } from './details-row-pin/example-details-row-pin.component';
import { ExampleDetailsRowSelectComponent } from './details-row-select/example-details-row-select.component';
import { ExampleDetailsRowStartComponent } from './details-row-start/example-details-row-start.component';
import { ExampleDragColumnBasicComponent } from './drag-column-basic/example-drag-column-basic.component';
import { ExampleDragRowBasicComponent } from './drag-row-basic/example-drag-row-basic.component';
import { ExampleDragRowNodeComponent } from './drag-row-node/example-drag-row-node.component';
import { ExampleDynamicColumnModelComponent } from './dynamic-column-model/example-dynamic-column-model.component';
import { ExampleEditCellBasicComponent } from './edit-cell-basic/example-edit-cell-basic.component';
import { ExampleEditCellBatchComponent } from './edit-cell-batch/example-edit-cell-batch.component';
import { ExampleEditRowBasicComponent } from './edit-row-basic/example-edit-row-basic.component';
import { ExampleEditRowCustomComponent } from './edit-row-custom/example-edit-row-custom.component';
import { ExampleExportBasicComponent } from './export-basic/example-export-basic.component';
import { ExampleExportCsvComponent } from './export-csv/example-export-csv.component';
import { ExampleFilterColumnFetchComponent } from './filter-column-fetch/example-filter-column-fetch.component';
import { ExampleFilterConditionBasicComponent } from './filter-condition-basic/example-filter-condition-basic.component';
import { ExampleFilterRowAtomBasicComponent } from './filter-row-atom-basic/example-filter-row-atom-basic.component';
import { ExampleFilterRowCustomComponent } from './filter-row-custom/example-filter-row-custom.component';
import { ExampleFilterRowPeopleBasicComponent } from './filter-row-people-basic/example-filter-row-people-basic.component';
import { ExampleFloatingRowsBasicComponent } from './floating-rows-basic/example-floating-rows-basic.component';
import { ExampleFocusCellAutoComponent } from './focus-cell-auto/example-focus-cell-auto.component';
import { ExampleFocusCellBasicComponent } from './focus-cell-basic/example-focus-cell-basic.component';
import { ExampleFocusCellCustomComponent } from './focus-cell-custom/example-focus-cell-custom.component';
import { ExampleGenerateColumnCheckComponent } from './generate-column-check/example-generate-column-check.component';
import { ExampleGenerateColumnCohortComponent } from './generate-column-cohort/example-generate-column-cohort.component';
import { ExampleGenerateColumnDeepComponent } from './generate-column-deep/example-generate-column-deep.component';
import { ExampleGenerateColumnRawComponent } from './generate-column-raw/example-generate-column-raw.component';
import { ExampleGenerateColumnShallowComponent } from './generate-column-shallow/example-generate-column-shallow.component';
import { ExampleGridListBasicComponent } from './grid-list-basic/example-grid-list-basic.component';
import { ExampleGroupColumnBasicComponent } from './group-column-basic/example-group-column-basic.component';
import { ExampleGroupRowAggregationComponent } from './group-row-aggregation/example-group-row-aggregation.component';
import { ExampleGroupRowBasicComponent } from './group-row-basic/example-group-row-basic.component';
import { ExampleGroupRowEditComponent } from './group-row-edit/example-group-row-edit.component';
import { ExampleGroupRowFlatComponent } from './group-row-flat/example-group-row-flat.component';
import { ExampleGroupRowRowspanComponent } from './group-row-rowspan/example-group-row-rowspan.component';
import { ExampleGroupRowSubheadComponent } from './group-row-subhead/example-group-row-subhead.component';
import { ExampleGroupRowSummaryComponent } from './group-row-summary/example-group-row-summary.component';
import { ExampleHierarchyBrowserBasicComponent } from './hierarchy-browser-basic/example-hierarchy-browser-basic.component';
import { ExampleImportBasicComponent } from './import-basic/example-import-basic.component';
import { ExampleImportCsvComponent } from './import-csv/example-import-csv.component';
import { ExampleIndexColumnBasicComponent } from './index-column-basic/example-index-column-basic.component';
import { ExampleIndexColumnHybridComponent } from './index-column-hybrid/example-index-column-hybrid.component';
import { ExampleIndexColumnModelComponent } from './index-column-model/example-index-column-model.component';
import { ExampleInteractionModeDetachedComponent } from './interaction-mode-detached/example-interaction-mode-detached.component';
import { ExampleInteractionModeReadonlyComponent } from './interaction-mode-readonly/example-interaction-mode-readonly.component';
import { ExampleKeyWithSymbolsComponent } from './key-with-symbols/example-key-with-symbols.component';
import { ExampleLayerGridBlankComponent } from './layer-grid-blank/example-layer-grid-blank.component';
import { ExampleLegendGridBasicComponent } from './legend-grid-basic/example-legend-grid-basic.component';
import { ExampleLiveDataBasicComponent } from './live-data-basic/example-live-data-basic.component';
import { ExampleLiveRowsBasicComponent } from './live-rows-basic/example-live-rows-basic.component';
import { ExampleLookAtomsBasicComponent } from './look-atoms-basic/example-look-atoms-basic.component';
import { ExampleLookAtomsCustomizedComponent } from './look-atoms-customized/example-look-atoms-customized.component';
import { ExampleLookAtomsIdComponent } from './look-atoms-id/example-look-atoms-id.component';
import { ExampleLookAtomsModelComponent } from './look-atoms-model/example-look-atoms-model.component';
import { ExampleLookPeopleBasicComponent } from './look-people-basic/example-look-people-basic.component';
import { ExampleLookPeopleModelComponent } from './look-people-model/example-look-people-model.component';
import { ExampleLookQuotesBasicComponent } from './look-quotes-basic/example-look-quotes-basic.component';
import { ExampleLookQuotesModelComponent } from './look-quotes-model/example-look-quotes-model.component';
import { ExampleManipulateDataBasicComponent } from './manipulate-data-basic/example-manipulate-data-basic.component';
import { ExampleMasterDetailsBasicComponent } from './master-details-basic/example-master-details-basic.component';
import { ExampleOnPushBasicComponent } from './on-push-basic/example-on-push-basic.component';
import { ExamplePaginationBasicComponent } from './pagination-basic/example-pagination-basic.component';
import { ExamplePaneBasicComponent } from './pane-basic/example-pane-basic.component';
import { ExamplePaneTriggerComponent } from './pane-trigger/example-pane-trigger.component';
import { ExamplePersistenceBasicComponent } from './persistence-basic/example-persistence-basic.component';
import { ExamplePersistenceServerComponent } from './persistence-server/example-persistence-server.component';
import { ExamplePinColumnBasicComponent } from './pin-column-basic/example-pin-column-basic.component';
import { ExamplePipeGridBasicComponent } from './pipe-grid-basic/example-pipe-grid-basic.component';
import { ExamplePivotColumnBasicComponent } from './pivot-column-basic/example-pivot-column-basic.component';
import { ExamplePivotColumnCohortComponent } from './pivot-column-cohort/example-pivot-column-cohort.component';
import { ExamplePivotColumnGroupComponent } from './pivot-column-group/example-pivot-column-group.component';
import { ExamplePivotColumnTemplateComponent } from './pivot-column-template/example-pivot-column-template.component';
import { ExamplePluginGridBasicComponent } from './plugin-grid-basic/example-plugin-grid-basic.component';
import { ExamplePluginMyPagerComponent } from './plugin-grid-basic/example-plugin-my-pager.component';
import { ExampleRestApiBasicComponent } from './rest-api-basic/example-rest-api-basic.component';
import { ExampleScrollVirtualBasicComponent } from './scroll-virtual-basic/example-scroll-virtual-basic.component';
import { ExampleScrollVirtualDetailsComponent } from './scroll-virtual-details/example-scroll-virtual-details.component';
import { ExampleScrollVirtualDragComponent } from './scroll-virtual-drag/example-scroll-virtual-drag.component';
import { ExampleScrollVirtualEditComponent } from './scroll-virtual-edit/example-scroll-virtual-edit.component';
import { ExampleScrollVirtualGroupComponent } from './scroll-virtual-group/example-scroll-virtual-group.component';
import { ExampleScrollVirtualHeightComponent } from './scroll-virtual-height/example-scroll-virtual-height.component';
import { ExampleScrollVirtualInfiniteComponent } from './scroll-virtual-infinite/example-scroll-virtual-infinite.component';
import { ExampleScrollVirtualListComponent } from './scroll-virtual-list/example-scroll-virtual-list.component';
import { ExampleScrollVirtualListInfiniteComponent } from './scroll-virtual-list-infinite/example-scroll-virtual-list-infinite.component';
import { ExampleScrollVirtualSelectionComponent } from './scroll-virtual-selection/example-scroll-virtual-selection.component';
import { ExampleScrollVirtualStyleComponent } from './scroll-virtual-style/example-scroll-virtual-style.component';
import { ExampleSelectCellBasicComponent } from './select-cell-basic/example-select-cell-basic.component';
import { ExampleSelectColumnBasicComponent } from './select-column-basic/example-select-column-basic.component';
import { ExampleSelectMixBasicComponent } from './select-mix-basic/example-select-mix-basic.component';
import { ExampleSelectRowBasicComponent } from './select-row-basic/example-select-row-basic.component';
import { ExampleSelectRowCommandComponent } from './select-row-command/example-select-row-command.component';
import { ExampleSelectRowDisableComponent } from './select-row-disable/example-select-row-disable.component';
import { ExampleSelectRowRangeComponent } from './select-row-range/example-select-row-range.component';
import { ExampleSelectRowSingleComponent } from './select-row-single/example-select-row-single.component';
import { ExampleSelectRowSingleOnlyComponent } from './select-row-single-only/example-select-row-single-only.component';
import { ExampleSizeColumnAbsoluteComponent } from './size-column-absolute/example-size-column-absolute.component';
import { ExampleSizeColumnBasicComponent } from './size-column-basic/example-size-column-basic.component';
import { ExampleSizeColumnFullComponent } from './size-column-full/example-size-column-full.component';
import { ExampleSizeColumnPinComponent } from './size-column-pin/example-size-column-pin.component';
import { ExampleSizeRowBasicComponent } from './size-row-basic/example-size-row-basic.component';
import { ExampleSortRowBasicComponent } from './sort-row-basic/example-sort-row-basic.component';
import { ExampleStyleCellBasicComponent } from './style-cell-basic/example-style-cell-basic.component';
import { ExampleStyleRowBasicComponent } from './style-row-basic/example-style-row-basic.component';
import { ExampleSummaryColumnAggregationComponent } from './summary-column-aggregation/example-summary-column-aggregation.component';
import { ExampleSummaryColumnBasicComponent } from './summary-column-basic/example-summary-column-basic.component';
import { ExampleThemeGridDarkComponent } from './theme-grid-dark/example-theme-grid-dark.component';
import { ExampleThemeGridEmbedComponent } from './theme-grid-embed/example-theme-grid-embed.component';
import { ExampleValidationBasicComponent } from './validation-basic/example-validation-basic.component';
import { ExampleVisibilityBasicComponent } from './visibility-basic/example-visibility-basic.component';
import { ExampleVisibilityStateComponent } from './visibility-model/example-visibility-model.component';

export const EXAMPLES: any[] = [
	ExampleActionBarBasicComponent,
	ExampleActionBarOnEnterComponent,
	ExampleActionBarTemplateComponent,
	ExampleAggregateColumnBasicComponent,
	ExampleAltBasicComponent,
	ExampleColumnArrayBasicComponent,
	ExampleColumnAutocompleteBasicComponent,
	ExampleColumnBoolBasicComponent,
	ExampleColumnColumnVisibilityBasicComponent,
	ExampleColumnCurrencyBasicComponent,
	ExampleColumnDataSafeComponent,
	ExampleColumnDateBasicComponent,
	ExampleColumnDateTimeBasicComponent,
	ExampleColumnDropdownBasicComponent,
	ExampleColumnEmailBasicComponent,
	ExampleColumnFileBasicComponent,
	ExampleColumnIdBasicComponent,
	ExampleColumnImageBasicComponent,
	ExampleColumnListBasicComponent,
	ExampleColumnListLoopComponent,
	ExampleColumnNumberBasicComponent,
	ExampleColumnPasswordBasicComponent,
	ExampleColumnReferenceBasicComponent,
	ExampleColumnRowIndicatorBasicComponent,
	ExampleColumnRowNumberBasicComponent,
	ExampleColumnRowOptionsBasicComponent,
	ExampleColumnTextBasicComponent,
	ExampleColumnTimeBasicComponent,
	ExampleColumnTooltipBasicComponent,
	ExampleColumnTypeSafeComponent,
	ExampleColumnUrlBasicComponent,
	ExampleDataRowAddComponent,
	ExampleDataRowDeleteComponent,
	ExampleDefineColumnAsyncComponent,
	ExampleDefineColumnBasicComponent,
	ExampleDefineColumnHybridComponent,
	ExampleDefineColumnTypeComponent,
	ExampleDestroyGridBasicComponent,
	ExampleDestroyGridModelComponent,
	ExampleDetailsRowAllComponent,
	ExampleDetailsRowApiComponent,
	ExampleDetailsRowBasicComponent,
	ExampleDetailsRowCustomComponent,
	ExampleDetailsRowGridComponent,
	ExampleDetailsRowPinComponent,
	ExampleDetailsRowSelectComponent,
	ExampleDetailsRowStartComponent,
	ExampleDragColumnBasicComponent,
	ExampleDragRowBasicComponent,
	ExampleDragRowNodeComponent,
	ExampleDynamicColumnModelComponent,
	ExampleEditCellBasicComponent,
	ExampleEditCellBatchComponent,
	ExampleEditRowBasicComponent,
	ExampleEditRowCustomComponent,
	ExampleExportBasicComponent,
	ExampleExportCsvComponent,
	ExampleFilterColumnFetchComponent,
	ExampleFilterConditionBasicComponent,
	ExampleFilterRowAtomBasicComponent,
	ExampleFilterRowCustomComponent,
	ExampleFilterRowPeopleBasicComponent,
	ExampleFloatingRowsBasicComponent,
	ExampleFocusCellAutoComponent,
	ExampleFocusCellBasicComponent,
	ExampleFocusCellCustomComponent,
	ExampleGenerateColumnCheckComponent,
	ExampleGenerateColumnCohortComponent,
	ExampleGenerateColumnDeepComponent,
	ExampleGenerateColumnRawComponent,
	ExampleGenerateColumnShallowComponent,
	ExampleGridListBasicComponent,
	ExampleGroupColumnBasicComponent,
	ExampleGroupRowAggregationComponent,
	ExampleGroupRowBasicComponent,
	ExampleGroupRowEditComponent,
	ExampleGroupRowFlatComponent,
	ExampleGroupRowRowspanComponent,
	ExampleGroupRowSubheadComponent,
	ExampleGroupRowSummaryComponent,
	ExampleHierarchyBrowserBasicComponent,
	ExampleImportBasicComponent,
	ExampleImportCsvComponent,
	ExampleIndexColumnBasicComponent,
	ExampleIndexColumnHybridComponent,
	ExampleIndexColumnModelComponent,
	ExampleInteractionModeDetachedComponent,
	ExampleInteractionModeReadonlyComponent,
	ExampleKeyWithSymbolsComponent,
	ExampleLayerGridBlankComponent,
	ExampleLegendGridBasicComponent,
	ExampleLiveDataBasicComponent,
	ExampleLiveRowsBasicComponent,
	ExampleLookAtomsBasicComponent,
	ExampleLookAtomsCustomizedComponent,
	ExampleLookAtomsIdComponent,
	ExampleLookAtomsModelComponent,
	ExampleLookPeopleBasicComponent,
	ExampleLookPeopleModelComponent,
	ExampleLookQuotesBasicComponent,
	ExampleLookQuotesModelComponent,
	ExampleManipulateDataBasicComponent,
	ExampleMasterDetailsBasicComponent,
	ExampleOnPushBasicComponent,
	ExamplePaginationBasicComponent,
	ExamplePaneBasicComponent,
	ExamplePaneTriggerComponent,
	ExamplePersistenceBasicComponent,
	ExamplePersistenceServerComponent,
	ExamplePinColumnBasicComponent,
	ExamplePipeGridBasicComponent,
	ExamplePivotColumnBasicComponent,
	ExamplePivotColumnCohortComponent,
	ExamplePivotColumnGroupComponent,
	ExamplePivotColumnTemplateComponent,
	ExamplePluginGridBasicComponent,
	ExampleRestApiBasicComponent,
	ExampleScrollVirtualBasicComponent,
	ExampleScrollVirtualDetailsComponent,
	ExampleScrollVirtualDragComponent,
	ExampleScrollVirtualEditComponent,
	ExampleScrollVirtualGroupComponent,
	ExampleScrollVirtualHeightComponent,
	ExampleScrollVirtualInfiniteComponent,
	ExampleScrollVirtualListComponent,
	ExampleScrollVirtualListInfiniteComponent,
	ExampleScrollVirtualSelectionComponent,
	ExampleScrollVirtualStyleComponent,
	ExampleSelectCellBasicComponent,
	ExampleSelectColumnBasicComponent,
	ExampleSelectMixBasicComponent,
	ExampleSelectRowBasicComponent,
	ExampleSelectRowCommandComponent,
	ExampleSelectRowDisableComponent,
	ExampleSelectRowRangeComponent,
	ExampleSelectRowSingleComponent,
	ExampleSelectRowSingleOnlyComponent,
	ExampleSizeColumnAbsoluteComponent,
	ExampleSizeColumnBasicComponent,
	ExampleSizeColumnFullComponent,
	ExampleSizeColumnPinComponent,
	ExampleSizeRowBasicComponent,
	ExampleSortRowBasicComponent,
	ExampleStyleCellBasicComponent,
	ExampleStyleRowBasicComponent,
	ExampleSummaryColumnAggregationComponent,
	ExampleSummaryColumnBasicComponent,
	ExampleThemeGridDarkComponent,
	ExampleThemeGridEmbedComponent,
	ExampleValidationBasicComponent,
	ExampleVisibilityBasicComponent,
	ExampleVisibilityStateComponent,
];

export const APP_ROUTES: Routes = EXAMPLES
	.map<Route>(example => ({
		path: (example.tags && example.tags[0]) || example.id,
		component: example
	}));

@NgModule({
	declarations: [
		...EXAMPLES,
		ExamplePluginMyPagerComponent
	],
	exports: EXAMPLES,
	imports: [
		CommonModule,
		FormsModule,

		MatButtonModule,
		MatSelectModule,
		MatChipsModule,
		MatIconModule,

		GridModule,
		ThemeModule,
	]
})
export class ExampleModule { }
