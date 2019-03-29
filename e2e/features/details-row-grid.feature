Feature: Details Row Grid

	Scenario: details-row-grid is the same after clicking chevron button
		Given I am on "details-row-grid"
		When I click expand button [1]
		And I look at the Page
		Then Page looks the same as before