Feature: Column Datetime Basic

	Scenario: column-datetime-basic is not empty on start
		Given I am on "column-datetime-basic"
		When I look at the Page
		Then Page looks the same as before