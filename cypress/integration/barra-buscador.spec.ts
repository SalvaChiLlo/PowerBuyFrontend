describe('Vamos a probar la búsqueda de productos', () => {
  it('Comprobamos que existe la barra del buscador', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/home')
    cy.wait(15000)
    cy.get('#search1').should('exist');
  });

  it('Buscamos productos de oneplus', () => {
    cy.get('#search1').type('oneplus', { force: true });
    cy.get('.ng-untouched > .btn').click({ force: true });
    cy.get('.card-title').contains('oneplus', { matchCase: false })
  })

  it('Buscamos con algo ilegible', () => {
    cy.get('#search1').clear({ force: true }).type('uhisdfjsdjduipdf', { force: true });
    cy.get('.ng-untouched > .btn').click({ force: true });
    cy.get('.card-title').should('not.exist')
  })

  it('Comprobamos que vuelven a aparecer todos los productos', () => {
    cy.get('#search1').clear({ force: true });
    cy.get('.ng-untouched > .btn').click({ force: true });
    cy.get('.card > .row > .col-8 > .card-body > .card-title').then(card => {
      expect(card.length).equal(48)
    });
  });
})
