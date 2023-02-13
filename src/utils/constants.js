
  export const validationRules = {
    email:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    characters:/^[a-zA-Z_ ]*$/,
    numbers:/^[0-9]*$/,
    // mobile:/^(9|8|7)\d{11}$/,
  }