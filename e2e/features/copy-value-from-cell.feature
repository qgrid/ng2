Feature: Copy Value From Cell

	Scenario: copy-value-from-cell is the same after paste in input
		Given I am on "copy-value-from-cell"
		When I click cell "Euro"[0]
		And I press ctrl+c
		And I press ctrl+v on input
		And I look at the Page
		Then Page looks the same as before
