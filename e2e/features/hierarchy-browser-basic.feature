Feature: Hierarchy Browser Basic

    Scenario: hierarchy-browser-basicis the same after expanding few folders
        Given I am on "hierarchy-browser-basic"
		When I expand folder [0]
        And I expand folder [0]
        And I expand folder [2]
		And I look at the Page
		Then Page looks the same as before

    Scenario: hierarchy-browser-basicis the same after collapsing few folders
        Given I am on "hierarchy-browser-basic"
		When I expand folder [0]
        And I expand folder [0]
        And I collapse folder [1]
        And I collapse folder [0]
		And I look at the Page
		Then Page looks the same as before
    