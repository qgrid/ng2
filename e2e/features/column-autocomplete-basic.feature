Feature: Column Autocomplete Basic

	Scenario: column-autocompletet-basic is the same after clicking on cell
		Given I am on "column-autocompletet-basic"
		When I click cell "Number"[0]
		And I delete a character
		And I look at the Page
		Then Page looks the same as before