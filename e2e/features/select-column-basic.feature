Feature: Select Column Basic

	Scenario: select-column-basic is the same after selecting two columns
		Given I am on "select-column-basic"
		When I click cell "gender"[1]
		And I click cell "birthday"[0]
        And I look at the Page
		Then Page looks the same as before

    Scenario: select-column-basic is the same after deselecting two columns
		Given I am on "select-column-basic"
		When I click cell "gender"[1]
		And I click cell "birthday"[0]
        And I click cell "gender"[1]
		And I click cell "birthday"[0]
        And I look at the Page
		Then Page looks the same as before