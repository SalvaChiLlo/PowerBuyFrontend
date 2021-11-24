const email = `prueba${Date.now().toString().slice(5, -1)}@mail.com`;
const pass = '12345678';

describe('Vamos a probar el que el inicio de sesión funcione correctamente', () => {
  it('Vamos a la página de inicio de registro', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/home');
    cy.get('.d-flex > .btn').click();
    cy.location('pathname').should('eq', '/signin');
    cy.get('.mt-3 > a').click();
    cy.location('pathname').should('eq', '/signup');
  });

  it('Creamos un usuario e iniciamos sesión', () => {
    cy.get('#email').clear({ force: true }).type(email, { force: true });
    cy.get('#username').clear({ force: true }).type(email, { force: true });
    cy.get('#password').clear({ force: true }).type(pass, { force: true });

    cy.get(':nth-child(7) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/home');
    cy.get('.btn > .img-container > img').should('exist');
  });

  it('Accedemos a un producto', () => {
    cy.wait(4000)
    cy.get(':nth-child(1) > .product > .card > .row > .col-8 > .card-body').click({ force: true });
    cy.get('.mat-snack-bar-container').should('not.exist')
  });

  it('Compramos un producto', () => {
    cy.get('.product-price > .btn').click({ force: true });
  });

  it('Existe mensaje de compra', () => {
    cy.get('.mat-snack-bar-container').should('be.visible')
  });

  it('Producto anyadido a la cesta', () => {
    cy.get('.d-flex > .mat-icon').click({ force: true });
    cy.get('app-product-card').then(cards => {
      expect(cards.length).to.be.equal(1)
    });
  });

  it('Finalizamos la compra', () => {
    cy.get(':nth-child(4) > .btn').click({ force: true });
    cy.get('.modal-body').should('be.visible')
  });

  it('Cerramos sesión', () => {
    cy.get('.btn > .img-container > img').should('exist').click();

    cy.get(
      '.d-flex > .dropdown > .dropdown-menu > :nth-child(4) > .dropdown-item'
    ).click();
    cy.get('.d-flex > .btn').should('exist').click({ force: true });
  })
});
