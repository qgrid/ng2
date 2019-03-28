Feature: Validation basic

	Scenario:  validation-basic page is the same after clicking on cell
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I look at the Page
		Then Page looks the same as before