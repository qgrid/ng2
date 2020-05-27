Feature: Select Mix Basic

	Scenario: select-mix-basic is the same after selecting two rows
		Given I am on "select-mix-basic"
		When I select row[1]
		And I select row[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-mix-basic is the same after deselecting two rows
		Given I am on "select-mix-basic"
		When I select row[1]
		And I select row[2]
		And I select row[1]
		And I select row[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-mix-basic is the same after selecting two cells
		Given I am on "select-mix-basic"
		When I select cell[1]
		And I select cell[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-mix-basic is the same after deselecting two cells
		Given I am on "select-mix-basic"
		When I select cell[1]
		And I select cell[2]
		And I select cell[1]
		And I select cell[2]
		And I look at the Page
		Then Page looks the same as before

