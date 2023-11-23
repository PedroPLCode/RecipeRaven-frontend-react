import { PRIVATE_API_KEY } from "./API_PRIVATE_KEY";

export const classNames = {
}

export const parametersNames = {
  value: 'value',
  id: 'id',
  description: 'description',
  string: 'string',
}

export const elementsNames = {
  root: 'root',
}

export const ApiSettings = {
  mainUrl: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public',
  question: '&q=',
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
  putIngredients: 'Put selected ingredients here...',
  putExcluded: 'Put excluded ingredients here...',
  noInfoProvided: 'No information provided',
  showOnly20: 'But we wil show you only 20..',
  takeALook: 'Take a look',
}

export const infoData = {
  myEmailLink: 'mailto: piotrek.gaszczynski@gmail.com',
  myGitHub: 'https://github.com/PedroPLCode/',
  LinkToApi: 'ttps://rapidapi.com/edamam/api/recipe-search-and-diet',
}
