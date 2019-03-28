Feature: Edit Row Basic

	Scenario: edit-row-basic is the same after editing row
		Given I am on "edit-row-basic"
		When I click edit button [1]
		And I enter "Test Last Name" into "Last Name" field
		And I click "Is Female" checkbox
		And I click " Save " button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: edit-row-basic is the same after clicking edit button
		Given I am on "edit-row-basic"
		When I click edit button [1]
		And I look at the Page
		Then Page looks the same as before