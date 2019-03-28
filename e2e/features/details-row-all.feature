Feature: Details Row All

	Scenario: details-row-all is the same after clicking chevron button
		Given I am on "details-row-all"
		When I click expand button [0]
		And I look at the Page
		Then Page looks the same as before