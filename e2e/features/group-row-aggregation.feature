Feature: Group Row Aggregation

	Scenario: group-row-aggregation is the same after clicking expand button
		Given I am on "group-row-aggregation"
		When I click expand button [0]
		And I look at the Page
		Then Page looks the same as before