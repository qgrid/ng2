Feature: Scroll Virtual Height

    Scenario: scroll-virtual-height is the same after scroll down
        Given I am on "scroll-virtual-height"
		When I scroll page down [1024000]
        And I look at the Page
		Then Page looks the same as before

    Scenario: scroll-virtual-height  is the same after scroll up
        Given I am on "scroll-virtual-height"
		When I scroll page down [4096000]
        And I scroll page up [102400]
        And I look at the Page
		Then Page looks the same as before