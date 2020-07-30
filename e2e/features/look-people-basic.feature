Feature: Look people basic

	Scenario: Grid is not empty
		Given I am on "look-people-basic"
		Then Grid is not empty

	Scenario: String Contains filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " contains "
		And I enter "lu" text
		And I click Select all
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Like filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " like "
		And I enter "au" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Not Like filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " not like "
		And I enter "a" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Starts With filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " starts with "
		And I enter "l" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Ends With filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " ends with "
		And I enter "ne" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Is empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " is empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: String Is not empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [0]
		And I click more button
		And I select condition " is not empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Contains filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " contains "
		And I enter "98" text
		And I click Select all
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Like filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " like "
		And I enter "84" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Less than filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " less than "
		And I enter "66840" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Less than or equals filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " less than or equals "
		And I enter "66840" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Greater than filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " greater than "
		And I enter "66840" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Greater than or equals filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " greater than or equals "
		And I enter "66840" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Between filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " between "
		And I enter "59000" and "60000"
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Is empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " is empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Int Is not empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [5]
		And I click more button
		And I select condition " is not empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Between filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " between "
		And I enter "01/17/1971" and "03/17/1971"
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Contains filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " contains "
		And I enter "1940" text
		And I click Select all
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Less than filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " less than "
		And I enter "02/17/1971" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Less than or equals filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " less than or equals "
		And I enter "02/17/1971" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Greater than filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " greater than "
		And I enter "02/17/1971" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Greater than or equals filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " greater than or equals "
		And I enter "02/17/1971" text
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Is empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " is empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before

	Scenario: Date Is not empty filter works fine
		Given I am on "look-people-basic"
		When I click filter button [3]
		And I click more button
		And I select condition " is not empty "
		And I click "Apply" button
		And I look at the Page
		Then Page looks the same as before
