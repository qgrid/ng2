Feature: Column Reference Basic

	Scenario: column-reference-basic is the same after clicking on Not Editable cell
		Given I am on "column-reference-basic"
		When I click cell "Not Editable"[0]
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: column-reference-basic is the same after selecting another value for Single Value cell
		Given I am on "column-reference-basic"
		When I click cell "Single Value"[0]
		And I select "sit" value
		And I click "Save" button
		And I look at the Page
		Then Page looks the same as before
				
	Scenario: column-reference-basic is the same after adding several values for Editable cell
		Given I am on "column-reference-basic"
		When I click cell "Editable"[0]
		And I select "sit" value
		And I select "dolor" value
		And I click "Save" button
		And I look at the Page
		Then Page looks the same as before