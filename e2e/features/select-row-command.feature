Feature: Select Row Command

	Scenario: select-row-command row selected after user click cell in third row
		Given I am on "select-row-command"
		When I click cell "gender"[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-command row selected after user click checkbox in fourth row
		Given I am on "select-row-command"
		When I select item[3]
		And I look at the Page
		Then Page looks the same as before
