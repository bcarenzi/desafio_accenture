describe('Browser Windows - DemoQA', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens a new window, validates the message and closes', () => {
    // 1. Choose Alerts, Frame & Windows in the initial page
    cy.contains('Alerts, Frame & Windows').click();

    // 2. Click on the submenu Browser Windows
    cy.contains('Browser Windows').click();

    // 3. Stub the window.open: instead of opening a new tab, navigate in the same (Cypress does not support multiple tabs)
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        win.location.href = url;
      });
    });

    // 4. Click on the New Window button
    cy.contains('button', 'New Window').click();

    // 5. Ensure that the new window was opened and validates the message
    cy.contains('This is a sample page').should('be.visible');

    // 6. Close the new window = go back to the previous page
    cy.go('back');
  });
});
