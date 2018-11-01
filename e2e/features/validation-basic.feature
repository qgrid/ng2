Feature: Validation basic
	Scenario:  Check "required" rule
		Given I am on "validation-basic"
		When I click cell "summary"[0]
		Then Input value equals to "Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass."
