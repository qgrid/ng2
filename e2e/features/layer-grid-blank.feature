Feature: Layer Grid Blank

	Scenario: Load data button does work
		Given I am on "layer-grid-blank"
		When I click Load data button
		Then Grid is not empty
		