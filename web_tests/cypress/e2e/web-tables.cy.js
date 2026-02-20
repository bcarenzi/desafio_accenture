const { faker } = require('@faker-js/faker');

describe('Web Tables - DemoQA', () => {
  // test data
  const newRegister = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: String(faker.number.int({ min: 22, max: 60 })),
    salary: String(faker.number.int({ min: 3000, max: 15000 })), // convert the salary to a string
    department: faker.commerce.department(), // get a random department
  };

  const newRegisterEdited = {
    firstName: faker.person.firstName(), // get a random first name
    lastName: faker.person.lastName(), // get a random last name
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('creates, edits and deletes a new record', () => {
    // 1. Choose Elements in the initial page
    cy.contains('Elements').click();

    // 2. Click on the submenu Web Tables
    cy.contains('Web Tables').click();

    // 3. Create a new record
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').clear().type(newRegister.firstName);
    cy.get('#lastName').clear().type(newRegister.lastName);
    cy.get('#userEmail').clear().type(newRegister.email);
    cy.get('#age').clear().type(newRegister.age);
    cy.get('#salary').clear().type(newRegister.salary);
    cy.get('#department').clear().type(newRegister.department);
    cy.get('#submit').click();
    cy.get('#addNewRecordButton', { timeout: 5000 }).should('be.visible'); // modal fechou

    // 4. Edit the new record created (uses email to locate - it is unique)
    cy.contains(newRegister.email, { timeout: 5000 }) // find the row containing the email
      .closest('.rt-tr-group, tr')
      .find('[title="Edit"]')
      .click({ force: true });
    cy.get('#firstName').clear().type(newRegisterEdited.firstName);
    cy.get('#lastName').clear().type(newRegisterEdited.lastName);
    cy.get('#submit').click();

    // 5. Delete the new record created (uses email to locate - it is unique)
    cy.contains(newRegister.email)
      .closest('.rt-tr-group, tr')
      .find('[title="Delete"]')
      .click({ force: true });

    // Verify that the record does not exist anymore
    cy.get('body').should('not.contain', newRegister.email);
  });
});
