Feature: Filter Column Fetch

	Scenario: filter-column-fetch is the same after clicking on filter button
		Given I am on "filter-column-fetch"
		When I click filter button for "Color"
		And I look at the Page
		Then Page looks the same as before