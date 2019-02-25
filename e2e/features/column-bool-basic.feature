Feature: Column Bool Basic

	Scenario: column-bool-basic is the same after clicking on cells
		Given I am on "column-bool-basic"
		When I click cell "False"[0]
		And I click cell "Trigger Focus"[0]
		And I look at the Page
		Then Page looks the same as before