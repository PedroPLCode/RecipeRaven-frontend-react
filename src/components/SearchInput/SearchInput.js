import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateIngredients, getIngredients } from '../../redux/ingredientsReducer';
import { updateGlutenFree, getGlutenFree } from "../../redux/glutenFreeReducer";
import { updateVegan, getVegan } from "../../redux/veganReducer";
import { updateVegetarian, getVegetarian } from "../../redux/vegetarianReducer";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

const SearchInput = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const glutenFree = useSelector(state => getGlutenFree(state));
  const vegan = useSelector(state => getVegan(state));
  const vegetarian = useSelector(state => getVegetarian(state));

  const handleIngredientsSet = value => {
    dispatch(updateIngredients(value));
  }

  const handleGlutenFreeCheckBox = value => {
    dispatch(updateGlutenFree(value));
  }

  const handleVeganCheckBox = value => {
    dispatch(updateVegan(value));
  }

  const handleVegetarianCheckBox = value => {
    dispatch(updateVegetarian(value));
  }

  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center gap-4">
      <h3>Food Search component</h3>  
      <form className="d-flex flex-column justify-content-center align-items-center gap-4">
        <div className="d-flex flex-row justify-content-between align-items-between gap-2">
          <h5>Ingredients</h5> 
          <input type="text" placeholder="Inigredients..." value={ingredients} onChange={event => handleIngredientsSet(event.target.value)} />
          <input type="checkbox" id="vegetarian" name="vegetarian" value={vegetarian} checked={vegetarian} onChange={event => handleVegetarianCheckBox(event.target.checked)}/>
          <label for="vegetarian">vegetarian</label>
          <input type="checkbox" id="vegan" name="vegan" value={vegan} checked={vegan} onChange={event => handleVeganCheckBox(event.target.checked)}/>
          <label for="vegan">vegan</label>
          <input type="checkbox" id="glutenfree" name="glutenfree" value={glutenFree} checked={glutenFree} onChange={event => handleGlutenFreeCheckBox(event.target.checked)} />
          <label for="glutenfree">glutenfree</label>
        </div> 
      </form>
      <Link className='col-12 d-flex flex-row justify-content-center align-items-center' to={`/results`}>
        <Button className='col-1' variant="primary">
          SEARCH
        </Button>
      </Link>
    </div>
  );
}

export default SearchInput;