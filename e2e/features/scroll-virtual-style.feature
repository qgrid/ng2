Feature: Scroll Virtual Style

    Scenario: scroll-virtual-style is the same after scroll down
        Given I am on "scroll-virtual-style"
		When I scroll page down [1024]
        And I look at the Page
		Then Page looks the same as before

    Scenario: scroll-virtual-style is the same after scroll up
        Given I am on "scroll-virtual-style"
		When I scroll page down [4096]
        And I scroll page up [1024]
        And I look at the Page
		Then Page looks the same as before