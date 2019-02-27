Feature: Details Row Start

	Scenario: details-row-start is the same after clicking chevron button
		Given I am on "details-row-start"
		When I click expand button [1]
		And I look at the Page
		Then Page looks the same as before