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

      it('Prueba reseñas', () => {
        cy.get('.row.justify-content-center').should('exist')
        cy.get('.rating-box').should('exist')
        cy.get('.col-12 > :nth-child(2)').should('exist')
        cy.get(':nth-child(2) > .row.d-flex > .d-flex > .mt-2').should('exist')
        cy.get(':nth-child(2) > .row.d-flex > .d-flex > div > .text-left').should('exist')
        cy.get(':nth-child(2) > .row.d-flex > .ml-auto > .text-muted').should('exist')
        cy.get(':nth-child(2) > .row.text-left > .content').should('exist')
        cy.get(':nth-child(1) > .rating-bar').should('exist')
        cy.get(':nth-child(2) > .rating-bar').should('exist')
        cy.get(':nth-child(3) > .rating-bar').should('exist')
        cy.get(':nth-child(4) > .rating-bar').should('exist')
        cy.get(':nth-child(5) > .rating-bar').should('exist')
      })

      it('Prueba productos-recomendados', () => {
        cy.get('app-related-products').should('exist')
        cy.get('app-related-products > :nth-child(2) > :nth-child(1)').should('exist')
        cy.get('app-related-products > :nth-child(2) > :nth-child(2)').should('exist')
        cy.get('app-related-products > :nth-child(2) > :nth-child(3)').should('exist')
      })
  })