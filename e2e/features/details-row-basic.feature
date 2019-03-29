Feature: Details Row Basic

	Scenario: details-row-basic is the same after clicking chevron button
		Given I am on "details-row-basic"
		When I click expand button [1]
		And I look at the Page
		Then Page looks the same as before