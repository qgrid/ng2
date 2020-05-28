Feature: Data Add Row

	Scenario: data-row-add is the same after adding new row
		Given I am on "data-row-add"
		When I click add button
		And I click cell "gender"[0]
		And I enter "Female" text
		And I look at the Page
		Then Page looks the same as before