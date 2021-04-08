Feature: Filter parameters for atom basic columns

    Scenario: filters with Between parameter are applied on Number column
        Given I am on "filter-row-atom-basic"
        When I click filter button [0]
        And I enter "1" and "3" value
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Contains button are applied on Symbol column
        Given I am on "filter-row-atom-basic"
        When I click filter button [1]
        And I enter "A"
        And I click Select all
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Not like parameter are applied on Name column
        Given I am on "filter-row-atom-basic"
        When I click filter button [2]
        And I click more_vert button
        And I select "not like" condition
        And I enter 'N'
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Starts with parameter are applied on Phase column
        Given I am on "filter-row-atom-basic"
        When I click filter button [3]
        And I click more_vert button
        And I select "starts with" condition
        And I enter "L"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Ends with parameter are applied on Color column
        Given I am on "filter-row-atom-basic"
        When I click filter button [4]
        And I click more_vert button
        And I select "ends with" condition
        And I enter "0"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Is empty parameter are applied on Appearance column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I click filter button [5]
        And I click more_vert button
        And I select "is empty" condition
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Like parameter are applied on Group Block column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Group Block' column
        And I click filter button [6]
        And I click more_vert button
        And I select "like" condition
        And I enter "me"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Contains parameter are applied on Bonding Type
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Bonding Type' column
        And I click filter button [7]
        And I enter "bla"
        And I click Select all
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Is not empty parameter are applied on Summary column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I click filter button [8]
        And I click more_vert button
        And I select "is not empty" condition
        And I click "Apply"
        And I scroll table till 'Summary' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Less than or equals parameter are applied on Period column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I click filter button [9]
        And I click more_vert button
        And I select "less than or equals" condition
        And I enter "2"
        And I click "Apply"
        And I scroll table till 'Period' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Greater than parameter are applied on Radius column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I click filter button [10]
        And I click more_vert button
        And I select "greater than" condition
        And I enter "190"
        And I click "Apply"
        And I scroll table till 'Radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Greater than or equals parameter are applied on Mass column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I click filter button [11]
        And I click more_vert button
        And I select "greater than or equals" condition
        And I enter "270"
        And I click "Apply"
        And I scroll table till 'Mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Greater than or equals parameter are applied on Boil column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I click filter button [12]
        And I click more_vert button
        And I select "greater than or equals" condition
        And I enter "5000"
        And I click "Apply"
        And I scroll table till 'Boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Between parameter are applied on Density column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I click filter button [13]
        And I enter "1" and "2" value
        And I click "Apply"
        And I scroll table till 'Density' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Less than parameter are applied on Melt column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I click filter button [14]
        And I click more_vert button
        And I select "less than" condition
        And I enter "10"
        And I click "Apply"
        And I scroll table till 'Melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Contains parameter are applied on Shells column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I click filter button [15]
        And I enter "25"
        And I click Select all
        And I click "Apply"
        And I scroll table till 'Shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Is empty parameter are applied on Named By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I click filter button [16]
        And I click more_vert button
        And I select "is empty" condition
        And I click "Apply"
        And I scroll table till 'Named By' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Is not empty parameter are applied on Discovered By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I click filter button [17]
        And I click more_vert button
        And I select "is not empty" condition
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Greater than parameter are applied on Discovered In column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I click filter button [18]
        And I click more_vert button
        And I select "greater than" condition
        And I enter "1999"
        And I click "Apply"
        And I scroll table till 'Discovered In' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Ends with parameter are applied on Source column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I click filter button [19]
        And I click more_vert button
        And I select "ends with" condition
        And I enter "c"
        And I click "Apply"
        And I scroll table till 'Source' column
        And I look at the Page
        Then Page looks the same as before
