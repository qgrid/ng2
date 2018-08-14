Feature: Action bar basic
	Scenario: Grid has no rows
		Given I am on "action-bar-basic"
		Then Grid has no rows

	Scenario: Grid has rows
		Given I am on "action-bar-basic"
		When I click "refresh" button
		Then Grid has columns

	Scenario: Grid has no columns
		Given I am on "action-bar-basic"
		Then Grid has no columns

	Scenario: Grid has columns
		Given I am on "action-bar-basic"
		When I click "refresh" button
		Then Grid has columns

	Scenario: Cell at row 1 and column 4 has value "Gas"
		Given I am on "action-bar-basic"
		When I click "refresh" button
		Then Cell at row 1 and column 4 has value "Gas"
