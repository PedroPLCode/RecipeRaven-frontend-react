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
    highProtein: {
      value: false,
      id: 'highProtein',
      string: 'high-protein',
      description: 'High Protein',
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
  news: [],
  reactions: [],
  user: null,
  random: {value: false},
};
    
export default initialState;