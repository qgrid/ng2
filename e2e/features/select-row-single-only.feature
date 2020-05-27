Feature: Select Row Single Only

	Scenario: select-row-single-only row selected after user click cell in third row
		Given I am on "select-row-single-only"
		When I click cell "number"[2]
		And I look at the Page
		Then Page looks the same as before

	Scenario: select-row-single-only row selected after user click cell in second row
		Given I am on "select-row-single-only"
		When I click cell "symbol"[1]
		And I look at the Page
		Then Page looks the same as before

    Scenario: select-row-single-only row selected after user click cell in first row
		Given I am on "select-row-single-only"
		When I click cell "name"[0]
		And I look at the Page
		Then Page looks the same as before
