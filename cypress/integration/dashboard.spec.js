describe('Feedback Loop login flows', () => {
  it('Should confirm that true is equal to true', () => {
    expect(true).to.equal(true)
  });
});

describe('Dashboard inital page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders.json'})

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {fixture: 'neworder.json'})
    cy.visit('http://localhost:3000');
  })
  
  it('Should be able to visit the page and see a form with instructions and a submit button', () => {
    cy.get('h1').contains('Burrito Builder')
      .get('.form-container').contains('Instructions: Submit your name and choose at least one ingredient.')
      .get('form').get('input').get('[name="beans"]').get('[name="steak"]').get('[name="carnitas"]').get('[name="sofritas"]').get('[name="lettuce"]').get('[name="queso fresco"]').get('[name="pico de gallo"]').get('[name="hot sauce"]').get('[name="guacamole"]').get('[name="jalapenos"]').get('[name="cilantro"]').get('[name="sour cream"]')
      .get('form > p').contains('Order: Nothing selected')
      .get('.submit-button').contains('Submit Order')
  })

  it('Should be able to see intial orders with the order name, and a list of ingredients in each ', () => {
    cy.get('div[class="order"]').should('have.length', 3)
    cy.get('h3')
      .get('ul').first().should('have.class', 'ingredient-list')
      .children('li').should('have.length', 5 || 6)
  })

  it('User should be able to type in their name, select at least 1 ingredient, click submit, then see their order appear on the page', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {fixture: 'neworder.json'}
    })
    cy.visit('http://localhost:3000');

    cy.get('input').type('Jani')
      .get('button[name="beans"]').click()
      .get('button[name="lettuce"]').click()
      .get('button[name="carnitas"]').click()
      .get('button[name="queso fresco"]').click()
      .get('button[class="submit-button"]').click()
      .get('div[class="order"]').should('have.length', 3)
      .get('h3').last()
      .get('ul').first().should('have.class', 'ingredient-list')
      .children('li').should('have.length', 5)
  })
})