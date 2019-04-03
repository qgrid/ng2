Feature: Select Row Basic

	Scenario: select-row-basic is the same after selecting all
		Given I am on "select-row-basic"
		When I select all items
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after deselecting one item
		Given I am on "select-row-basic"
		When I select all items
		And I select item[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after selecting one item
		Given I am on "select-row-basic"
		When I select item[1]
		And I look at the Page
		Then Page looks the same as before
