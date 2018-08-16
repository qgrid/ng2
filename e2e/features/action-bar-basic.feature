Feature: Action bar basic

	Scenario: Grid actions do work
		Given I am on "action-bar-basic"
		Then Grid is empty
		When I click load button
		Then Grid is not empty
		When I click clear button
		Then Grid is empty