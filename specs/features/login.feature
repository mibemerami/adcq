@login
Feature: Login 

Background: Open page
    Given I open the start page

Scenario Outline: User not logged in 
    When I am logged out
    Then I can see "<link-text>" in the nav-bar
    And I can see the login form

    Examples:
        | link-text |
        | Home      |
        | Login     |
        | Register  |

Scenario Outline: User logged in
    When I am logged in as administrator
    Then I can see "<link-text>" in the nav-bar
    And I can see the list of articles 

    Examples:
        | link-text      |
        | Home           |
        | Add Questions  |
        | Administration |
        | Logout         |




