Feature: Second row parameters for atom basic columns

    Scenario: second row filter for Number column
        Given I am on "filter-row-atom-basic"
        When I enter '1' value into input field of 'number' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Symbol column
        Given I am on "filter-row-atom-basic"
        When I enter 'C' value into input field of 'symbol' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Name column
        Given I am on "filter-row-atom-basic"
        When I enter 'Neon' value into input field of 'name' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Phase column
        Given I am on "filter-row-atom-basic"
        When I enter 'Gas' value into input field of 'phase' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Color column
        Given I am on "filter-row-atom-basic"
        When I enter 'CC80FF' value into input field of 'color' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Appearance column
        Given I am on "filter-row-atom-basic"
        When I enter 'silvery' value into input field of 'appearance' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Group Block column
        Given I am on "filter-row-atom-basic"
        When I enter 'metal' value into input field of 'groupBlock' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Bonding Type column
        Given I am on "filter-row-atom-basic"
        When I enter 'diatomic' value into input field of 'bondingType' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Period column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I enter '2' value into input field of 'period' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Radius column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I enter '0' value into input field of 'radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Mass column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I enter '2' value into input field of 'mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Boil column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I enter '2' value into input field of 'boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Density column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I enter '1' value into input field of 'density' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Melt column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I enter '14' value into input field of 'melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Shells column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I enter '2, 1' value into input field of 'shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Named By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I enter 'Humphry Davy' value into input field of 'namedBy' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Discovered By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I enter 'Humphry Davy' value into input field of 'discoveredBy' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Discovered In column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I enter '1700' value into input field of 'discoveredIn' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter for Source column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I enter 'en' value into input field of 'source' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: second row filter combination
        Given I am on "filter-row-atom-basic"
        When I enter '99' value into input field of 'number' column
        And I enter 'Solid' value into input field of 'phase' column
        And I enter 'metal' value into input field of 'groupBlock' column
        And I scroll table till 'Radius' column
        And I enter '146' value into input field of 'radius' column
        And I look at the Page
        Then Page looks the same as before