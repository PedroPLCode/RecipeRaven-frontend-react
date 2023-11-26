import { PRIVATE_API_KEY } from "./API_PRIVATE_KEY.js";

export const classNames = {
  offline: '.offline',
  selectedButtons: '.SearchPage_active__321Sw',
  resultBoxes: '.SingleResult_hidden__TZjW1',
}

export const parametersNames = {
  value: 'value',
  id: 'id',
  description: 'description',
  string: 'string',
  recipe: 'recipe',
  url: 'url',
  dishType: 'dishType',
  mealType: 'mealType',
  label: 'label',
  cuisineType: 'cuisineType',
  cautions: 'cautions',
  totalTime: 'totalTime',
  dietLabels: 'dietLabels',
  healthLabels: 'healthLabels',
  calories: 'calories',
  images: 'images',
  SMALL: 'SMALL',
  REGULAR: 'REGULAR',
  regexString: /^[A-Za-z\s]*$/,
}

export const elementsNames = {
  root: 'root',
  input: 'input',
  favorites: '/favorites',
}

export const ApiSettings = {
  mainUrl: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public',
  query: '&q=',
  excluded: '&excluded%5B0%5D=',
  and: '%20',
  methodGET: 'GET',
  headers: {
    'Accept-Language': 'en',
    'X-RapidAPI-Key': PRIVATE_API_KEY,
    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
  }
}

export const messages = {
  putIngredients: 'Selected ingredients...',
  putExcluded: 'Excluded ingredients...',
  noInfoProvided: 'No information provided',
  showOnly20: 'But we wil show you only 20',
  takeALook: 'Take a look...',
  online: 'Online',
  offline: 'Offline',
  search: 'Search',
  foodSearchApp: 'Food Search App',
  inputWarning: 'Use only letters and short spaces',
}

export const infoData = {
  myEmailLink: 'mailto: piotrek.gaszczynski@gmail.com',
  myGitHub: 'https://github.com/PedroPLCode/',
  LinkToApi: 'https://rapidapi.com/edamam/api/recipe-search-and-diet',
}
export const stylesParams = {
  clickedButton: '0 100%',
}