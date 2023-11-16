import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateIngredients, getIngredients } from '../../redux/ingredientsReducer';
import { updateGlutenFree, getGlutenFree } from "../../redux/glutenFreeReducer";
import { updateAlcoholFree, getAlcoholFree } from "../../redux/alcoholFreeReducer";
import { updateSulfiteFree, getSulfiteFree } from "../../redux/sulfiteFreeReducer";
import { updateVegan, getVegan } from "../../redux/veganReducer";
import { updateVegetarian, getVegetarian } from "../../redux/vegetarianReducer";
import { updateKetoFriendly, getKetoFriendly } from "../../redux/ketoFriendlyReducer";
import { updateLowCarb, getLowCarb } from "../../redux/lowCarbReducer";
import { updateLowFat, getLowFat } from "../../redux/lowFatReducer";
import { updatePescatarian, getPescatarian } from "../../redux/pestacarianReducer";
import { updatePeenutFree, getPeenutFree } from "../../redux/peenutFreeReducer";
import { updateTreeNutFree, getTreeNutFree } from "../../redux/treeNutFreeReducer";
import { updateImmunoSuportive, getImmunoSuportive } from "../../redux/immunoSuportiveReducer";
import { updateDASH, getDASH } from "../../redux/DASHReducer";
  
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

const SearchInput = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => getIngredients(state));
  const glutenFree = useSelector(state => getGlutenFree(state));
  const vegan = useSelector(state => getVegan(state));
  const vegetarian = useSelector(state => getVegetarian(state));
  const pescatarian = useSelector(state => getPescatarian(state));
  const alcoholFree = useSelector(state => getAlcoholFree(state));
  const sulfiteFree = useSelector(state => getSulfiteFree(state));
  const peenutFree = useSelector(state => getPeenutFree(state));
  const treeNutFree = useSelector(state => getTreeNutFree(state));
  const ketoFriendly = useSelector(state => getKetoFriendly(state));
  const lowCarb = useSelector(state => getLowCarb(state));
  const lowFat = useSelector(state => getLowFat(state));
  const immunoSupportive = useSelector(state => getImmunoSuportive(state));
  const DASH = useSelector(state => getDASH(state));

  const handleIngredientsSet = value => {
    dispatch(updateIngredients(value));
  }
  const handleGlutenFreeCheckBox = value => {
    dispatch(updateGlutenFree(value));
  }
  const handleAlcoholFreeCheckBox = value => {
    dispatch(updateAlcoholFree(value));
  }
  const handleSulfiteFreeCheckBox = value => {
    dispatch(updateSulfiteFree(value));
  }
  const handleVeganCheckBox = value => {
    dispatch(updateVegan(value));
  }
  const handleVegetarianCheckBox = value => {
    dispatch(updateVegetarian(value));
  }
  const handleKetoFreindlyCheckBox = value => {
    dispatch(updateKetoFriendly(value));
  }
  const handleLowCarbCheckBox = value => {
    dispatch(updateLowCarb(value));
  }
  const handleLowFatCheckBox = value => {
    dispatch(updateLowFat(value));
  }
  const handlePestacarianCheckBox = value => {
    dispatch(updatePescatarian(value));
  }
  const handlePeenutFreeCheckBox = value => {
    dispatch(updatePeenutFree(value));
  }
  const handleTreeNutFreeCheckBox = value => {
    dispatch(updateTreeNutFree(value));
  }
  const handleImmunoSuportiveCheckBox = value => {
    dispatch(updateImmunoSuportive(value));
  }
  const handleDASHCheckBox = value => {
    dispatch(updateDASH(value));
  }

  return (
    <div className="m-5 d-flex flex-column justify-content-center align-items-center gap-4">
      <h3>Food Search component</h3>  
      <form className="d-flex flex-column justify-content-center align-items-center gap-4">
        <div className="d-flex flex-column justify-content-between align-items-between gap-2">
          <h5>Ingredients</h5> 
          <input type="text" placeholder="Inigredients..." value={ingredients} onChange={event => handleIngredientsSet(event.target.value)} />
          <input type="checkbox" id="vegetarian" name="vegetarian" value={vegetarian} checked={vegetarian} onChange={event => handleVegetarianCheckBox(event.target.checked)}/>
          <label for="vegetarian">vegetarian</label>
          <input type="checkbox" id="vegan" name="vegan" value={vegan} checked={vegan} onChange={event => handleVeganCheckBox(event.target.checked)}/>
          <label for="vegan">vegan</label>
          <input type="checkbox" id="glutenfree" name="glutenfree" value={glutenFree} checked={glutenFree} onChange={event => handleGlutenFreeCheckBox(event.target.checked)} />
          <label for="glutenfree">glutenfree</label>
          <input type="checkbox" id="alcoholfree" name="alcoholfree" value={alcoholFree} checked={alcoholFree} onChange={event => handleAlcoholFreeCheckBox(event.target.checked)} />
          <label for="alcoholfree">alcoholfree</label>
          <input type="checkbox" id="ketofriendly" name="ketofriendly" value={ketoFriendly} checked={ketoFriendly} onChange={event => handleKetoFreindlyCheckBox(event.target.checked)} />
          <label for="ketofriendly">ketofriendly</label>
          <input type="checkbox" id="lowcarb" name="lowcarb" value={lowCarb} checked={lowCarb} onChange={event => handleLowCarbCheckBox(event.target.checked)} />
          <label for="lowcarb">lowcarb</label>
          <input type="checkbox" id="lowfat" name="lowfat" value={lowFat} checked={lowFat} onChange={event => handleLowFatCheckBox(event.target.checked)} />
          <label for="lowfat">lowfat</label>
          <input type="checkbox" id="pescatarian" name="pescatarian" value={pescatarian} checked={pescatarian} onChange={event => handlePestacarianCheckBox(event.target.checked)} />
          <label for="pescatarian">pescatarian</label>
          <input type="checkbox" id="peenutfree" name="peenutfree" value={peenutFree} checked={peenutFree} onChange={event => handlePeenutFreeCheckBox(event.target.checked)} />
          <label for="peenutfree">peenutfree</label>
          <input type="checkbox" id="treenutfree" name="treenutfree" value={treeNutFree} checked={treeNutFree} onChange={event => handleTreeNutFreeCheckBox(event.target.checked)} />
          <label for="treenutfree">treenutfree</label>
          <input type="checkbox" id="immunosupportive" name="immunosupportive" value={immunoSupportive} checked={immunoSupportive} onChange={event => handleImmunoSuportiveCheckBox(event.target.checked)} />
          <label for="immunosupportive">immunosupportive</label>
          <input type="checkbox" id="sulfite-free" name="sulfite-free" value={sulfiteFree} checked={sulfiteFree} onChange={event => handleSulfiteFreeCheckBox(event.target.checked)} />
          <label for="sulfite-free">sulfite-free</label>
          <input type="checkbox" id="DASH" name="DASH" value={DASH} checked={DASH} onChange={event => handleDASHCheckBox(event.target.checked)} />
          <label for="DASH">DASH</label>
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