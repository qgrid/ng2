Feature: Column File Basic

	Scenario: column-file-basic is the same after clicking on With Label cell
		Given I am on "column-file-basic"
		When I click cell "With Label"[0]
		And I look at the Page
		Then Page looks the same as before