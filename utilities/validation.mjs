//Validation functions
export function validateString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
