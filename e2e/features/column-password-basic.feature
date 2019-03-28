Feature: Column Password Basic

	Scenario: column-password-basic is the same after clicking on Number cell
		Given I am on "column-password-basic"
		When I click cell "Number"[0]
		And I look at the Page
		Then Page looks the same as before