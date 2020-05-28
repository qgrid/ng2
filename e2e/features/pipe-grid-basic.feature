Feature: Pipe Grid Basic

    Scenario: pipe-grid-basic is the same after scrolling
    	Given I am on "pipe-grid-basic"
        When I scroll bottom right corner
		And I look at the Page
		Then Page looks the same as before