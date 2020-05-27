Feature: On Push Basic

    Scenario: on-push-basic is the same after drag n drop row
    	Given I am on "on-push-basic"
        When I drag n drop row
		And I look at the Page
		Then Page looks the same as before