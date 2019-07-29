Feature: Action bar basic

	Scenario: action-bar-basic is not empty on start
		Given I am on "action-bar-basic"
		When I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-basic is the same after clicking clear button
		Given I am on "action-bar-basic"
		When I click clear button
		And I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-basic is the same after clicking grid action buttons
		Given I am on "action-bar-basic"
		When I click clear button
		And I click load button
		And I look at the Page
		Then Page looks the same as before