Feature: Column Url Basic

	Scenario: column-url-basic is the same after clicking on With Label cell
		Given I am on "column-url-basic"
		When I click cell "With Label"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: column-url-basic is the same after editing Valid value
		Given I am on "column-url-basic"
		When I click cell "Valid"[0]
		And I enter "http://example.com" text
		And I look at the Page
		Then Page looks the same as before