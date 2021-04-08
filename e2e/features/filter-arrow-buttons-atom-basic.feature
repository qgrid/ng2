Feature: filter, arrow buttons and pop-up for atom basic table columns

    Scenario: order is changed after clicking on Number cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Number"
        And I sort column "Number"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup appears after clicking on filter button of Number column
        Given I am on "filter-row-atom-basic"
        And I click filter button [0]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup disappears after clicking on Cancel button of Number column
        Given I am on "filter-row-atom-basic"
        When I click filter button [0]
        And I click "Cancel" button on pop-up
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Symbol cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Symbol"
        And I sort column "Symbol"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup appears after clicking on filter button of Symbol column
        Given I am on "filter-row-atom-basic"
        And I click filter button [1]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Name column title
        Given I am on "filter-row-atom-basic"
        When I hover "Name" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Phase cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Phase"
        And I sort column "Phase"
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Color cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Color"
        And I sort column "Color"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Appearance column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I hover "Appearance" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup appears after clicking on filter button of Appearance column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I click filter button [5]
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Group Block cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Group Block' column
        And I sort column "Group Block"
        And I sort column "Group Block"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Bonding Type title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Bonding Type' column
        And I hover "Bonding Type" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Summary cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I sort column "Summary"
        And I sort column "Summary"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup appears after clicking on filter button of Summary column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I click filter button [8]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Period column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I hover "Period" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Radius cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I sort column "Radius"
        And I scroll table till 'Radius' column
        And I sort column "Radius"
        And I scroll table till 'Radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Mass cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I sort column "Mass"
        And I scroll table till 'Mass' column
        And I sort column "Mass"
        And I scroll table till 'Mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Boil cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I sort column "Boil"
        And I scroll table till 'Boil' column
        And I sort column "Boil"
        And I scroll table till 'Boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Density column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I hover "Density" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Melt cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I sort column "Melt"
        And I scroll table till 'Melt' column
        And I sort column "Melt"
        And I scroll table till 'Melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Shells column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I hover "Shells" column title
        And I scroll table till 'Shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Named By cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I sort column "Named By"
        And I scroll table till 'Named By' column
        And I sort column "Named By"
        And I scroll table till 'Named By' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Discovered By column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I hover "Discovered By" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Discovered In cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I sort column "Discovered In"
        And I scroll table till 'Discovered In' column
        And I sort column "Discovered In"
        And I scroll table till 'Discovered In' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter and arrow button appears after navigating to Spectral Img column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Spectral Img' column
        And I hover "Spectral Img" column title
        And I scroll table till 'Spectral Img' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: order is changed after clicking on Source cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I sort column "Source"
        And I scroll table till 'Source' column
        And I sort column "Source"
        And I scroll table till 'Source' column
        And I look at the Page
        Then Page looks the same as before





