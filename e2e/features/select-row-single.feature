Feature: Select Row Single

	Scenario: select-row-single row selected after user click cell in sixth row
		Given I am on "select-row-single"
		When I click cell "birthday"[5]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-single is the same after deselecting row via click cell
		Given I am on "select-row-single"
		When I click cell "birthday"[3]
		And I click cell "birthday"[3]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-single row selected after user click checkbox in fifth row
		Given I am on "select-row-single"
		When I select item[4]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-single is the same after deselecting row via checkbox
		Given I am on "select-row-single"
		When I select item[0]
		And I select item[0]
		And I look at the Page
		Then Page looks the same as before