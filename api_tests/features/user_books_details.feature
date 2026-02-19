Feature: User details and book collection (Account)

  Scenario: Fetch user details with valid token
    Given I have a valid token
    And I have a valid userId
    When I fetch the created user details
    Then the user details are returned successfully

  Scenario: Fetch user details and verify 2 books in collection
    Given the BookStore is available
    And I have a valid token
    And I have a valid userId
    When I request the available books from the store
    Then the book list is returned successfully
    When I add 2 random books to the user collection
    Then the books are added to the collection successfully
    When I fetch the created user details
    Then the user details are returned successfully
    And the user has exactly 2 books in the collection
    And the books in the collection are the ones that were added
