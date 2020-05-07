Feature: Select Row Disable

	Scenario: select-row-disable row not selected after user click cell in disabled row
		Given I am on "select-row-disable"
		When I click cell "name.first"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-disable row selected after user click cell in enabled row
		Given I am on "select-row-disable"
		When I click cell "name.last"[1]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-disable is the same after deselecting row via click cell
		Given I am on "select-row-disable"
		When I click cell "name.last"[3]
		And I click cell "name.last"[3]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-disable row selected after user click checkbox in enabled row
		Given I am on "select-row-disable"
		When I select item[1]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-disable is the same after deselecting row via checkbox
		Given I am on "select-row-disable"
		When I select item[0]
		And I select item[0]
		And I look at the Page
		Then Page looks the same as before
