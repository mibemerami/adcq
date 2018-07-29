Feature: start page

Background: Logged in.
    Given I am logged in

@startPage
Scenario: 
    When I open the start page
    Then I can see a "Atlassian Docu Control Questions" in the nav-bar



