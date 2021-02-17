Feature: Filter for Name Last column

	Scenario: filter button appears after navigating to column title
		Given I am on "look-people-basic"
        When I hover "Name Last" column title
        And I look at the Page
		Then Page looks the same as before

    Scenario: filter popup appears after clicking on filter button
        Given I am on "look-people-basic"
        When I hover "Name Last" column title
        And I click filter button [1]
        And I look at the Page
        Then Page looks the same as before

    Scenario: filter popup disappears after clicking on Cancel button
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click "Cancel" button on pop-up
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Contains button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I enter "Da" text
        And I click "Select all" checkbox
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Like button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " like "
        And I enter "Da" text
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before   
    
    Scenario: filters with Not like button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " not like "
        And I enter "Da" text
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before  

    Scenario: filters with Starts with button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " starts with "
        And I enter "Po" text
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before     

    Scenario: filters with Ends with button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " ends with "
        And I enter "ro" text
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before 

    Scenario: filters with Is empty button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " is empty "
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before

    Scenario: filters with Is not empty button are applied
        Given I am on "look-people-basic"
        When I click filter button [1]
        And I click more button
        And I select condition " is not empty "
        And I click "Apply" button
        And I look at the Page
        Then Page looks the same as before

