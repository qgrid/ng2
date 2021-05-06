Feature: Column Type Safe

	Scenario: column-type-safe is the same on start
		Given I am on "column-type-safe"
		When I look at the Page
		Then Page looks the same as before