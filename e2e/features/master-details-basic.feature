Feature: Master Details

	Scenario: master-details-basic is the same after selecting a row
		Given I am on "master-details-basic"
		When I click cell "$select-single"[1]
		And I look at the Page
		Then Page looks the same as before