import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value});
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ ingredients: [e.target.value, ...this.state.ingredients] });
  }


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.length && this.state.ingredients.length) {
      this.props.addOrder(this.state);
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const userInstructions = !this.state.name.length || !this.state.ingredients.length ? <p><b>Instructions:</b> Submit your name <i>and</i> choose at least one ingredient.</p> : null;

    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button 
          key={ingredient} 
          name={ingredient} 
          value={ingredient} 
          onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <div class='form-container'>
          { userInstructions }
        <form>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={this.state.name}
            onChange={e => this.handleNameChange(e)}
          />

          { ingredientButtons }

          <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

          <button className='submit-button' onClick={e => this.handleSubmit(e)}>
            Submit Order
          </button>
        </form>
      </div>
    )
  }
}

export default OrderForm;
