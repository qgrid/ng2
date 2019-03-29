Feature: Action bar template

	Scenario: action-bar-template is the same on start
		Given I am on "action-bar-template"
		When I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-template is the same after clicking sort by asc button
		Given I am on "action-bar-template"
		When I click " Sort By Symbol Asc " button
		And I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-template is the same after clicking sort by desc buttons
		Given I am on "action-bar-template"
		When I click " Sort By Symbol Desc " button
		And I look at the Page
		Then Page looks the same as before