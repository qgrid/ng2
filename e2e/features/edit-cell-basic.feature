Feature: User edits value in cell

As a qgrid user
I want to edit cell value
So changes in cell-editor should change value in cell

	Scenario: User edits value in cell of column text
        Given I am on "edit-cell-basic"
        When I click cell of column "text"
        And I change editor value to "newValue"
        And I press ENTER key
        Then Value has been changed to "newValue"

    Scenario: User edits value in cell of column number
        Given I am on "edit-cell-basic"
        When I click cell of column "number"
        And I change editor value to "12345"
        And I press ENTER key
        Then Value has been changed to "12,345"