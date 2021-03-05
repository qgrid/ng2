Feature: Grid Size Change

    Scenario: grid is displayed of medium size after clicking Medium button
		Given I am on "grid-size"
		When I click "Medium" button
		And I look at the Page
		Then Page looks the same as before

    Scenario: grid is displayed of small size after clicking Small button
		Given I am on "grid-size"
		When I click "Small" button
		And I look at the Page
		Then Page looks the same as before

    Scenario: grid is of full-screen size after clicking 100% button
		Given I am on "grid-size"
		When I click "100%" button
		And I look at the Page
		Then Page looks the same as before 