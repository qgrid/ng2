Feature: Pin Column Basic

    Scenario: pin-column-basic is the same after scroll to bottom
    	Given I am on "pin-column-basic"
        When I scroll table with pinned columns to far bottom
		And I look at the Page
		Then Page looks the same as before

    Scenario: pin-column-basic is the same after scroll to right border
    	Given I am on "pin-column-basic"
        When I scroll table with pinned columns to far right
		And I look at the Page
		Then Page looks the same as before