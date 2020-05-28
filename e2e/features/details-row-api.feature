Feature: Details Row API

	Scenario: details-row-api is the same after expanding all
		Given I am on "details-row-api"
		When I click " Expand All " button
		And I look at the Page
		Then Page looks the same as before

	Scenario: details-row-api is the same after expanding and collapsing all
		Given I am on "details-row-api"
		When I click " Expand All " button
		And I click " Collapse All " button
		And I look at the Page
		Then Page looks the same as before

	Scenario: details-row-api is the same after expanding second row
		Given I am on "details-row-api"
		When I click " Expand Second " button
		And I look at the Page
		Then Page looks the same as before