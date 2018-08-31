# E2E

## Launch all features

```bash
npm run e2e
```

## Launch specific feature

```bash
npm run e2e -- --specs=e2e/features/pagination-basic.feature
```

## Good practice

(https://github.com/strongqa/howitzer/wiki/Cucumber-Best-Practices)


***

**Features** = User Requirements Specification
**Scenarios** = Functional & Non-functional Specification

***

## Construction of User Story - Feature

1. Clear title

Good                                                |Bad                          |
----------------------------------------------------|-----------------------------|
Feature: User edits text in cell                    |Feature: Using QGrid         |

2. Clear business goal

**As** a qgrid user
**I want** to edit text
**So that** cell text gets different

***

## Construction of User Story - Scenario

#### Describing of functional requirments: 

1. User Action

**When** I click cell : column **`<column>`** , row **`<row>`**
**And** I enter **`<text>`**
**And** I press ENTER key

2. System Reaction

**Then** Value has been changed to **`<text>`**
**And** is assigned to proper cell based on **`<column>`**, **`<row>`**

#### Describing of non-functional requirments: 

**Given** I am an Authorized User
**And** I operate between 9 to 17
**And** less than 1000 users are logged in

**When** I open XYZ page
**Then** it loads in less than 5 seconds


## Common scenarios
|Action |Standartized description|
|-------|------------------------|
|Click cell |Feature: Using QGrid|
