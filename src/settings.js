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
  image_SMALL: 'image_SMALL_url',
  image_REGULAR: 'image_REGULAR_url',
}

export const elementsNames = {
  root: 'root',
  input: 'input',
  favorites: '/favorites',
}

export const messages = {
  putIngredients: 'Selected ingredients...',
  putExcluded: 'Excluded ingredients...',
  newPost: {
    title: 'New post title',
    content: 'Write new post on out board',
    author: 'Author field',
  },
  newComment: {
    content: 'Write new comment to this post..',
  },
  noInfoProvided: 'No information provided',
  showOnly20: 'But we wil show only 20',
  takeALook: 'Take a look...',
  online: 'Online',
  offline: 'Offline',
  search: 'Search',
  foodSearchApp: 'Search for new recipes',
  inputWarning: 'Only letters and spaces',
  defalutQuote: {
    text: "You are what you eat, so don't be fast, cheap, easy, or fake."
  }
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
  regexIngredientsString: /^[A-Za-z\s]*$/,
  regexLoginString: /^[a-zA-Z0-9]{1,10}$/,
  regexPasswordString: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  title: 'Receipes Search App',
  adminId: 1,
}