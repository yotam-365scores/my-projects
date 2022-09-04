var state = {};

// 
const setState = (newState) => {
    const arrayLike = Object.entries(newState);
    arrayLike.forEach(([key, value]) => {
        state[key] = this.isObject(state[key]) &&   
      this.isObject(value) ? {...state[key], ...value} : value;
    });
  }