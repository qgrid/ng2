Feature: First look an all examples

	Scenario: All examples are the same as before
		Given I am on "/"
		When I look through all examples
		Then Examples are the same as before
		And There are no errors