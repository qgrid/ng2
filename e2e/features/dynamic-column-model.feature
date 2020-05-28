Feature: Dynamic Column Model

	Scenario: dynamic-column-model is the same after adding some columns
		Given I am on "dynamic-column-model"
		When I click " Add Column To Left " button
		And I click " Add Column To Right " button
		And I click " Add Column To Middle " button
		And I click " Add Group " button
		And I look at the Page
		Then Page looks the same as before

	Scenario: dynamic-column-model is the same after adding and resetting columns
		Given I am on "dynamic-column-model"
		When I click " Add Column To Left " button
		And I click " Reset " button
		And I click " Add Column To Middle " button
		And I click " Add Group " button
		And I look at the Page
		Then Page looks the same as before