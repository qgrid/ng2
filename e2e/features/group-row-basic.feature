Feature: Group Row Basic

	Scenario: group-row-basic is the same after clicking expand button
		Given I am on "group-row-basic"
		When I click expand button [0]
		And I click expand button [1]
		And I look at the Page
		Then Page looks the same as before