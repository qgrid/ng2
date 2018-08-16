Feature: Pagination basic

	Scenario: Number of rows is correct on start
		Given I am on "pagination-basic"
		Then Row count equals to 10
	
	Scenario: Number of rows is corresponding to the selected page size
		Given I am on "pagination-basic"
		When I choose page size 5
		Then Row count equals to 5