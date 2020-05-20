Feature: Column Number Basic

	Scenario: column-number-basic is the same after clicking Number cell
		Given I am on "column-number-basic"
		When I click cell "number"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-number-basic is the same after editing Max value
		Given I am on "column-number-basic"
		When I click cell "max"[0]
		And I enter "1.42424242424e+308" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-number-basic is the same after typing invalid Max value
		Given I am on "column-number-basic"
		When I click cell "max"[0]
		And I enter "asdasdasd" text
		And I look at the Page
		Then Page looks the same as before