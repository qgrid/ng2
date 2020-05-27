Feature: Drag Column Basic

	Scenario: drag-column-basic is the same after dragging a column
		Given I am on "drag-column-basic"
		When I drag column "Symbol" to column "Phase"
		And I look at the Page
		Then Page looks the same as before