Feature: Column Id Basic

	Scenario: column-id-basic is the same after clicking on Number cell
		Given I am on "column-id-basic"
		When I click cell "Number"[0]
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-id-basic is the same after clicking on Bool cell
		Given I am on "column-id-basic"
		When I click cell "Bool"[0]
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-id-basic is the same after clicking on Date cell
		Given I am on "column-id-basic"
		When I click cell "Date"[0]
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-id-basic is the same after clicking on Text cell
		Given I am on "column-id-basic"
		When I click cell "Text"[0]
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-id-basic is the same after clicking on Custom Template cell
		Given I am on "column-id-basic"
		When I click cell "Custom Template"[0]
		And I look at the Page
		Then Page looks the same as before