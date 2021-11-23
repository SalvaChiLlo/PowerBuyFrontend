describe('Prueba sobre visualizacion de producto', () => {
    it('Prueba sobre la barra de progreso', () => {
      cy.visit('http://localhost:4200/product/1');
      cy.wait(5000)
      cy.get('.col > .progress > .progress-bar').should('exist')
    })

    it('Prueba imagenes', () => {
        cy.get('.active > .d-block').should('exist')
        cy.get('.carousel-control-prev').should('exist').click()
        cy.get('.active > .d-block').should('exist')
        cy.wait(1000)
        cy.get('.carousel-control-next').should('exist').click()
        cy.get('.active > .d-block').should('exist')
      })
  })