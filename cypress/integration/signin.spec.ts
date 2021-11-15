const email = `prueba${Date.now().toString().slice(5, -1)}@mail.com`
const pass = '12345678'

describe('Vamos a probar el que el inicio de sesión funcione correctamente', () => {
  it('Vamos a la página de inicio de registro', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/home')
    cy.get('.d-flex > .btn').click();
    cy.location('pathname').should('eq', '/signin')
    cy.get('.mt-3 > a').click();
    cy.location('pathname').should('eq', '/signup')
  });

  it('Creamos un usuario y cerramos sesión', () => {
    cy.get('#email').clear({ force: true }).type(email, { force: true });
    cy.get('#username').clear({ force: true }).type(email, { force: true });
    cy.get('#password').clear({ force: true }).type(pass, { force: true });

    cy.get(':nth-child(7) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/home');
    cy.get('.btn > .img-container > img').should('exist').click();
    cy.get('.d-flex > .dropdown > .dropdown-menu > :nth-child(3) > .dropdown-item').click();
    cy.get('.d-flex > .btn').should('exist').click({ force: true });
  })

  it('Iniciamos sesión y probamos las validaciones', () => {
    cy.get(':nth-child(5) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/signin');
    cy.get('.alert').should('exist');
    cy.get('.input-error').then(errors => {
      expect(errors.length).to.eq(2);
    })

    cy.get('#email').type('prueba', { force: true });

    cy.get(':nth-child(5) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/signin');
    cy.get('.alert').should('exist');
    cy.get('.input-error').then(errors => {
      expect(errors.length).to.eq(2);
    })

    cy.get('#email').clear({ force: true }).type(email, { force: true });

    cy.get(':nth-child(5) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/signin');
    cy.get('.alert').should('exist');
    cy.get('.input-error').then(errors => {
      expect(errors.length).to.eq(1);
    })

    cy.get('#password').type('123456', { force: true });

    cy.get(':nth-child(5) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/signin');
    cy.get('.alert').should('exist');
    cy.get('.input-error').then(errors => {
      expect(errors.length).to.eq(1);
    })

    cy.get('#password').clear({ force: true }).type(pass, { force: true });

    cy.get(':nth-child(5) > .col > .btn').click();
    cy.wait(2000);
    cy.location('pathname').should('eq', '/home');
    cy.get('.btn > .img-container > img').should('exist').click();
  })

  it('Probamos la ruta protegida', () => {
    cy.visit('http://localhost:4200/signin');
    cy.wait(1000);
    cy.location('pathname').should('eq', '/home')
    cy.visit('http://localhost:4200/singup');
    cy.wait(1000);
    cy.location('pathname').should('eq', '/home')
  })

  it('Cerramos sesión', () => {
    cy.get('.btn > .img-container > img').should('exist').click();
    cy.get('.d-flex > .dropdown > .dropdown-menu > :nth-child(3) > .dropdown-item').click({ force: true });
    cy.get('.d-flex > .btn').should('exist');
  })
})
