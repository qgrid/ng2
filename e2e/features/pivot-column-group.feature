Feature: Pivot Column Group

    Scenario: pivot-column-group is the same after expand few groups
    	Given I am on "pivot-column-group"
		When I expand group[0]
        And I expand group[0]
        And I expand group[3]
		And I look at the Page
		Then Page looks the same as before

    Scenario: pivot-column-group is the same after collapse few groups
    	Given I am on "pivot-column-group"
		When I expand group[0]
        And I expand group[0]
        And I expand group[3]      
        And I collapse group[0]
        And I collapse group[0]        
		And I look at the Page
		Then Page looks the same as before
