Feature: Details row start

	Scenario: Expand button does not throw exception
		Given I am on "details-row-start"
		When I click expand button
		Then Browser console does not contains warning or error messages
