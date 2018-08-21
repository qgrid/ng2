Feature: Edit cell basic

	Scenario: Cell value changed on cell editor close
        Given I am on "edit-cell-basic"
        When I open editor of type "text"
        Then Editor value
        When I change editor value to "newValue"
        Then Editor new value equals to "newValue" 
        When I close editor via Enter key
        Then Cell new value equals to "newValue"