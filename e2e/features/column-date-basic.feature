Feature: Column Date Basic

	Scenario: column-date-basic is the same after clicking Date cell
		Given I am on "column-date-basic"
		When I click cell "date"[0]
		And I look at the Page
		Then Page looks the same as before