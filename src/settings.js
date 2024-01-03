import { PRIVATE_API_KEY } from "./API_PRIVATE_KEY.js";

export const classNames = {
  offline: '.offline',
  selectedButtons: '.SearchPage_active__321Sw',
  resultBoxes: '.SingleResult_single_result__y0ANe',
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

export const ReceipesApiSettings = {
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

export const QuotesApiSettings = {
  selectedTopics: ['fitness', 'food', 'health'],
  mainUrl: 'https://famous-quotes4.p.rapidapi.com/random?',
  category: 'category=',
  count: '&count=1',
  methodGET: 'GET',
  headers: {
    'X-RapidAPI-Key': PRIVATE_API_KEY,
    'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
  }
}

export const messages = {
  putIngredients: 'Selected ingredients...',
  putExcluded: 'Excluded ingredients...',
  noInfoProvided: 'No information provided',
  showOnly20: 'But we wil show only 20',
  takeALook: 'Take a look...',
  online: 'Online',
  offline: 'Offline',
  search: 'Search',
  foodSearchApp: 'Search for new recipes',
  inputWarning: 'Only letters and spaces',
}

export const infoData = {
  myEmailLink: 'mailto: piotrek.gaszczynski@gmail.com',
  myGitHub: 'https://github.com/PedroPLCode/',
  LinkToApi: 'https://rapidapi.com/edamam/api/recipe-search-and-diet',
  pexels: 'https://www.pexels.com/pl-pl/@goumbik/',
}

export const stylesParams = {
  clickedButtonBckr: '0 100%',
  clickedButtonBS: '0 0 5px 5px #9da09c',
  resultHidden: {
    filter: 'saturate(0) blur(4px)',
    transform: 'scale(.9)',
  },
  resultVisible: {
    filter: 'saturate(1) blur(0)',
    transform: 'scale(1)',
  }
}

export const settings = {
  delay: 1000,
  title: 'Receipes Search App',
}