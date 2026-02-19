Feature: Search for available books (BookStore)

  Scenario: Request the list of available books with success
    Given the BookStore is available
    When I request the available books from the store
    Then the book list is returned successfully
