Feature: Style Cell Basic

	Scenario: Column Symbol is coloured
		Given I am on "style-cell-basic"
		Then background color of column "Symbol" is "#3f51b5"
		When column "Symbol" contains text "Mg"
		Then text color is "#8AFF00"