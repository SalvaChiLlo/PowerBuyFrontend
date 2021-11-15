describe('Vamos a comprobar el funcionamiento de filtrado de categorías', () => {
  it('Comprobamos que existe el selector de categorías', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/home')
    cy.wait(5000)
    cy.get('div > .form-select').should('exist');
  });

  it('Ahora seleccionamos la opcion Apple', () => {
    cy.get('div > .form-select').select('Apple', { force: true });
  });

  it('Comprobamos que todos los productos que aparecen sea de Apple', () => {
    cy.get('.card > .row > .col-8 > .card-body > .card-title').each(card => {
      cy.wrap(card).contains('Apple', { matchCase: false })
    });
  });

  it('Ahora seleccionamos la opcion Asus', () => {
    cy.get('div > .form-select').select('Asus', { force: true });
  });

  it('Comprobamos que todos los productos que aparecen sea de Asus', () => {
    cy.get('.card > .row > .col-8 > .card-body > .card-title').each(card => {
      cy.wrap(card).contains('Asus', { matchCase: false })
    });
  });

  it('Ahora seleccionamos la opcion inicial', () => {
    cy.get('div > .form-select').select('0', { force: true });
  });

  it('Comprobamos que vuelven a aparecer todos los productos', () => {
    cy.get('.card > .row > .col-8 > .card-body > .card-title').then(card => {
      expect(card.length).equal(48)
    });
  });
});
