Feature: Column Visibility Basic

	Scenario: column-visibility-basic is the same after hiding City column
		Given I am on "column-visibility-basic"
		When I click "Hide city" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-visibility-basic is the same after double clicking Show Last Name column
		Given I am on "column-visibility-basic"
		When I click "Show Last Name" button
		And I click "Show Last Name" button
		And I look at the Page
		Then Page looks the same as before