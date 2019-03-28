Feature: Floating Rows Basic

	Scenario: floating-rows-basic is the same after scrolling
		Given I am on "floating-rows-basic"
		When I scroll table down
		And I look at the Page
		Then Page looks the same as before