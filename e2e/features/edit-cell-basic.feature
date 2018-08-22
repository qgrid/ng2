Feature: Edit cell basic

	Scenario: Cell(text) value changed on cell editor close
        Given I am on "edit-cell-basic"
        When I click on cell of class q-grid-"text"
        Then Editor value
        When I change editor value to "newValue"
        Then Editor new value equals to "newValue" 
        When I close editor via Enter key
        Then Cell new value equals to "text" "newValue"
    
    Scenario: Cell(number) value changed on cell editor close
        Given I am on "edit-cell-basic"
        When I click on cell of class q-grid-"number"
        Then Editor value
        When I change editor value to "12345"
        Then Editor new value equals to "12345"
        When I close editor via Enter key
        Then Cell new value equals to "number" "12,345"