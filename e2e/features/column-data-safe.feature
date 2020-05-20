Feature: Column Data Safe

	Scenario: column-data-safe is the same after editing Currency value
		Given I am on "column-data-safe"
		When I click cell "currency"[0]
		And I enter "2000" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-data-safe is the same after clicking Email cell
		Given I am on "column-data-safe"
		When I click cell "email"[0]
		And I look at the Page
		Then Page looks the same as before