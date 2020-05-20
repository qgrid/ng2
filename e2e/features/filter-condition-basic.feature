Feature: Filter Condition Basic

	Scenario: filter-condition-basic is the same after clicking on filter button
		Given I am on "filter-condition-basic"
		When I click condition filter button
		And I look at the Page
		Then Page looks the same as before

	Scenario: filter-condition-basic is the same after set new rules
		Given I am on "filter-condition-basic"
		When I click condition filter button
		And I add new rules:
			| Symbol     | NOT EQUALS        | He          |
			| Symbol     | EQUALS            | C           |
			| Appearance | IS EMPTY          |             |
			| Symbol     | IS NOT EMPTY      |             |
			| Symbol     | LIKE              | C           |
			| Symbol     | NOT LIKE          | B           |
			| Symbol     | STARTS WITH       | C           |
			| Symbol     | ENDS WITH         | C           |
			| Number     | IN                | 6, 5, 44, 3 |
			| Number     | BETWEEN           | 1, 8        |
			| Number     | GREATER THAN      | 0           |
			| Number     | LESS THAN         | 9           |
			| Number     | GREATER OR EQ. TO | -5          |
			| Number     | LESS OR EQ. TO    | 12          |
		And I click APPLY button
		And I look at the Page
		Then Page looks the same as before