Feature: Manipulate Data Basic

	Scenario: manipulate-data-basic is the same after editing cells
		Given I am on "manipulate-data-basic"
		When I click add button
		And I click on cell "Name First"[0]
		And I enter "First Name!" text
		And I click on cell "Name Last"[0]
		And I enter "Last Name!" text
		And I click on cell "Name Last"[3]
		And I enter "EDITED LAST NAME" text
		And I look at the Page
		Then Page looks the same as before