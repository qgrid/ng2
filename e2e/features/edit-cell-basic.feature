Feature: Edit cell basic

	Scenario: Cell value changed on cell editor close
        Given I am on "edit-cell-basic"
        When I click on cell of type text
        Then Editor value
        When I change editor value
        Then Editor new value
        When I close editor via Enter key
        Then Editor value should be saved