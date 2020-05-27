Feature: Details Row Pin

	Scenario: details-row-pin is the same after expanding first row
		Given I am on "details-row-pin"
		When I click " chevron_right " button
		And I look at the Page
		Then Page looks the same as before