//Validation functions

//Check if value is a string and that the string is not empty or only contains of spaces
//Trim takes away spaces in beginning or end of strings
export function validateString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
//Check if value is a number and that value is not NaN
export function validateNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
