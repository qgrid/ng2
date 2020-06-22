Feature: Column Visibility Basic

	Scenario: column-visibility-basic is the same after hiding City column
		Given I am on "column-visibility-basic"
		When I click "Only hide city" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-visibility-basic is the same after double clicking ShowHide Last Name column
		Given I am on "column-visibility-basic"
		When I click "Show/Hide Last Name" button
		And I click "Show/Hide Last Name" button
		And I look at the Page
		Then Page looks the same as before