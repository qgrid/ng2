Feature: Group Row Edit

	Scenario: group-row-edit is the same after editing expanded cell
		Given I am on "group-row-edit"
		When I click expand button [0]
		And I click expand button [1]
		And I click cell "Symbol"[2]
		And I enter "Hello!" text
		And I look at the Page
		Then Page looks the same as before