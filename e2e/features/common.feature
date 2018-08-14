Feature: Look People Basic at main page
	Scenario: Page title is Look People Basic
		Given I am on main page
		Then Title is "Look People Basic"

	Scenario: Table has a rows
		Given I am on main page
		Then Table has rows

	Scenario: Table has columns
		Given I am on main page
		Then Table has columns

	Scenario: 13 Columns
		Given I am on main page
		Then Number of columns equals to 13

	Scenario: 50 rows
		Given I am on main page
		Then Number of rows equals to 50

	Scenario: Lue Laserna is woman
		Given I am on main page
		Then Cell at row 1 and column 3 has value "female"
