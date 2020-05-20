Feature: Scroll Virtual Height

    Scenario: plugin-grid-basic is the same after going to page 1
        Given I am on "plugin-grid-basic"
		When I select page[0] in custom pager
        And I look at the Page
		Then Page looks the same as before

    Scenario: plugin-grid-basic is the same after going to page 2
        Given I am on "plugin-grid-basic"
		When I select page[1] in custom pager
        And I look at the Page
		Then Page looks the same as before

    Scenario: plugin-grid-basic is the same after going to page 3
        Given I am on "plugin-grid-basic"
		When I select page[2] in custom pager
        And I look at the Page
		Then Page looks the same as before