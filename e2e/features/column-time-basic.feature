Feature: Column Time Basic

	Scenario: column-time-basic is the same after changeing time from keyboard
		Given I am on "column-time-basic"
		When I click cell "Number"[0]
		And I change value from keyboard
		And I click cell "Bool"[0]
		And I look at the Page
		Then Page looks the same as before