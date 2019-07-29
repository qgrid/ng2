Feature: Action bar on enter

	Scenario: action-bar-on-enter is the same
		Given I am on "action-bar-on-enter"
		When I look at the Page
		Then Page looks the same as before

	Scenario: action-bar-on-enter show actions on enter
		Given I am on "action-bar-on-enter"
        When I select [3] row in the table
		And I press ENTER button
		And I look at the Page
		Then Page looks the same as before