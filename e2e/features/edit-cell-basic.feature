Feature: Edit Cell Basic

	Scenario: edit-cell-basic is the same after clicking buttons
		Given I am on "edit-cell-basic"
		When I click cell "Gender"[0]
		And I enter " Hello!" text
		And I click cell "Birthday"[2]
		And I look at the Page
		Then Page looks the same as before