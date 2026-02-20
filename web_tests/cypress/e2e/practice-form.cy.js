const { faker } = require('@faker-js/faker');

describe('Practice Form - DemoQA', () => {
  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
    mobile: faker.string.numeric(10),
    dateOfBirth: { year: '1990', month: 'January', day: '15' },
    subjects: 'English',
    address: faker.location.streetAddress({ useFullAddress: true }),
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('fills the form, submits, verifies popup and closes', () => {
    // 1. Access the site (already in /) -> Choose Forms in the initial page
    cy.contains('Forms').click();

    // 2. Click on the submenu Practice Form
    cy.contains('Practice Form').click();

    // 3. Fill the form with random values
    cy.get('#firstName').type(testData.firstName);
    cy.get('#lastName').type(testData.lastName);
    cy.get('#userEmail').type(testData.email);

    cy.get(`input[value="${testData.gender}"]`).check({ force: true });
    cy.get('#userNumber').type(testData.mobile);

    // Date of Birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(testData.dateOfBirth.month);
    cy.get('.react-datepicker__year-select').select(testData.dateOfBirth.year);
    cy.get('.react-datepicker__day--015').click();

    // Subjects
    cy.get('#subjectsInput').type(testData.subjects).type('{enter}');

    // Hobbies (check at least one)
    cy.get('#hobbies-checkbox-1').check({ force: true });

    // Upload the .txt file
    cy.get('#uploadPicture').selectFile('cypress/fixtures/sample-upload.txt', { force: true });

    // Address
    cy.get('#currentAddress').type(testData.address);

    // State and City (react-select: type + Enter is more reliable)
    cy.get('#state').click();
    cy.focused().type('NCR{enter}');
    cy.get('#city').click();
    cy.focused().type('Delhi{enter}');

    // 4. Submit the form
    cy.get('#submit').click();

    // 5. Ensure that a popup was opened after the submit
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');

    // 6. Close thxe popup (force avoids overlay; Escape as fallback in DemoQA)
    cy.get('#closeLargeModal').click({ force: true });
    cy.get('body').type('{esc}');
    cy.get('.modal-content').should('not.exist');
  });
});
