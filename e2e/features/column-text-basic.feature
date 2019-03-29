Feature: Column Text Basic

	Scenario: column-text-basic is the same clicking on Text Area cell
		Given I am on "column-text-basic"
		When I click cell "Text Area"[0]
		And I look at the Page
		Then Page looks the same as before