const initialState = {
  ingredients: '',
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
    pescatarian: {
      value: false,
      id: 'pescatarian',
      string: 'pescatarian',
      description: 'Pescatarian',
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
    ketoFriendly: {
      value: false,
      id: 'ketoFriendly',
      string: 'keto-friendly',
      description: 'Keto Friendly',
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
    peanutFree: {
      value: false,
      id: 'peanutFree',
      string: 'peanut-free',
      description: 'Peanut Free',
    },
    treeNutFree: {
      value: false,
      id: 'treeNutFree',
      string: 'tree-nut-free',
      description: 'Treenut Free',
    },
    immunoSupportive: {
      value: false,
      id: 'immunoSupportive',
      string: 'immuno-supportive',
      description: 'Immuno Supportive',
    },
    sulfiteFree: {
      value: false,
      id: 'sulfiteFree',
      string: 'sulfite-free',
      description: 'Sulfite Free',
    },
    DASH: {
      value: false,
      id: 'DASH',
      string: 'dash',
      description: 'DASH',
    },
    FODMAPFree: {
      value: false,
      id: 'FODMAPFree',
      string: 'fodmap-free',
      description: 'FODMAP Free',
    },
    mediterranean: {
      value: false,
      id: 'mediterranean',
      string: 'mediterranean',
      description: 'Mediterranean',
    },
    sugarConscious: {
      value: false,
      id: 'sugarConscious',
      string: 'sugar-conscious',
      description: 'Sugar Conscious',
    },
  },
  searchResponse: '',
};
    
export default initialState;