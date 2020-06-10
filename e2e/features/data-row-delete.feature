Feature: Data Delete Row

	Scenario: data-row-delete is the same after deleting a row
		Given I am on "data-row-delete"
		When I delete row by index[0]
		And I look at the Page
		Then Page looks the same as before