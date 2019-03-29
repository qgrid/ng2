Feature: Action bar basic

	Scenario: action-bar-basic is empty on start
		Given I am on "action-bar-basic"
		When I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-basic is the same after clicking load button
		Given I am on "action-bar-basic"
		When I click load button
		And I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-basic is the same after clicking grid action buttons
		Given I am on "action-bar-basic"
		When I click load button
		And I click clear button
		And I look at the Page
		Then Page looks the same as before