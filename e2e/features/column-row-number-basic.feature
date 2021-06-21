Feature: Column Row Number Basic

	Scenario: column-row-number-basic is not empty on start
		Given I am on "column-row-number-basic"
		When I look at the Page
		Then Page looks the same as before