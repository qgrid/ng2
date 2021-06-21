Feature: Column Row Indicator Basic

	Scenario: column-row-indicator-basic is not empty on start
		Given I am on "column-row-indicator-basic"
		When I look at the Page
		Then Page looks the same as before