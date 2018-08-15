Feature: Action bar basic

	Scenario: Grid actions do work
		Given I am on "action-bar-basic"
		Then Grid is empty
		When I click "refresh" button
		Then Grid is not empty
		When I click "clear_all" button
		Then Grid is empty