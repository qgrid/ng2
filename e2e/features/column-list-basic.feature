Feature: Column List Basic

	Scenario: column-list-basic is the same after clicking on Name tab
		Given I am on "column-list-basic"
		When I click " Name " button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-list-basic is the same after clicking on Address tab
		Given I am on "column-list-basic"
		When I click " Address " button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-list-basic is the same after clicking on Gender tab
		Given I am on "column-list-basic"
		When I click " Gender " button
		And I look at the Page
		Then Page looks the same as before