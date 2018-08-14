Feature: Action bar basic
	Scenario: Page title is Look People Basic
		Given I am on "/action-bar-basic"
		Then Title is "Action Bar Basic"

	Scenario: Table has not rows
		Given I am on "/action-bar-basic"
		Then Table has not rows

	Scenario: Table has rows
		Given I am on "/action-bar-basic"
		When I click "refresh" button
		Then Table has columns

	Scenario: Table has not columns
		Given I am on "/action-bar-basic"
		Then Table has not columns

	Scenario: Table has columns
		Given I am on "/action-bar-basic"
		When I click "refresh" button
		Then Table has columns

	Scenario: Cell at row 1 and column 4 has value "Gas"
		Given I am on "/action-bar-basic"
		When I click "refresh" button
		Then Cell at row 1 and column 4 has value "Gas"
