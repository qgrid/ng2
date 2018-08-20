Feature: Edit cell basic

	Scenario: Save input chages when close cell editor
        Given I am on "edit-cell-basic"
        Then I open cell editor
        Then I change input value
        Then I close cell editor