Feature: Column Array Basic

	Scenario: column-array-basic is the same after adding item to the string cell
		Given I am on "column-array-basic"
		When I click cell "Strings"[0]
		And I remove all values for selected column
		And I enter "Hello!" text
		And I rid of adding value popup
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-array-basic is the same after clicking on Custom Template cell
		Given I am on "column-array-basic"
		When I click cell "Custom Template"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-array-basic is the same after adding item to the numbers cell
		Given I am on "column-array-basic"
		When I click cell "Numbers"[0]
		And I remove all values for selected column
		And I enter "6547789.7774" text
		And I rid of adding value popup
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-array-basic is the same after adding item to the booleans cell
		Given I am on "column-array-basic"
		When I click cell "Booleans"[0]
		And I enter "true" text
		And I rid of adding value popup
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-array-basic is the same after adding item to the dates cell
		Given I am on "column-array-basic"
		When I click cell "Dates"[0]
		And I remove all values for selected column
		And I enter "07/22/2018" text
		And I rid of adding value popup
		And I look at the Page
		Then Page looks the same as before
