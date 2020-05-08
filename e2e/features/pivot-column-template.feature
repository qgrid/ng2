Feature: Pivot Column Template

    Scenario: pivot-column-template is the same when hover first level header
    	Given I am on "pivot-column-template"
		When I hover first level header[2]
		And I look at the Page
		Then Page looks the same as before

    Scenario: pivot-column-template is the same when hover second level header
    	Given I am on "pivot-column-template"
		When I hover second level header[6]
		And I look at the Page
		Then Page looks the same as before