@questionsRun
Feature: Questions Run

Background: Start questions run
    Given I am logged in 
    And I click the link to a question run

Scenario: Back button on start
    When the questions run starts
    And I note every element on the questions run page
    And I click back 
    Then nothing changes on the questions run page

Scenario: Forward button
    When the questions run starts
    Then I can see the question text
    When I click next
    Then the answer text appears
    When I click next
    Then I can see the question text
    And the answer text disappears

Scenario: Back button in test run 
    When the questions run starts
    And I click next
    And the answer text appears
    And I click next
    And I can see the question text
    And I note every element on the questions run page
    And I click back
    Then I can see every element like noted before 





