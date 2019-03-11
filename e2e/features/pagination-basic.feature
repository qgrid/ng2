Feature: Pagination Basic

	Scenario: pagination-basic is the same after selecting a page
		Given I am on "pagination-basic"
		When I click "location_searching" button
		And I enter "5" text
		And I click "keyboard_arrow_left" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: pagination-basic is the same after moving to the next page
		Given I am on "pagination-basic"
		When I click "keyboard_arrow_right" button
		And I look at the Page
		Then Page looks the same as before