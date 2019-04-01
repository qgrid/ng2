Feature: Select Cell Basic

	Scenario: select-cell-basic is the same after selecting name first
		Given I am on "select-cell-basic"
		When I click "more_vert" button
		And I click Select all
		And I click "Name First" filter item
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-cell-basic is the same after clicking select all
		Given I am on "select-cell-basic"
		When I click "more_vert" button
		And I click Select all
		And I click "Apply" button
		And I click "more_vert" button
		And I click Select all
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: select-cell-basic is the same after deselecting all
		Given I am on "select-cell-basic"
		When I click "more_vert" button
		And I click Select all
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before