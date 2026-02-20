// ***********************************************************
// This file is automatically processed when loading Cypress.
// https://on.cypress.io/configuration
// ***********************************************************

require('@4tw/cypress-drag-drop');

Cypress.on('uncaught:exception', (err, runnable) => {
  // ignore internal errors from DemoQA
  if (
    err.message.includes('Script error') || // ignore script errors
    err.message.includes('cross origin') || // ignore cross origin errors
    err.message.includes('findDOMNode is not a function') // ignore findDOMNode is not a function errors
  ) {
    return false;
  }
  return true; // allow other errors to fail the test
});
