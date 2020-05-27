Feature: Details Row Custom

	Scenario: details-row-custom is the same after expanding second row
		Given I am on "details-row-custom"
		When I click phase cell [1]
		And I look at the Page
		Then Page looks the same as before