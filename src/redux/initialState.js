const initialState = {
  quote: '',
  ingredients: '',
  excluded: '',
  diet: {
    vegetarian: {
      value: false,
      id: 'vegetarian',
      string: 'vegetarian',
      description: 'Vegetarian',
    },
    vegan: {
      value: false,
      id: 'vegan',
      string: 'vegan',
      description: 'Vegan',
    },
    glutenFree: {
      value: false,
      id: 'glutenFree',
      string: 'gluten-free',
      description: 'Gluten Free',
    },
    alcoholFree: {
      value: false,
      id: 'alcoholFree',
      string: 'alcohol-free',
      description: 'Alcohol Free',
    },
    lowCarb: {
      value: false,
      id: 'lowCarb',
      string: 'low-carb',
      description: 'Low Carb',
    },
    lowFat: {
      value: false,
      id: 'lowFat',
      string: 'low-fat',
      description: 'Low Fat',
    },
  },
  searchResult: '',
  serverResponse: '',
  serverError: '',
  favorites: [],
  linkNextPage: '',
  posts: [],
  comments: [],
  user: null,
};
    
export default initialState;