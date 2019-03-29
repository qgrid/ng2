Feature: Layer Grid Blank

	Scenario: Load data button does work
		Given I am on "layer-grid-blank"
		When I click " Load Data " button
		Then Grid is not empty
		When I look at the Page
		Then Page looks the same as before