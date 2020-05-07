Feature: Select Row Basic

	Scenario: select-row-basic is the same after selecting all
		Given I am on "select-row-basic"
		When I select all items
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after deselecting all
		Given I am on "select-row-basic"
		When I select all items
		And I select all items
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after selecting one item
		Given I am on "select-row-basic"
		When I select item[1]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after deselecting one item
		Given I am on "select-row-basic"
		When I select item[0]
		And I select item[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after selecting few items
		Given I am on "select-row-basic"
		When I select item[1]
		And I select item[2]
		And I select item[3]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after deselecting few items
		Given I am on "select-row-basic"
		When I select item[1]
		And I select item[2]
		And I select item[3]
		And I select item[3]
		And I select item[2]
		And I select item[1]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after click one item
		Given I am on "select-row-basic"
		When I click cell "name.first"[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after click twice one item
		Given I am on "select-row-basic"
		When I click cell "name.first"[3]
		And I click cell "name.first"[3]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after click on few items
		Given I am on "select-row-basic"
		When I click cell "name.first"[3]
		And I click cell "name.first"[4]
		And I click cell "name.first"[5]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-basic is the same after click twice on each of few items
		Given I am on "select-row-basic"
		When I click cell "name.first"[3]
		And I click cell "name.first"[4]
		And I click cell "name.first"[5]
		And I click cell "name.first"[3]
		And I click cell "name.first"[4]
		And I click cell "name.first"[5]
		And I look at the Page
		Then Page looks the same as before