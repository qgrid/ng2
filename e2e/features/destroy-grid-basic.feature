Feature: Destroy Grid Basic

	Scenario: destroy-grid-basic is shown after clicking on ShowHide button
		Given I am on "destroy-grid-basic"
		When I click "Hide" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: destroy-grid-basic is hidden after clicking two times on ShowHide button
		Given I am on "destroy-grid-basic"
		When I click "Hide" button
		And I click "Show" button
		And I look at the Page
		Then Page looks the same as before