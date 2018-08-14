Feature: Look People Basic at main page
	Scenario: Grid has rows
		Given I am on main page
		Then Grid has rows

	Scenario: Grid has columns
		Given I am on main page
		Then Grid has columns

	Scenario: 13 Columns
		Given I am on main page
		Then Number of columns equals to 13

	Scenario: 50 rows
		Given I am on main page
		Then Number of rows equals to 50

	Scenario: Lue Laserna is woman
		Given I am on main page
		Then Cell at row 1 and column 3 has value "female"
