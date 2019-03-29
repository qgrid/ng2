Feature: Filter Condition Basic

	Scenario: filter-condition-basic is the same after clicking on filter button
		Given I am on "filter-condition-basic"
		When I click "filter_list" button
		And I look at the Page
		Then Page looks the same as before