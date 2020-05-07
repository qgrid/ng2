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



	Scenario: validation-basic page is the same after clicking on Summary cell
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Summary cell value
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if text shorter than restrictions for Summary
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I set "Lor" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if text length equal to restriction for Summary
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I set "Lorem" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if text length greater than restriction for Summary
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I set "Lorem ipsum" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Summary
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		And I enter "Lorem ipsum" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Integer cell
		Given I am on "validation-basic"
		When I click cell "radius"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Integer cell value
		Given I am on "validation-basic"
		When I click cell "radius"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set Integer cell value wrong
		Given I am on "validation-basic"
		When I click cell "radius"[0]
		And I set "Lorem ipsum" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set Integer cell value correct
		Given I am on "validation-basic"
		When I click cell "radius"[0]
		And I set "1221" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Integer
		Given I am on "validation-basic"
		When I click cell "radius"[0]
		And I enter "13" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Integer w Restrictions cell
		Given I am on "validation-basic"
		When I click cell "period"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip after erasing Integer w Restrictions cell value
		Given I am on "validation-basic"
		When I click cell "period"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set Integer w Restrictions cell value wrong
		Given I am on "validation-basic"
		When I click cell "period"[0]
		And I set "123" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set Integer w Restrictions cell value correct
		Given I am on "validation-basic"
		When I click cell "period"[0]
		And I set "9" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Integer w Restrictions
		Given I am on "validation-basic"
		When I click cell "period"[0]
		And I enter "4" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on Decimal cell
		Given I am on "validation-basic"
		When I click cell "mass"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see no tip after erasing Decimal cell value
		Given I am on "validation-basic"
		When I click cell "mass"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set Decimal cell value wrong
		Given I am on "validation-basic"
		When I click cell "mass"[0]
		And I set "1.0.4.8." text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set Decimal cell value correct
		Given I am on "validation-basic"
		When I click cell "mass"[0]
		And I set "1221.13" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing Decimal
		Given I am on "validation-basic"
		When I click cell "mass"[0]
		And I enter "99.99" text
		And I look at the Page
		Then Page looks the same as before



	Scenario: validation-basic page is the same after clicking on URL cell
		Given I am on "validation-basic"
		When I click cell "source"[0]
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see no tip after erasing URL cell value
		Given I am on "validation-basic"
		When I click cell "source"[0]
		And I clear text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see tip if set URL cell value wrong
		Given I am on "validation-basic"
		When I click cell "source"[0]
		And I set "1.0.4.8." text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page if set URL cell value correct
		Given I am on "validation-basic"
		When I click cell "source"[0]
		And I set "https://en.wikipedia.org/wiki/Hydrogen2" text
		And I look at the Page
		Then Page looks the same as before

	Scenario: validation-basic user see same page after editing URL
		Given I am on "validation-basic"
		When I click cell "source"[0]
		And I enter "https://en.wikipedia.org/wiki/Hydrogen3" text
		And I look at the Page
		Then Page looks the same as before