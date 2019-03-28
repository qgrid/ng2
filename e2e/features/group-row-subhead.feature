Feature: Group Row Subhead

	Scenario: group-row-subhead is the same after clicking expand button
		Given I am on "group-row-subhead"
		When I click expand button [0]
		And I click expand button [1]
		And I look at the Page
		Then Page looks the same as before