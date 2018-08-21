Feature: Action bar template

	Scenario: Sorting buttons do work
		Given I am on "action-bar-template"
		When I click sort by asc button
		Then Column "Symbol" is sorted by ascending
		When I click sort by desc button
		Then Column "Symbol" is sorted by descending