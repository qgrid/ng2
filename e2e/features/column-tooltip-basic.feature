Feature: Column Tooltip Basic

	Scenario: column-tooltip-basic is the same after hovering colunm title
		Given I am on "column-tooltip-basic"
		When I hover 'Name First' column title
        And I look at the Page
		Then Page looks the same as before