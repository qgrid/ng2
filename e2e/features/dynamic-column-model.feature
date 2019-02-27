Feature: Dynamic Column Model

	Scenario: dynamic-column-model is the same after clicking buttons
		Given I am on "dynamic-column-model"
		When I click " Add Group " button
		And I click " Add Column To Left " button
		And I click " Add Column To Middle " button
		And I click " Add Column To Right " button
		And I look at the Page
		Then Page looks the same as before
		
	Scenario: dynamic-column-model is the same after resetting
		Given I am on "dynamic-column-model"
		When I click " Add Group " button
		And I click " Add Column To Left " button
		And I click " Add Column To Middle " button
		And I click " Add Column To Right " button
		And I click " Reset " button
		And I look at the Page
		Then Page looks the same as before