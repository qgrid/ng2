Feature: Column Array Basic

	Scenario: Editing and saving do work
		Given I am on "column-array-basic"
		When I click cell "Strings"[0]
		Then Edit form is opened
		When I enter text
		Then Value is added
		When I click delete-icon
		Then Value is deleted
		When I press Enter
		Then Changes are saved



	Scenario: Custom Template column does work correctly - delete
		Given I am on "column-array-basic"
		When I click Custom Template data cell
		Then Delete and Cancel buttons appeared
		When I click delete button
		Then Cell is null

	Scenario: Custom Template column does work correctly - cancel
		Given I am on "column-array-basic"
		When I click Custom Template data cell
		Then Delete and Cancel buttons appeared
		When I click cancel button
		Then Cell values are not changed
