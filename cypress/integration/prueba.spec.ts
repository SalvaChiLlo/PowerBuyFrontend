describe('Prueba', () => {
  it('Prueba', () => {
    cy.visit('http://localhost:4200');
    cy.wait(15000)
    cy.get('body').should('exist')
  })
})
