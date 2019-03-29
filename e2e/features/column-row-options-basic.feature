Feature: Column Row Options Basic

	Scenario: column-row-options-basic is the same after scrolling
		Given I am on "column-row-options-basic"
		When I scroll table horizontally
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-row-options-basic is the same after clicking on Row Options cell
		Given I am on "column-row-options-basic"
		When I click options cell [1]
		And I look at the Page
		Then Page looks the same as before