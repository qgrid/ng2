Feature: Destroy Grid Model

	Scenario: destroy-grid-model is shown after clicking on ShowHide button
		Given I am on "destroy-grid-model"
		When I click "Show" button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: destroy-grid-model is shown after clicking on ShowHide and filter buttons
		Given I am on "destroy-grid-model"
		When I click "Show" button
		And I click "filter_list" button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: destroy-grid-model is shown after clicking on ShowHide and history buttons
		Given I am on "destroy-grid-model"
		When I click "Show" button
		And I click "history" button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: destroy-grid-model is hidden after clicking two times on ShowHide button
		Given I am on "destroy-grid-model"
		When I click "Show" button
		And I click "Hide" button
		And I look at the Page
		Then Page looks the same as before