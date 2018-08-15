Feature: Pagination basic

	Scenario: Number of rows equals to 10
		Given I am on "pagination-basic"
		Then Row count equals to 10
	
	Scenario: When page size equals to 5 number of rows should be equal to 5
		Given I am on "pagination-basic"
		When I choose page size 5
		Then Row count equals to 5