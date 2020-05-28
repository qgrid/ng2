Feature: Column Currency Basic

	Scenario: column-currency-basic is the same after editing Euro value
		Given I am on "column-currency-basic"
		When I click cell "euro"[0]
		And I enter "2000" text
		And I look at the Page
		Then Page looks the same as before