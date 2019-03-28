Feature: Column Array Basic

	Scenario: column-array-basic is the same after adding item to the cell
		Given I am on "column-array-basic"
		When I click cell "Strings"[0]
		And I enter "Hello!" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-array-basic is the same after clicking on Custom Template cell
		Given I am on "column-array-basic"
		When I click cell "Custom Template"[0]
		And I look at the Page
		Then Page looks the same as before