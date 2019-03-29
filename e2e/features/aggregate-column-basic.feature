Feature: Aggregate column basic

	Scenario: aggregate-column-basic page is the same
		Given I am on "aggregate-column-basic"
		When I scroll table horizontally
		And I look at the Page
		Then Page looks the same as before