describe('Progress Bar - DemoQA', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('stops before 25%, validates value and lets it reach 100%', () => {
    // 1. Choose Widgets in the initial page
    cy.contains('Widgets').click();

    // 2. Click on the submenu Progress Bar
    cy.contains('Progress Bar').click();

    // 3. Click on the Start button
    cy.get('#startStopButton').click();

    // 4. Stop before 25% (wait a bit and click Stop)
    cy.wait(400);
    cy.get('#startStopButton').click();

    // 5. Validate that the progress bar value is less than or equal to 25%
    cy.get('.progress-bar, [role="progressbar"]').first().then(($el) => {
      const ariaVal = $el.attr('aria-valuenow'); // get the aria-valuenow attribute
      const text = ($el.text() || '').trim().replace('%', ''); // get the text of the progress bar
      const width = $el.css('width') || $el.attr('style') || ''; // get the width attribute
      const widthMatch = width.match(/(\d+(?:\.\d+)?)%/); // regex to extract the percentage from the width attribute
      const fromWidth = widthMatch ? parseInt(widthMatch[1], 10) : NaN;// convert the width to an integer
      const num = !isNaN(parseInt(ariaVal, 10)) ? parseInt(ariaVal, 10)
        : !isNaN(parseInt(text, 10)) ? parseInt(text, 10)
        : !isNaN(fromWidth) ? fromWidth : 0;// convert the aria-valuenow or text to an integer
      expect(num, 'progress value').to.be.at.most(25);// validate that the progress value is less than or equal to 25
    });

    // 6. Click Start again and wait to reach 100%
    cy.get('#startStopButton').click();
    cy.get('.progress-bar, [role="progressbar"], #progressBar', { timeout: 35000 }).first().should(($el) => { // get the progress bar
      const ariaVal = $el.attr('aria-valuenow');
      const text = ($el.text() || '').trim().replace('%', ''); // get the text of the progress bar
      const val = !isNaN(parseInt(ariaVal, 10)) ? parseInt(ariaVal, 10) : parseInt(text, 10); // convert the aria-valuenow or text to an integer
      expect(val).to.eq(100); // validate that the progress value is 100
    });
  });
});
