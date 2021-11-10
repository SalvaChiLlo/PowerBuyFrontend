describe('Prueba', () => {
  it('Prueba', () => {
    cy.visit('http://localhost:2400');
    cy.wait(5000)
    cy.get('body').should('exist')
  })
})
