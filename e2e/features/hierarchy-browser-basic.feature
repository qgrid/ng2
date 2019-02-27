Feature: Hierarchy Browser Basic

	Scenario: hierarchy-browser-basic is the same after expanding folders
		Given I am on "hierarchy-browser-basic"
		When I click folder button [0]
		And I click folder button [1]
		And I look at the Page
		Then Page looks the same as before