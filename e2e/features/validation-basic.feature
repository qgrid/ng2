Feature: Validation basic

	Scenario: validation-basic page is the same after clicking on Required cell
		Given I am on "validation-basic"
		When I click cell "number"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Required cell value
		Given I am on "validation-basic"
		When I click cell "number"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after filling Required cell value
		Given I am on "validation-basic"
		When I click cell "number"[0]
		And I set "0" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Required cell
		Given I am on "validation-basic"
		When I click cell "number"[0]
		And I enter "0" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Length Restrictions cell
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I look at the Page 
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Length Restrictions cell value
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if text shorter than Length Restrictions
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I set "Ab" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if text length equal lower Length Restrictions
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I set "AbC" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if text length equal greater Length Restrictions
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I set "123456789 123456789 123456789 123456789 " text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if text longer than Length Restrictions
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I set "123456789 123456789 123456789 123456789 A" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Length Restrictions
		Given I am on "validation-basic"
		When I click cell "name"[0]
		And I enter "123456789 123456789 123456789 123456789 " text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Collection cell
		Given I am on "validation-basic"
		When I click cell "phase"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Collection cell value
		Given I am on "validation-basic"
		When I click cell "phase"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set Collection cell value wrong
		Given I am on "validation-basic"
		When I click cell "phase"[0]
		And I set "Aaaaa" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set Collection cell value correct
		Given I am on "validation-basic"
		When I click cell "phase"[0]
		And I set "Gas" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Collection
		Given I am on "validation-basic"
		When I click cell "phase"[0]
		And I enter "Solid" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Pattern cell
		Given I am on "validation-basic"
		When I click cell "color"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see no tip after erasing Pattern cell value
		Given I am on "validation-basic"
		When I click cell "color"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set Pattern cell value wrong
		Given I am on "validation-basic"
		When I click cell "color"[0]
		And I set "123" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set Pattern cell value correct 
		Given I am on "validation-basic"
		When I click cell "color"[0]
		And I set "EEDDAA" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Pattern
		Given I am on "validation-basic"
		When I click cell "color"[0]
		And I enter "CCFFCC" text
		And I look at the Page
		Then Page looks the same as before

