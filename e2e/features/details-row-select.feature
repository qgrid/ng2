Feature: Details Row Select

	Scenario: details-row-select is the same after expanding row
		Given I am on "details-row-select"
		When I click expand button [1]
		And I look at the Page
		Then Page looks the same as before