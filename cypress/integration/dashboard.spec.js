describe('Feedback Loop login flows', () => {
  it('Should confirm that true is equal to true', () => {
    expect(true).to.equal(true)
  });
});

describe('Dashboard inital page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders.json'})
    cy.visit('http://localhost:3000')
      .get('h1').contains('Burrito Builder')
      .get('.form-container').contains('Instructions: Submit your name and choose at least one ingredient.')
      .get('form').get('input').get('[name="beans"]').get('[name="steak"]').get('[name="carnitas"]').get('[name="sofritas"]').get('[name="lettuce"]').get('[name="queso fresco"]').get('[name="pico de gallo"]').get('[name="hot sauce"]').get('[name="guacamole"]').get('[name="jalapenos"]').get('[name="cilantro"]').get('[name="sour cream"]')
      .get('form > p').contains('Order: Nothing selected')
      .get('.submit-button').contains('Submit Order')
  })

  it('Should be able to visit the page and see a form', () => {
  })
})