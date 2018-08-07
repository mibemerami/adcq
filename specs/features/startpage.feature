@startPage
Feature: start page

Background: Logged in.
    Given I am logged in

Scenario: Open startpage
    When I open the start page
    Then I can see "Atlassian Docu Control Questions" as application title in the nav-bar
    And I can see the list of articles

Scenario: Article links
    When I click the link to the article of an item in the list
    Then a page of the atlassian documentaiton opens

Scenario: Test run links
    When I click the link to a question run 
    Then the questions run starts


