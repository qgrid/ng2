Feature: filter row atom basic

    Scenario: filter-row-atom-basic is the same after clicking on Number cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Number"
        And I sort column "Number"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on filter button of Number column
        Given I am on "filter-row-atom-basic"
        And I click filter button [0]
        And I look at the Page
        Then Page looks the same as before

    Scenario:filter-row-atom-basic is the same after clicking on Cancel button of Number column
        Given I am on "filter-row-atom-basic"
        When I click filter button [0]
        And I click "Cancel" button on pop-up
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Symbol cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Symbol"
        And I sort column "Symbol"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on filter button of Symbol column
        Given I am on "filter-row-atom-basic"
        And I click filter button [1]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Name column title
        Given I am on "filter-row-atom-basic"
        When I hover "Name" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Phase cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Phase"
        And I sort column "Phase"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Color cell title
        Given I am on "filter-row-atom-basic"
        When I sort column "Color"
        And I sort column "Color"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Appearance column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I hover "Appearance" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on filter button of Appearance column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I click filter button [5]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Group Block cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Group Block' column
        And I sort column "Group Block"
        And I sort column "Group Block"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Bonding Type title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Bonding Type' column
        And I hover "Bonding Type" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Summary cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I sort column "Summary"
        And I sort column "Summary"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on filter button of Summary column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I click filter button [8]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Period column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I hover "Period" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Radius cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I sort column "Radius"
        And I scroll table till 'Radius' column
        And I sort column "Radius"
        And I scroll table till 'Radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Mass cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I sort column "Mass"
        And I scroll table till 'Mass' column
        And I sort column "Mass"
        And I scroll table till 'Mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Boil cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I sort column "Boil"
        And I scroll table till 'Boil' column
        And I sort column "Boil"
        And I scroll table till 'Boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Density column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I hover "Density" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Melt cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I sort column "Melt"
        And I scroll table till 'Melt' column
        And I sort column "Melt"
        And I scroll table till 'Melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Shells column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I hover "Shells" column title
        And I scroll table till 'Shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Named By cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I sort column "Named By"
        And I scroll table till 'Named By' column
        And I sort column "Named By"
        And I scroll table till 'Named By' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Discovered By column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I hover "Discovered By" column title
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Discovered In cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I sort column "Discovered In"
        And I scroll table till 'Discovered In' column
        And I sort column "Discovered In"
        And I scroll table till 'Discovered In' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after navigating to Spectral Img column title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Spectral Img' column
        And I hover "Spectral Img" column title
        And I scroll table till 'Spectral Img' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after clicking on Source cell title
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I sort column "Source"
        And I scroll table till 'Source' column
        And I sort column "Source"
        And I scroll table till 'Source' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Between parameter on Number column
        Given I am on "filter-row-atom-basic"
        When I click filter button [0]
        And I enter "1" and "3" value
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Contains button on Symbol column
        Given I am on "filter-row-atom-basic"
        When I click filter button [1]
        And I enter "A"
        And I click Select all
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Not like parameter on Name column
        Given I am on "filter-row-atom-basic"
        When I click filter button [2]
        And I click three-dot button
        And I select "not like" condition
        And I enter 'N'
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Starts with parameter on Phase column
        Given I am on "filter-row-atom-basic"
        When I click filter button [3]
        And I click three-dot button
        And I select "starts with" condition
        And I enter "L"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Ends with parameter on Color column
        Given I am on "filter-row-atom-basic"
        When I click filter button [4]
        And I click three-dot button
        And I select "ends with" condition
        And I enter "0"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Is empty parameter on Appearance column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Appearance' column
        And I click filter button [5]
        And I click three-dot button
        And I select "is empty" condition
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Like parameter on Group Block column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Group Block' column
        And I click filter button [6]
        And I click three-dot button
        And I select "like" condition
        And I enter "me"
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Contains parameter on Bonding Type
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Bonding Type' column
        And I click filter button [7]
        And I enter "bla"
        And I click Select all
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Is not empty parameter on Summary column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Summary' column
        And I click filter button [8]
        And I click three-dot button
        And I select "is not empty" condition
        And I click "Apply"
        And I scroll table till 'Summary' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Less than or equals parameter on Period column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I click filter button [9]
        And I click three-dot button
        And I select "less than or equals" condition
        And I enter "2"
        And I click "Apply"
        And I scroll table till 'Period' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Greater than parameter on Radius column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I click filter button [10]
        And I click three-dot button
        And I select "greater than" condition
        And I enter "190"
        And I click "Apply"
        And I scroll table till 'Radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Greater than or equals parameter on Mass column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I click filter button [11]
        And I click three-dot button
        And I select "greater than or equals" condition
        And I enter "270"
        And I click "Apply"
        And I scroll table till 'Mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Greater than or equals parameter on Boil column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I click filter button [12]
        And I click three-dot button
        And I select "greater than or equals" condition
        And I enter "5000"
        And I click "Apply"
        And I scroll table till 'Boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Between parameter on Density column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I click filter button [13]
        And I enter "1" and "2" value
        And I click "Apply"
        And I scroll table till 'Density' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Less than parameter on Melt column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I click filter button [14]
        And I click three-dot button
        And I select "less than" condition
        And I enter "10"
        And I click "Apply"
        And I scroll table till 'Melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Contains parameter on Shells column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I click filter button [15]
        And I enter "25"
        And I click Select all
        And I click "Apply"
        And I scroll table till 'Shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Is empty parameter on Named By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I click filter button [16]
        And I click three-dot button
        And I select "is empty" condition
        And I click "Apply"
        And I scroll table till 'Named By' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Is not empty parameter on Discovered By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I click filter button [17]
        And I click three-dot button
        And I select "is not empty" condition
        And I click "Apply"
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Greater than parameter on Discovered In column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I click filter button [18]
        And I click three-dot button
        And I select "greater than" condition
        And I enter "1999"
        And I click "Apply"
        And I scroll table till 'Discovered In' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after Ends with parameter on Source column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I click filter button [19]
        And I click three-dot button
        And I select "ends with" condition
        And I enter "c"
        And I click "Apply"
        And I scroll table till 'Source' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Number column
        Given I am on "filter-row-atom-basic"
        When I enter '1' value into input field of 'number' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Symbol column
        Given I am on "filter-row-atom-basic"
        When I enter 'C' value into input field of 'symbol' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Name column
        Given I am on "filter-row-atom-basic"
        When I enter 'Neon' value into input field of 'name' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Phase column
        Given I am on "filter-row-atom-basic"
        When I enter 'Gas' value into input field of 'phase' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Color column
        Given I am on "filter-row-atom-basic"
        When I enter 'CC80FF' value into input field of 'color' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Appearance column
        Given I am on "filter-row-atom-basic"
        When I enter 'silvery' value into input field of 'appearance' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Group Block column
        Given I am on "filter-row-atom-basic"
        When I enter 'metal' value into input field of 'groupBlock' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Bonding Type column
        Given I am on "filter-row-atom-basic"
        When I enter 'diatomic' value into input field of 'bondingType' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Period column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Period' column
        And I enter '2' value into input field of 'period' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Radius column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Radius' column
        And I enter '0' value into input field of 'radius' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Mass column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Mass' column
        And I enter '2' value into input field of 'mass' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Boil column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Boil' column
        And I enter '2' value into input field of 'boil' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Density column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Density' column
        And I enter '1' value into input field of 'density' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Melt column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Melt' column
        And I enter '14' value into input field of 'melt' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Shells column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Shells' column
        And I enter '2, 1' value into input field of 'shells' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Named By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Named By' column
        And I enter 'Humphry Davy' value into input field of 'namedBy' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Discovered By column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered By' column
        And I enter 'Humphry Davy' value into input field of 'discoveredBy' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Discovered In column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Discovered In' column
        And I enter '1700' value into input field of 'discoveredIn' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter for Source column
        Given I am on "filter-row-atom-basic"
        When I scroll table till 'Source' column
        And I enter 'en' value into input field of 'source' column
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter-row-atom-basic is the same after second row filter combination
        Given I am on "filter-row-atom-basic"
        When I enter '99' value into input field of 'number' column
        And I enter 'Solid' value into input field of 'phase' column
        And I enter 'metal' value into input field of 'groupBlock' column
        And I scroll table till 'Radius' column
        And I enter '146' value into input field of 'radius' column
        And I look at the Page
        Then Page looks the same as before





