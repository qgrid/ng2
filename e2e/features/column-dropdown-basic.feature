Feature: Column Dropdown Basic

	Scenario: column-dropdown-basic is the same after clicking on Number cell
		Given I am on "column-dropdown-basic"
		When I click cell "Number"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-dropdown-basic is the same after selecting another Number value
		Given I am on "column-dropdown-basic"
		When I click cell "Number"[0]
		And I select option with index [1]
		And I look at the Page
		Then Page looks the same as before