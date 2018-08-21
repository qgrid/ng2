Feature: Style Row Basic

	Scenario: Row 5 is coloured
		Given I am on "style-row-basic"
		When row 5 contains text "FF0D0D"
		Then row color is "#FF0D0D"