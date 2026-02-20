describe('Sortable - DemoQA', () => {
  beforeEach(() => {
    // 1. Access the site (already in /) -> Choose Interactions in the initial page
    cy.visit('/');
  });

  it('sorts the elements in ascending order via drag and drop', () => {
    // 1. Choose Interactions in the initial page
    cy.contains('Interactions').click();

    // 2. Click on the submenu Sortable
    cy.contains('Sortable').click();

    // 3. In the List tab, items: One, Two, Three, Four, Five, Six
    const ascendingOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

    ascendingOrder.forEach((item, index) => {
      const targetPosition = index + 1;
      cy.get('.list-group-item').contains(item).drag(`.list-group-item:nth-child(${targetPosition})`);
    });

    // Validate final order
    cy.get('.list-group-item').then(($items) => {
      const texts = [...$items].map((el) => el.innerText.trim());
      expect(texts).to.deep.equal(ascendingOrder);
    });
  });
});
